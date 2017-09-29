$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(user.first_name)
        .appendTo($("body"));
    }
  });
  $(".nav-item").on("click", "a", function() {
    $(this).toggleClass("nav-active");
  });
});
