var app = function() {
  console.log("entered the app");

  // LIST ALL CONTACTS
  $(function () {
    var button = $('#list-contacts');
    button.one('click', function () {
      $.ajax({
        url: '/contacts',
        method: 'GET',
        success: function (morePostsHtml) {
          button.replaceWith(morePostsHtml);
        }
      });
    });
  });

  // clear all contacts when button clicked
  $('#clear-contacts').on('click', function () {
      $('#contact-list').html('');
  });

  // NEW CONTACT
  $( "#create-new-contact" ).on('click', function(e) { 
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
    var contactID = $("#contact-id-input").val();

    console.log("contact id saved to variable");

    // Send the data using GET JSON
    $.getJSON( "/contacts/" + contactID, function( data ) {
      console.log("id sent to /contacts/:id");
      $('body').append(data.firstname).find("#show-contact-data").show();
    });
  }); 

}

$(document).ready(function() {
  console.log("The DOM is now loaded.");
  app();
});
