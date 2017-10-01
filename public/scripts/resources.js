$(() => {

  //Get all resources inner-joined
  function getResources() {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: `/api/resources/`
    }).done((resources) => {
        const allResources = resources.map(createResource);
        createAllResources(allResources);
        createAllModals(allResources);
        const lastResource = allResources[resources.length - 1];
        const lastTags = printTags(lastResource.tags);
        $(".resource-footer-tags:first").append(lastTags);

        const lastComments = printComments(lastResource.comments);
        $(".user-comments:first").append(lastComments);
      })
  };

  getResources();

  // TODO return resource specific tags/comments
  function createResource(resourceObject) {
    console.log(resourceObject)
    return {
      id: resourceObject.id,
      title: resourceObject.title,
      description: resourceObject.description,
      url: resourceObject.url,
      created_at: resourceObject.created_at,
      tags: [resourceObject.name, "cool", "funny"], //TODO Tags need some reworking
      user: {
        id: resourceObject.id,
        username: resourceObject.username
      },
      likes: resourceObject.count,
      isLiked: true,
      comments: [
        {
          username: resourceObject.username,
          message: resourceObject.content,
          created_at: resourceObject.created_at
        },
        {
          username: "CharlieDontSurf",
          message: resourceObject.content,
          created_at: resourceObject.created_at
        }
      ]
    };
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    if (seconds < 5) {
      return "Just now";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  function printTags(tags) {
    $(".resource-footer-tags").empty();
    tags.forEach(tag => {
      const $newTag = $("<span>")
        .addClass("badge badge-primary tags")
        .text(tag);
      $(".resource-footer-tags").append($newTag);
    });
  }

  function printComments(comments) {
    $(".user-comments").empty();
    comments.forEach(comment => {
      const $singleComment = $("<div>").addClass("singleComment");
      const $commentHeader = $("<div>").addClass("comment-header");
      const $commentUsername = $("<h6>").text(comment.username);
      const commentDate = timeSince(comment.created_at);
      const $commentTimestamp = $("<small>").text(commentDate);
      $commentHeader.append($commentUsername).append($commentTimestamp);
      const $commentBody = $("<p>")
        .addClass("comment-body")
        .text(comment.message);
      $singleComment.append($commentHeader).append($commentBody);
      $(".user-comments").prepend($singleComment);
    });
  }

  function createAllResources(resources) {
    const $cards = $(".card-columns");
    $cards.empty();
    resources.forEach(resource => {
      $cards.prepend(createResourceCard(resource));
    });
  }

  function createResourceCard(resource) {
    const $card = $("<div>")
      .addClass("card")
      .attr("data-resource-id", resource.id);

    const $cardBody = $("<div>")
      .addClass("card-body")
      .attr({
        "data-toggle": "modal",
        "data-target": `#large-resource${resource.id}`
      });

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
    const $likeBtn = $("<button>")
      .addClass("btn btn-secondary mr-sm-2")
      .text(" " + resource.likes);
    const $likeIcon = $("<i>").addClass("fa fa-thumbs-up");
    $likeBtn.prepend($likeIcon);
    $resourceActions.append($likeBtn);

    const $cardTags = $("<div>").addClass("resource-footer-tags");

    $cardFooter.append($resourceActions).append($cardTags);
    printTags(resource.tags);

    $card.append($cardBody).append($cardFooter);
    return $card;
  }

  function createAllModals(resources) {
    resources.forEach(resource => {
      $(".wrapper").append(createResourceModal(resource));
    });
  }

  function createResourceModal(resource) {
    const $modal = $("<div>")
      .addClass("modal fade")
      .attr({
        id: `large-resource${resource.id}`,
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": "large-resource-title",
        "aria-hidden": "true"
      });
    const $modalDialog = $("<div>")
      .addClass("modal-dialog")
      .attr("role", "document");
    $modal.append($modalDialog);
    const $modalContent = $("<div>").addClass("modal-content");
    $modalDialog.append($modalContent);

    // Create modal header
    const $modalHeader = $("<div>").addClass("modal-header");
    $modalContent.append($modalHeader);
    const $modalTitle = $("<h4>")
      .addClass("modal-title")
      .attr("id", "large-resource-title")
      .text(resource.title);
    const $closeBTN = $("<button>")
      .addClass("close")
      .attr({ "data-dismiss": "modal", "aria-label": "Close" });
    const $closeSpan = $("<span>")
      .addClass("fa fa-times")
      .attr("aria-hidden", "true");
    $closeBTN.append($closeSpan);
    $modalHeader.append($modalTitle).append($closeBTN);

    // Create modal body
    const $modalBody = $("<div>").addClass("modal-body");
    $modalDialog.append($modalBody);
    const $modalDescriptTitle = $("<h6>").text("Description");
    const $modalDescriptBody = $("<p>").text(resource.description);
    const $modalUrlTitle = $("<h6>").text("URL: ");
    const $modalUrlLink = $("<a>")
      .attr("href", resource.url)
      .text(resource.url);
    $modalUrlTitle.append($modalUrlLink);
    const $modalResourceFooter = $("<div>").addClass("resource-footer");
    const $resourceActions = $("<div>").addClass("resource-actions");
    const $likeBtn = $("<button>")
      .addClass("btn btn-secondary mr-sm-2")
      .text(" " + resource.likes);
    const $likeIcon = $("<i>").addClass("fa fa-thumbs-up");
    $likeBtn.prepend($likeIcon);
    $resourceActions.append($likeBtn);

    const $modalTags = $("<div>").addClass("resource-footer-tags");
    printTags(resource.tags);
    $modalResourceFooter.append($resourceActions).append($modalTags);
    $modalBody
      .append($modalDescriptTitle)
      .append($modalDescriptBody)
      .append($modalUrlTitle)
      .append($modalResourceFooter);

    // Create Modal footer
    const $modalFooter = $("<div>").addClass("modal-footer");
    const $modalCommentsHeader = $("<div>").addClass("comments");
    $modalFooter.append($modalCommentsHeader);
    const $modalCommentsHeaderTitle = $("<h5>")
      .addClass("mr-sm-2")
      .text("Comments");
    const $modalHeaderIconH5 = $("<h5>");
    const $modalHeaderIcon = $("<i>").addClass("fa fa-pencil-square-o");
    $modalHeaderIconH5.append($modalHeaderIcon);

    $modalCommentsHeader
      .append($modalCommentsHeaderTitle)
      .append($modalHeaderIcon);

    const $newComment = $("<form>")
      .addClass("new-comment")
      .attr({ action: "/comment", method: "post" });
    const $commentFormGroup = $("<div>").addClass("form-group");
    const $formMsg = $("<textarea>")
      .addClass("form-control comment-content")
      .attr("placeholder", "Add a comment.");
    $commentFormGroup.append($formMsg);
    const $commentBtn = $("<button>")
      .addClass("btn btn-outline-dark btn-sm mb-sm-2")
      .attr("type", "submit")
      .text("Submit");
    $newComment.append($commentFormGroup).append($commentBtn);

    const $displayComments = $("<div>").addClass("user-comments");
    printComments(resource.comments);

    $modalFooter
      .append($modalCommentsHeader)
      .append($newComment)
      .append($displayComments);

    $modalContent.append($modalBody).append($modalFooter);
    return $modal;
  }

});
