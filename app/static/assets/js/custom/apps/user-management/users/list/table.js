"use strict";
function getCSRFToken() {
  const name = "csrftoken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

var KTUsersList = (function () {
  var e,
    t,
    n,
    r,
    o = document.getElementById("kt_table_users"),
    c = () => {
      o.querySelectorAll('[data-kt-users-table-filter="delete_row"]').forEach(
        (t) => {
          t.addEventListener("click", function (t) {
            t.preventDefault();
            const n = t.target.closest("tr"),
              id = n.querySelector("td .form-check-input").value,
              r = n
                .querySelectorAll("td")[1]
                .querySelectorAll("a")[1].innerText;

            Swal.fire({
              text: "Apakah kamu yakin ingin menghapus " + r + "?",
              icon: "warning",
              showCancelButton: !0,
              buttonsStyling: !1,
              confirmButtonText: "Hapus!",
              cancelButtonText: "Kembali",
              customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary",
              },
            }).then(function (t) {
              t.value
                ? axios
                    .request({
                      method: "DELETE",
                      url: "/del-history/" + id,
                      headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCSRFToken(),
                      },
                    })
                    .then(function (t) {
                      Swal.fire({
                        text: "Berhasil menghapus " + r + "!.",
                        icon: "success",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                          confirmButton: "btn fw-bold btn-primary",
                        },
                      })
                        .then(function () {
                          e.row($(n)).remove().draw();
                        })
                        .then(function () {
                          a();
                        });
                    })
                : "cancel" === t.dismiss &&
                  Swal.fire({
                    text: "Gagal menghapus" + customerName,
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: { confirmButton: "btn fw-bold btn-primary" },
                  });
            });
          });
        }
      );
    },
    l = () => {
      const c = o.querySelectorAll('[type="checkbox"]');
      (t = document.querySelector('[data-kt-user-table-toolbar="base"]')),
        (n = document.querySelector('[data-kt-user-table-toolbar="selected"]')),
        (r = document.querySelector(
          '[data-kt-user-table-select="selected_count"]'
        ));
      const s = document.querySelector(
        '[data-kt-user-table-select="delete_selected"]'
      );
      let selectedIds = [];

      c.forEach((e) => {
        e.addEventListener("click", function () {
          setTimeout(function () {
            if (e.checked) {
              if (!selectedIds.includes(e.value)) {
                selectedIds.push(e.value);
              }
            } else {
              const index = selectedIds.indexOf(e.value);
              if (index !== -1) {
                selectedIds.splice(index, 1);
              }
            }

            a();
          }, 50);
        });
      }),
        s.addEventListener("click", function () {
          if (selectedIds.length > 0) {
            Swal.fire({
              text: "Apa kamu yakin ingin menghapus data yang dipilih?",
              icon: "warning",
              showCancelButton: !0,
              buttonsStyling: !1,
              confirmButtonText: "Yes, delete!",
              cancelButtonText: "No, cancel",
              customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary",
              },
            }).then(function (result) {
              if (result.isConfirmed) {
                axios
                  .post(
                    "/del-sel-history/",
                    { ids: selectedIds },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCSRFToken(),
                      },
                    }
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      Swal.fire({
                        text: response.data.message,
                        icon: "success",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                          confirmButton: "btn fw-bold btn-primary",
                        },
                      })
                        .then(function () {
                          c.forEach((checkbox) => {
                            if (checkbox.checked) {
                              e.row($(checkbox.closest("tbody tr")))
                                .remove()
                                .draw();
                            }
                          });
                          o.querySelectorAll('[type="checkbox"]')[0].checked =
                            !1;
                        })
                        .then(function () {
                          a(), l();
                        });
                    } else {
                      Swal.fire({
                        text: "Gagal menghapus data yang dipilih",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                          confirmButton: "btn fw-bold btn-primary",
                        },
                      });
                    }
                  })
                  .catch(function (error) {
                    console.error(error);
                    Swal.fire({
                      text: "Gagal menghapus data yang dipilih",
                      icon: "error",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: { confirmButton: "btn fw-bold btn-primary" },
                    });
                  });
              }
            });
          } else {
            Swal.fire({
              text: "Pilih setidaknya satu item untuk dihapus",
              icon: "info",
              buttonsStyling: !1,
              confirmButtonText: "Ok, got it!",
              customClass: { confirmButton: "btn fw-bold btn-primary" },
            });
          }
        });
    };

  const a = () => {
    const e = o.querySelectorAll('tbody [type="checkbox"]');
    let c = !1,
      l = 0;
    e.forEach((e) => {
      e.checked && ((c = !0), l++);
    }),
      c
        ? ((r.innerHTML = l),
          t.classList.add("d-none"),
          n.classList.remove("d-none"))
        : (t.classList.remove("d-none"), n.classList.add("d-none"));
  };
  return {
    init: function () {
      o &&
        (o.querySelectorAll("tbody tr").forEach((e) => {
          const t = e.querySelectorAll("td"),
            n = t[3].innerText.toLowerCase();
          let r = 0,
            o = "minutes";
          n.includes("yesterday")
            ? ((r = 1), (o = "days"))
            : n.includes("mins")
            ? ((r = parseInt(n.replace(/\D/g, ""))), (o = "minutes"))
            : n.includes("hours")
            ? ((r = parseInt(n.replace(/\D/g, ""))), (o = "hours"))
            : n.includes("days")
            ? ((r = parseInt(n.replace(/\D/g, ""))), (o = "days"))
            : n.includes("weeks") &&
              ((r = parseInt(n.replace(/\D/g, ""))), (o = "weeks"));
          const c = moment().subtract(r, o).format();
          t[3].setAttribute("data-order", c);
          const l = moment(t[2].innerHTML, "DD MMM YYYY, LT").format();
          t[5].setAttribute("data-order", l);
        }),
        (e = $(o).DataTable({
          info: !1,
          order: [],
          pageLength: 10,
          lengthChange: !1,
          columnDefs: [
            { orderable: !1, targets: 0 },
            { orderable: !1, targets: 5 },
          ],
        })).on("draw", function () {
          l(), c(), a();
        }),
        l(),
        document
          .querySelector('[data-kt-user-table-filter="search"]')
          .addEventListener("keyup", function (t) {
            e.search(t.target.value).draw();
          }),
        document
          .querySelector('[data-kt-user-table-filter="reset"]')
          .addEventListener("click", function () {
            document
              .querySelector('[data-kt-user-table-filter="form"]')
              .querySelectorAll("select")
              .forEach((e) => {
                $(e).val("").trigger("change");
              }),
              e.search("").draw();
          }),
        c(),
        (() => {
          const t = document.querySelector(
              '[data-kt-user-table-filter="form"]'
            ),
            n = t.querySelector('[data-kt-user-table-filter="filter"]'),
            r = t.querySelectorAll("select");
          n.addEventListener("click", function () {
            var t = "";
            r.forEach((e, n) => {
              e.value &&
                "" !== e.value &&
                (0 !== n && (t += " "), (t += e.value));
            }),
              e.search(t).draw();
          });
        })());
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  KTUsersList.init();
});
