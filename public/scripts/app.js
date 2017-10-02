$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done(users => {
  //   for (user of users) {
  //     $("<div>")
  //       .text(`${user.url} by the user ${user.username}`)
  //       .appendTo($("body"));
  //   }
  // });

  $(".nav-item").on("click", "a", function() {
    $(this).toggleClass("nav-active");
  });

  $(".resource-actions").on("click", "button", function() {
    $(this).toggleClass("clicked-like");
    $("button").blur();
  });

  //Searches database
  const searchRes = searchFormData => {
    console.log(searchFormData);
    $.ajax({
      method: "GET",
      url: `/api/search/${searchFormData}`
    })
      .done(result => {
        $(".search-results").empty();
        $("<h3>")
          .text("Results:")
          .appendTo($(".search-results"));
        result.rows.forEach(row => {
          $("<a>")
            .text(row.title)
            .appendTo($(".search-results"));
        });
      })
      .fail(e => {
        console.error(e);
      });
  };

  $(".comments").on("click", "div", function() {
    $(".new-comment").stop();
    $(".new-comment").slideToggle("fast");
    $("textarea").focus();
  });

  $(".navbar-nav").on("click", "span", function() {
    $(".login").stop();
    $(this).toggleClass("nav-active");
    $(".login").slideToggle("fast");
    $("#login-email").focus();
  });

  $(".navbar-nav").on("click", "div", function() {
    $(".register").stop();
    $(this).toggleClass("nav-active");
    $(".register").slideToggle("fast");
    $("#register-email").focus();
  });

  //Searches database for resources
  $("#search").on("submit", () => {
    event.preventDefault();
    searchRes($("#query").val());
  });

  //Sends a write to likes table in the database
  const addLike = () => {
    $.ajax({
      method: "POST",
      url: "/api/likes",
      data: {
        userID: $('input[name="userID"]').val(),
        resourceID: $('.resourceID').val()
      }
    }).done( (result) => {
      console.log(result);
    })
  }

  $('#like').on('submit', (event) => {
  event.preventDefault();
    addLike();
  });

  //Deletes from likes table in the database
 const unLike = () => {
   $.ajax({
     method: "POST",
     url: "/api/unlike"
   }).done( () => {
     showLiked();
   })
 }
})
