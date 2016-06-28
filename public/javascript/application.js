var app = function() {
  $( "#is-this-working" ).text( "This is working. YAYYY." ).show();

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

}

$(document).ready(function() {
  console.log("The DOM is now loaded.");
  app();
});
