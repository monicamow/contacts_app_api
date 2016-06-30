var app = function() {
  console.log("entered the app");

  // LOAD/LIST ALL CONTACTS
    $('#list-contacts').on('click', function () {

      $.getJSON("/contacts", function(contacts) {
        $("tbody").empty();
        contacts.forEach(displayContact);
        $('#contact-list-table').show();
      });
    });

  function displayContact(contact) {
    var tableRow = $("<tr>").appendTo("tbody")
    $("<td>").text(contact.id).appendTo(tableRow);
    $("<td>").text(contact.firstname).appendTo(tableRow);
    $("<td>").text(contact.lastname).appendTo(tableRow);
    $("<td>").text(contact.email).appendTo(tableRow);
    $("<td>").text(contact.phone_number).appendTo(tableRow);
    // $("<button>").text("Show Details").appendTo(tableRow);
    $("<button>").text("Edit").data('id', contact.id).addClass("edit-button").appendTo(tableRow);
    $("<button>").text("Delete").data('id', contact.id).addClass("delete-button").appendTo(tableRow);
  };

  // clear all contacts when button clicked
  $('#clear-contacts').on('click', function () {
      $('#contact-list-table').hide();
  });

  // NEW CONTACT
  $( "#create-new-contact" ).on('click', function(e) { 
    $("#new-contact-form").show();   
  });

  $("#new-contact-form").on('submit', function(e) {
    e.preventDefault();
    // Get values from input fields on the page:
    var first = $("#first-name-input").val();
    var last = $("#last-name-input").val();
    var email = $("#email-input").val();
    var phone = $("#phone-number-input").val();
    var contact = {firstname: first, lastname: last, email: email, phone_number: phone};

    console.log("contact variable created");
   
    // Send the data using POST
    $.post( "/contacts", contact, function( data ) {
      console.log("inside JQ post()");
      contact = JSON.parse(data) // might not need this
      $('body').append(contact.firstname).find('#show-new-contact').show();
    });
  });

  // SHOW CONTACT
  $( "#show-contact").on('click', function(e) {
    e.preventDefault();
    // Get value from input field
    var contactID = $("#show-id-input").val();

    console.log("contact id saved to variable");

    // Send the data using GET JSON
    $.getJSON( "/contacts/" + contactID, function( data ) {
      console.log("id sent to /contacts/:id");
      $('body').append(data.firstname).find("#show-contact-data").show();
    });
  }); 

  // DELETE CONTACT WITH DATA BUTTON
  $("#contact-list-table").on('click', 'button.delete-button', function() {
    var btn = $(this);
    console.log(btn);
    var id = btn.data('id');
    $.getJSON('/contacts/'+ id +'/delete', function(results) {
      if (results.result) {
        alert(results.success_message);
        btn.parents('tr').remove();
      } else {
        alert(results.fail_message);
      }
    });
  });

}

$(document).ready(function() {
  console.log("The DOM is now loaded.");
  $('#contact-list-table').hide();
  $("#new-contact-form").hide();
  $("#show-contact-form").hide();
  app();
});
