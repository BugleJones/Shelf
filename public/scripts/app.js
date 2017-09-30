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

  $(".nav-item").on("click", "a", function() {
    $(this).toggleClass("nav-active");
  });

  $(".card-footer").on("click", "button", function() {
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
        $("<h2>")
          .text("Results:")
          .appendTo($(".search-results"));
        result.rows.forEach(row => {
          $("<div>")
            .text(row.title)
            .appendTo($(".search-results"));
        });
      })
      .fail(e => {
        console.error(e);
      });
  };

  $(".comments").on("click", "i", function() {
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

  // Create card element
  // function createResourceCard(resource) {
  //   const $card = $('<div>').addClass("card");
  //
  //   const $cardBody = $('<div>').addClass('card-body').data({toggle: "modal", target: "#large-resource"});
  //
  //   const $resourceHeader = $("<div>").addClass("resource-header");
  //   const $cardTitle = $("<h4>").addClass("card-title").text(resource.title);
  //   const $cardUser = $("<p>").addClass("card-user-name").text(resource.username);
  //   $resourceHeader.append($cardTitle).append($cardUser);
  //
  //   const $cardText = $('<p>').addClass("card-text").text(resource.description);
  //   const $cardURL = $("<a>").attr('href', resource.url).text(resourece.url);
  //   $cardBody.append($resourceHeader).append($cardText).append($cardURL);
  //
  //   const $cardFooter = $("<div>").addClass("card-footer resource-footer");
  //   const $resourceActions = $('<div>').addClass("resource-actions");
  //   const $likeBtn = $('<button>').addClass("like-btn");
  //   const $likeIcon = $('<i>').addClass("fa fa-thumbs-o-up");
  //   $likeBtn.append($likeIcon);
  //   $resourceActions.append($likeBtn);
  //   $cardFooter.append($resourceActions);
  //
  //   $card.append($cardBody).append(cardFooter);
  // }
});
