"use strict";
function turnOffCamera() {
  const videoElement = document.getElementById("cameraFeed");

  if (videoElement.srcObject) {
    const tracks = videoElement.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoElement.srcObject = null;
  }
}
function turnOnCamera() {
  const videoElement = document.getElementById("cameraFeed");

  // Hentikan kamera jika sudah berjalan
  if (videoElement.srcObject) {
    const tracks = videoElement.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }

  // Dapatkan constraint baru dengan facingMode user
  const constraints = { video: { facingMode: "user" } };

  // Mengambil kamera dengan constraint baru
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
    })
    .catch((error) => {
      console.error("Gagal mengambil kamera:", error);
    });
}

function flipCamera() {
  const videoElement = document.getElementById("cameraFeed");

  if (videoElement.srcObject) {
    const tracks = videoElement.srcObject.getTracks();

    // Hentikan semua track
    tracks.forEach((track) => track.stop());

    // Balik arah kamera
    const newFacingMode = toggleFacingMode(tracks);
    console.log("Facing Mode:" + newFacingMode);

    // Dapatkan constraint baru dengan mengganti facingMode
    const newConstraints = { video: { facingMode: newFacingMode } };

    // Perbarui track dengan constraint baru
    navigator.mediaDevices
      .getUserMedia(newConstraints)
      .then((stream) => {
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error("Gagal mengambil kamera:", error);
      });
  }
}

function toggleFacingMode(tracks) {
  // Cek apakah perangkat mendukung facingMode
  if (tracks.length > 0 && tracks[0].getCapabilities) {
    const capabilities = tracks[0].getCapabilities();

    // Periksa apakah facingMode dapat diatur
    if (capabilities.facingMode) {
      // Jika dapat diatur, balik nilai yang sesuai
      return capabilities.facingMode.includes("user") ? "environment" : "user";
    }
  }

  // Jika tidak dapat menemukan atau facingMode tidak dapat diatur, kembalikan nilai default
  return "user";
}

function takeSnapshot() {
  const video = document.getElementById("cameraFeed");
  const captureButton = document.getElementById("capture-btn");
  const inputImageData = document.getElementById("capture-image-data");
  const flipCamera = document.getElementById("flip");
  const submitButton = document.getElementById("submit-btn");
  const retake = document.getElementById("re-take");

  // Ambil dimensi kontainer
  const container = document.getElementById("capture-container");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Ambil atau buat elemen canvas
  const canvas =
    document.getElementById("capture-image") ||
    document.createElement("canvas");
  canvas.id = "capture-image";

  // Atur ukuran canvas sesuai dengan dimensi kontainer
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = "block";
  retake.style.display = "block";
  video.style.display = "none";
  flipCamera.style.display = "none";
  captureButton.style.display = "none";
  submitButton.removeAttribute("disabled");

  const imageDataURL = canvas.toDataURL("image/png"); // 'image/png' to 'image/jpeg' if needed.

  const imageBlob = dataURLtoBlob(imageDataURL);

  const imageFile = new File([imageBlob], 'snapshot.png', { type: "image/png" });

  // Setel file ke elemen input file
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(imageFile);
  inputImageData.files = dataTransfer.files;

  captureButton.style.display = "none";
  turnOffCamera();
}

function dataURLtoBlob(dataURL) {
  // Pisahkan metadata dan konten gambar
  const [metadata, content] = dataURL.split(",");
  // Mendapatkan tipe gambar dari metadata
  const type = metadata.match(/data:([^;]+)/)[1];

  // Mengonversi base64 ke blob
  const blob = atob(content);
  const arrayBuffer = new ArrayBuffer(blob.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < blob.length; i++) {
    uint8Array[i] = blob.charCodeAt(i);
  }

  // Membuat objek Blob dengan tipe gambar yang sesuai
  return new Blob([arrayBuffer], { type: type });
}

function retakeSnapshot() {
  const video = document.getElementById("cameraFeed");
  const captureButton = document.getElementById("capture-btn");
  const inputImageData = document.getElementById("capture-image-data");
  const flipCamera = document.getElementById("flip");
  const retakeButton = document.getElementById("re-take");
  const submitButton = document.getElementById("submit-btn");

  // Tampilkan kembali video dan tombol ambil gambar
  video.style.display = "block";
  flipCamera.style.display = "block";
  captureButton.style.display = "block";
  turnOnCamera();

  // Sembunyikan canvas dan tombol retake
  const canvas = document.getElementById("capture-image");
  canvas.style.display = "none";
  retakeButton.style.display = "none";

  // Kosongkan nilai inputImageData
  inputImageData.value = "";

  // Nonaktifkan tombol submit
  submitButton.setAttribute("disabled", "disabled");
}

var KTModalTwoFactorAuthentication = (function () {
  var e,
    t,
    o,
    n,
    i,
    a,
    r,
    s,
    l,
    d,
    c,
    u,
    m,
    f,
    mode,
    upload,
    capture,
    p = function () {
      o.classList.remove("d-none"),
        i.classList.add("d-none"),
        d.classList.add("d-none");
    };
  return {
    init: function () {
      (e = document.querySelector("#kt_modal_two_factor_authentication")) &&
        ((t = new bootstrap.Modal(e)),
        (o = e.querySelector('[data-kt-element="options"]')),
        (n = e.querySelector('[data-kt-element="options-select"]')),
        (i = e.querySelector('[data-kt-element="sms"]')),
        (a = e.querySelector('[data-kt-element="sms-form"]')),
        (r = e.querySelector('[data-kt-element="sms-submit"]')),
        (s = e.querySelector('[data-kt-element="sms-cancel"]')),
        (d = e.querySelector('[data-kt-element="apps"]')),
        (c = e.querySelector('[data-kt-element="apps-form"]')),
        (u = e.querySelector('[data-kt-element="apps-submit"]')),
        (m = e.querySelector('[data-kt-element="apps-cancel"]')),
        (upload = e.querySelector('[name="auth_option"][value="apps"]')),
        (capture = e.querySelector('[name="auth_option"][value="sms"]')),
        upload.addEventListener("click", function (e) {
          e.preventDefault(),
            o.classList.add("d-none"),
            d.classList.remove("d-none"),
            turnOffCamera();
        }),
        capture.addEventListener("click", function (e) {
          e.preventDefault(),
            o.classList.add("d-none"),
            i.classList.remove("d-none"),
            turnOnCamera();
        }),
        
        // n.addEventListener("click", function (e) {
        //   e.preventDefault();
        //   var t = o.querySelector('[name="auth_option"]:checked');
        //   o.classList.add("d-none"),
        //     "sms" == t.value
        //       ? (i.classList.remove("d-none"), turnOnCamera())
        //       : d.classList.remove("d-none");
        // }),
        (l = FormValidation.formValidation(a, {
          fields: {
            // image_file: {
            //   validators: {
            //     notEmpty: { message: "Harap ambil gambar terlebih dahulu." },
            //   },
            // },
          },
          plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
              rowSelector: ".fv-row",
              eleInvalidClass: "",
              eleValidClass: "",
            }),
          },
        })),       
        r.addEventListener("click", function (e) {
          e.preventDefault(),
            l &&
              l.validate().then(function (e) {
                console.log("validated!"),
                  "Valid" == e
                    ? (r.setAttribute("data-kt-indicator", "on"),
                      (r.disabled = !0),
                      (document.getElementById("dismiss-modal").style.display =
                        "none"),
                      document.getElementById("form-diagnose-capture").submit(),
                      setTimeout(function () {
                        r.removeAttribute("data-kt-indicator"),
                          (r.disabled = !1);
                      }, 60000))
                    : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: { confirmButton: "btn btn-primary" },
                      });
              });
        }),
        s.addEventListener("click", function (e) {
          e.preventDefault(),
            o.querySelector('[name="auth_option"]:checked'),
            o.classList.remove("d-none"),
            i.classList.add("d-none");
        }),
        (f = FormValidation.formValidation(c, {
          fields: {
            image_file: {
              validators: { notEmpty: { message: "Unggah minimal 1 gambar!" } },
            },
          },
          plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
              rowSelector: ".fv-row",
              eleInvalidClass: "",
              eleValidClass: "",
            }),
          },
        })),
        u.addEventListener("click", function (e) {
          e.preventDefault(),
            f &&
              f.validate().then(function (e) {
                console.log("validated!");
                "Valid" == e
                  ? (u.setAttribute("data-kt-indicator", "on"),
                    (u.disabled = !0),
                    (document.getElementById("dismiss-modal").style.display =
                      "none"),
                    document.getElementById("form-diagnose").submit(),
                    setTimeout(function () {
                      u.removeAttribute("data-kt-indicator"), (u.disabled = !1);
                    }, 60000))
                  : Swal.fire({
                      text: "Belum ada gambar yang di unggah.",
                      icon: "error",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: { confirmButton: "btn btn-primary" },
                    });
              });
        }),
        m.addEventListener("click", function (e) {
          e.preventDefault(),
            o.querySelector('[name="auth_option"]:checked'),
            o.classList.remove("d-none"),
            d.classList.add("d-none");
        }));
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  KTModalTwoFactorAuthentication.init();

  // Inisialisasi Dropzone
  new Dropzone("#kt_ecommerce_add_product_media", {
    url: "/diagnosis/",
    paramName: "image_file",
    maxFiles: 1,
    maxFilesize: 10,
    addRemoveLinks: true,
    method: "GET",
    headers: {
      "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]')
        .value,
    },
    accept: function (file, done) {
      if (this.files.length > 1) {
        this.removeFile(this.files[0]);
      }
      var allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/JPEG",
        "image/PNG",
        "image/JPG",
      ];
      if (allowedTypes.indexOf(file.type) === -1) {
        Swal.fire({
          text: "File harus berupa gambar!",
          icon: "error",
          buttonsStyling: !1,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-primary" },
        });
        this.removeFile(file);
      } else {
        var fileList = new DataTransfer();
        fileList.items.add(file);

        document.getElementById("imageInput").files = fileList.files;
        done();
      }
    },
  });
});
