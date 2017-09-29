$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(`${user.url} by the user ${user.username}`)
        .appendTo($("body"));
    }
  });
});
