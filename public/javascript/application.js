var app = function() {
  $( "#is-this-working" ).text( "This is working. YAYYY." ).show();

  // load all contacts when button clicked
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

  // Attach a submit handler to the form
  $( "#create-new-contact" ).on('click', function(e) { 
    e.preventDefault();
    // Get some values from elements on the page:
    var first = $("#first-name-input").val();
    var last = $("#last-name-input").val();
    var email = $("#email-input").val();
    var phone = $("#phone-number-input").val();
    var contact = {firstname: first, lastname: last, email: email, phone_number: phone};
   
    // Send the data using post
    $.post( "/contacts", contact, function( data ) {
      console.log(data);
      contact = JSON.parse(data)
        $('body').append(contact.firstname).find('#creation-notice').show();
      }
    );
   
  });

}

$(document).ready(function() {
  console.log("The DOM is now loaded.");
  app();
});
