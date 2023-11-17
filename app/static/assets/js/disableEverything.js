function disableEverything() {
  const defaultOptions = {
    disableRightClick: true,
    rightClickMessage: "Right Click is Disabled.",
    disableCopy: true,
    copyMessage: "Copying is not Allowed.",
    disableImageDragging: true,
    disableKeyboard: true,
    disableScroll: true,
  };

  const mergedOptions = defaultOptions;

  // Disable Right Click
  if (mergedOptions.disableRightClick) {
    $(document).on("contextmenu", function (e) {
      e.preventDefault();
      alert(mergedOptions.rightClickMessage);
    });
  }

  // Disable Text/Image Copy
  if (mergedOptions.disableCopy) {
    $(document).on("copy", function (e) {
      e.preventDefault();
      alert(mergedOptions.copyMessage);
    });
  }

  // Disable Image Dragging
  if (mergedOptions.disableImageDragging) {
    $("img").on("dragstart", function (e) {
      e.preventDefault();
    });
  }

  // Disable Keyboard
  if (mergedOptions.disableKeyboard) {
    $(document).on("keydown", function (e) {
      e.preventDefault();
    });
  }

  // Disable Scroll
  if (mergedOptions.disableScroll) {
    $(window).on("scroll", function () {
      $(window).scrollTop(0);
    });
  }
}

export default disableEverything;
