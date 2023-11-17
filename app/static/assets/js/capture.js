const video = document.getElementById("cameraFeed");
const captureButton = document.getElementById("capture-btn");
const inputImageData = document.getElementById("capture-image-data");

// When the capture button is clicked, take a snapshot.
captureButton.addEventListener("click", function () {
  const canvas = document.getElementById("capture-image");
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the snapshot to an image URL (base64 data URL).
  const imageDataURL = canvas.toDataURL("image/png"); // 'image/png' to 'image/jpeg' if needed.
  const imageToShow = imageDataURL.split(',')[1];

  inputImageData.value = imageToShow;
});


// console.log(inputImageData.value)
