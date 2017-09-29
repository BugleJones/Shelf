$(() => {

  $(".nav-item").on("click", "a", function() {
    $(this).toggleClass("nav-active");
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
});
