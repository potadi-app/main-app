function turnOnCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("getUserMedia is not supported in this browser.");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      const videoElement = document.getElementById("cameraFeed");
      videoElement.srcObject = stream;
      videoElement.play();
    })
    .catch((error) => {
      console.error("Error accessing the camera:", error);
    });
}

function turnOffCamera() {
  const videoElement = document.getElementById("cameraFeed");

  if (videoElement.srcObject) {
    const tracks = videoElement.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoElement.srcObject = null;
  }
}
