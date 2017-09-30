$(() => {
  const resources = [1, 2, 3, 4, 5, 6].map(createResource);
  createAllResources(resources);
});

// TODO this is mocking resources, they should later come from the server
function createResource(id) {
  return {
    id: id,
    title: "The art of not giving a f*ck",
    description: "this is a resource" + id,
    url: "http://example.com",
    created_at: 12248134314 + id,
    tags: ["good", "cool", "funny"],
    user: {
      id: id,
      username: "YoBob"
    },
    likes: id,
    isLiked: true,
    comments: [
      {
        first_name: "Alice",
        last_name: "murphy",
        message: "Great resource!"
      },
      {
        first_name: "Bob",
        last_name: "Jones",
        message: "This is dumb."
      }
    ]
  };
}

function createAllResources(resources) {
  const $cards = $(".card-columns");
  $cards.empty();
  resources.forEach(resource => {
    $cards.prepend(createResourceCard(resource));
  });
}

function createResourceCard(resource) {
  const $card = $("<div>").addClass("card");

  const $cardBody = $("<div>")
    .addClass("card-body")
    .data({ toggle: "modal", target: "#large-resource" });

  const $resourceHeader = $("<div>").addClass("resource-header");
  const $cardTitle = $("<h4>")
    .addClass("card-title")
    .text(resource.title);
  const $cardUser = $("<p>")
    .addClass("card-user-name")
    .text(resource.user.username);
  $resourceHeader.append($cardTitle).append($cardUser);

  const $cardText = $("<p>")
    .addClass("card-text")
    .text(resource.description);
  const $cardURL = $("<a>")
    .attr("href", resource.url)
    .text(resource.url);
  $cardBody
    .append($resourceHeader)
    .append($cardText)
    .append($cardURL);

  const $cardFooter = $("<div>").addClass("card-footer resource-footer");
  const $resourceActions = $("<div>").addClass("resource-actions");
  const $likeBtn = $("<button>").addClass("like-btn");
  const $likeIcon = $("<i>").addClass("fa fa-thumbs-o-up");
  $likeBtn.append($likeIcon);
  $resourceActions.append($likeBtn);

  const $cardTags = $("<div>").addClass("resource-footer-tags");
  const $resourceTag = $("<a>").text();
  $cardFooter.append($resourceActions);

  $card.append($cardBody).append($cardFooter);
  return $card;
}
