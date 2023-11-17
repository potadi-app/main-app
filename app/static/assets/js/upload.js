document.addEventListener("DOMContentLoaded", function () {
  var fileSelect = document.getElementById("file-upload");
  var fileDrag = document.getElementById("file-drag");
  var fileImage = document.getElementById("file-image");
  var notImage = document.getElementById("notimage");
  var start = document.getElementById("start");
  var response = document.getElementById("response");
  var fileProgress = document.getElementById("file-progress");
  var progressText = document.getElementById("progress-text");
  var resetButton = document.getElementById("reset-btn");
  var predictButton = document.getElementById("predict-btn");
  var loading = document.getElementById("loading");

  function Init() {
    console.log("Upload Initialized");

    fileSelect.addEventListener("change", fileSelectHandler, false);

    if (window.File && window.FileList && window.FileReader) {
      // File Drop
      fileDrag.addEventListener("dragover", fileDragHover, false);
      fileDrag.addEventListener("dragleave", fileDragHover, false);
      fileDrag.addEventListener("drop", fileSelectHandler, false);
    } else {
      fileDrag.style.display = "none";
    }
  }

  function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    fileDrag.className =
      e.type === "dragover" ? "hover" : "modal-body file-upload";
  }

  function fileSelectHandler(e) {
    var files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (var i = 0, f; (f = files[i]); i++) {
      parseFile(f);
      uploadFile(f);      
    }
  }

  function parseFile(file) {
    console.log(`File name: ${file.name} ${file.size} ${file.type}`);
    output("<strong>" + file.name + "</strong>");
    var imageName = file.name;
    var isGood = /\.(?=jpg|png|jpeg|JPG|PNG|JPEG)/gi.test(imageName);
    if (isGood) {
      start.classList.add("hidden");
      response.classList.remove("hidden");
      notImage.classList.add("hidden");
      fileImage.classList.remove("hidden");
      fileImage.src = URL.createObjectURL(file);
    } else {
      fileImage.classList.add("hidden");
      notImage.classList.remove("hidden");
      start.classList.remove("hidden");
      response.classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }

  function updateFileProgress(e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100;
      fileProgress.value = percentComplete;
      progressText.innerText = percentComplete.toFixed(2) + "%";
    }
  }

  function uploadFile(file) {
    var xhr = new XMLHttpRequest();
    var fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      if (file.size <= fileSizeLimit * 1024 * 1024) {
        // xhr.upload.addEventListener("progress", updateFileProgress, false);        
        
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("Upload berhasil");
              // Di sini, Anda dapat menangani respons dari server jika ada.
            } else {
              console.error("Terjadi kesalahan saat mengunggah file.");
              // Di sini, Anda dapat menangani kesalahan jika diperlukan.
            }
          } 
        };      
       
        // Membuat objek FormData untuk mengirim file
        // predictButton.addEventListener("click", function () {
        //   var formData = new FormData();
        //   formData.append("file", file);
  
        //   // Mengirim permintaan POST ke URL yang ditentukan pada form
        //   xhr.open("post", document.getElementById("file-upload-form").action, true);
        //   xhr.send(formData);
        //   loading.style.display = "block";
        // });
        
      } else {
        output("Please upload a smaller file (< " + fileSizeLimit + " MB).");
        loading.style.display = "none";
      }
    }
  }

  function output(msg) {
    var m = document.getElementById("messages");
    m.innerHTML = msg;
  }

  Init();

  resetButton.addEventListener("click", function () {
    fileImage.classList.add("hidden");
    notImage.classList.remove("hidden");
    start.classList.remove("hidden");
    response.classList.add("hidden");
    document.getElementById("file-upload-form").reset();
  });

  predictButton.addEventListener("click", function () {
    // document.querySelector("form").submit();
    document.getElementById('file-upload-form').submit();
    loading.style.display = "block";
  });
});
