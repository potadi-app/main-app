"use strict";
var KTSigninGeneral = (function () {
  var t, e, r;
  return {
    init: function () {
      (t = document.querySelector("#kt_sign_in_form")),
        (e = document.querySelector("#kt_sign_in_submit")),
        (r = FormValidation.formValidation(t, {
          fields: {
            email: {
              validators: {
                regexp: {
                  regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "The value is not a valid email address",
                },
                notEmpty: { message: "Email address is required" },
              },
            },
            password: {
              validators: { notEmpty: { message: "The password is required" } },
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
        !(function (t) {
          try {
            return new URL(t), !0;
          } catch (t) {
            return !1;
          }
        })(e.closest("form").getAttribute("action"))          
          e.addEventListener("click", function (i) {
              i.preventDefault(),
                r.validate().then(function (r) {
                  "Valid" == r
                    ? (e.setAttribute("data-kt-indicator", "on"),
                      (e.disabled = !0),
                      axios.post(
                          e.closest("form").getAttribute("action"),
                          new FormData(t),
                            {
                              headers: {
                                'X-CSRFToken': '{{ csrf_token }}'
                              }
                            }
                        )
                        .then(function (e) {
                          if (e.data.success) {
                            t.reset(),
                              Swal.fire({
                                text: e.data.message,
                                icon: "success",
                                buttonsStyling: !1,
                                timer: 2000,
                                customClass: {
                                  confirmButton: "btn btn-primary",
                                },
                              }).then(() => {
                                  const redirectUrl  = t.getAttribute("data-kt-redirect-url");
                                  redirectUrl  && (location.href = redirectUrl );
                              });
                          }  else {
                                Swal.fire({ 
                                    text: e.data.message, icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } 
                                });
                            }
                        })
                        .catch(function (t) {
                          Swal.fire({
                            text: t.message,
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: { confirmButton: "btn btn-primary" },
                          });
                        })
                        .then(() => {
                          e.removeAttribute("data-kt-indicator"),
                            (e.disabled = !1);
                        }))
                    : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: { confirmButton: "btn btn-primary" },
                      });
                });
            });
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  KTSigninGeneral.init();
});
