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
  // $(".compose").on("click", "button", function() {
  //   $(this).toggleClass("compose-toggle");
  //   $(".new-resource").stop();
  //   $(".new-resource").slideToggle("fast");
  //   $("#new-resourece-url").focus();
  // });
});
