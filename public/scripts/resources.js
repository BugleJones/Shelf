
//document ready
$(() => {

  //Get all resources inner-joined
  function getResources() {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: `/api/resources`
    }).done((resources) => {
      console.log(resources);
      createAllResources(resources);
      createAllModals(resources);
      const lastResource = resources[resources.length - 1];
      const lastComments = printComments(lastResource.comments);
      $(".user-comments:first").append(lastComments);
    })
  };

  getResources();

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

  function printComments(comments) {
    $(".user-comments").empty();
    comments.forEach(comment => {
      const $singleComment = $("<div>").addClass("singleComment");
      const $commentHeader = $("<div>").addClass("comment-header");
      const $commentUsername = $("<h6>").text(comment.username);
      const commentDate = Date(comment.created_at);
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
      .text(resource.username);

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
    const $likeForm = $("<form>").attr({action: "/api/likes", method: "post"})
    const $likeFormHidden = $("<input>").addClass("hidden-input").attr("name", "resource_id").val(resource.id);
    const $likeBtn = $("<button>").attr("type", "submit")
      .addClass("btn btn-secondary mr-sm-2");
    $likeForm.append($likeFormHidden).append($likeBtn);
    //   .text(" " + resource.id);
    //   // console.log(resource);
    // const $likeIcon = $("<i>").addClass("fa fa-thumbs-up");
    // $likeBtn.prepend($likeIcon);

    $likeBtn.text('');
    if(!resource.likes){
      resource.likes = [];
    }
    resource.likes.forEach(like =>{
      let $newLike = $("<i>").addClass("fa fa-thumbs-up");
      console.log($newLike);
      $likeBtn.text(" " + like.count).prepend($newLike);
    });

    $resourceActions.append($likeForm);


    const $cardTags = $("<div>").addClass("resource-footer-tags");
    $cardTags.empty();
    if(!resource.tags){
      resource.tags = [];
    }
    resource.tags.forEach(tag =>{
      let $newTag = $("<span>").addClass("badge badge-primary tags").text(tag.name);
      $cardTags.append($newTag);
    });

    $cardFooter.append($resourceActions).append($cardTags);

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
    //   .text(" " + resource.likes);
    // const $likeIcon = $("<i>").addClass("fa fa-thumbs-up");
    // $likeBtn.prepend($likeIcon);
    // $resourceActions.append($likeBtn);
    $likeBtn.text('');
    if(!resource.likes){
      resource.likes = [];
    }
    resource.likes.forEach(like =>{
      let $newLike = $("<i>").addClass("fa fa-thumbs-up");
      $likeBtn.text(" " + like.count).prepend($newLike);
    });

    $resourceActions.append($likeBtn);

    const $modalTags = $("<div>").addClass("resource-footer-tags");
      $modalTags.empty();
    if(!resource.tags){
      resource.tags = [];
    }
    resource.tags.forEach(tag =>{
      let $newTag = $("<span>").addClass("badge badge-primary tags").text(tag.name);
      $modalTags.append($newTag);
    });


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
      .attr({ action: "api/resources/comments/:user_id", method: "POST" });
    const $commentFormGroup = $("<div>").addClass("form-group")
    const $formHiddenResource = $("<input>").addClass("hidden-input").val(resource.id).attr("name", "resource_id");
    // const $formHiddenUser = $("<input>").addClass("hidden-input").val(user.id).attr("name", "resource_id");
    const $formMsg = $("<textarea>")
      .addClass("form-control comment-content")
      .attr({ placeholder: "Add a comment.", name: "content"});
    $commentFormGroup.append($formHiddenResource).append($formMsg);
    const $commentBtn = $("<button>")
      .addClass("btn btn-outline-dark btn-sm mb-sm-2")
      .attr({ type: "submit", value: "submit" })
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
