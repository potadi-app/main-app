"use strict";
var KTProjectOverview = (function () {
  var t = KTUtil.getCssVariableValue("--bs-primary"),
    e = KTUtil.getCssVariableValue("--bs-primary-light"),
    a = KTUtil.getCssVariableValue("--bs-success"),
    r = KTUtil.getCssVariableValue("--bs-success-light"),
    o = KTUtil.getCssVariableValue("--bs-gray-200"),
    n = KTUtil.getCssVariableValue("--bs-gray-500");
  return {
    init: function () {
      var s, i;
      (s = document.getElementById("kt_project_overview_graph")),
        (i = parseInt(KTUtil.css(s, "height"))),
        s &&
          new ApexCharts(s, {
            series: [
              { name: "Incomplete", data: [70, 70, 80, 80, 75, 75, 75] },
              { name: "Complete", data: [55, 55, 60, 60, 55, 55, 60] },
            ],
            chart: { type: "area", height: i, toolbar: { show: !1 } },
            plotOptions: {},
            legend: { show: !1 },
            dataLabels: { enabled: !1 },
            fill: { type: "solid", opacity: 1 },
            stroke: { curve: "smooth", show: !0, width: 3, colors: [t, a] },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              axisBorder: { show: !1 },
              axisTicks: { show: !1 },
              labels: { style: { colors: n, fontSize: "12px" } },
              crosshairs: {
                position: "front",
                stroke: { color: t, width: 1, dashArray: 3 },
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: { fontSize: "12px" },
              },
            },
            yaxis: { labels: { style: { colors: n, fontSize: "12px" } } },
            states: {
              normal: { filter: { type: "none", value: 0 } },
              hover: { filter: { type: "none", value: 0 } },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: { type: "none", value: 0 },
              },
            },
            tooltip: {
              style: { fontSize: "12px" },
              y: {
                formatter: function (t) {
                  return t + " tasks";
                },
              },
            },
            colors: [e, r],
            grid: {
              borderColor: o,
              strokeDashArray: 4,
              yaxis: { lines: { show: !0 } },
            },
            markers: { colors: [e, r], strokeColor: [t, a], strokeWidth: 3 },
          }).render(),
        (function () {
          var t = document.querySelector("#kt_profile_overview_table");
          if (!t) return;
          t.querySelectorAll("tbody tr").forEach((t) => {
            const e = t.querySelectorAll("td"),
              a = moment(e[1].innerHTML, "MMM D, YYYY").format();
            e[1].setAttribute("data-order", a);
          });
          const e = $(t).DataTable({ info: !1, order: [] }),
            a = document.getElementById("kt_filter_orders"),
            r = document.getElementById("kt_filter_year");
          var o, n;
          a.addEventListener("change", function (t) {
            e.column(3).search(t.target.value).draw();
          }),
            r.addEventListener("change", function (t) {
              switch (t.target.value) {
                case "thisyear":
                  (o = moment().startOf("year").format()),
                    (n = moment().endOf("year").format()),
                    e.draw();
                  break;
                case "thismonth":
                  (o = moment().startOf("month").format()),
                    (n = moment().endOf("month").format()),
                    e.draw();
                  break;
                case "lastmonth":
                  (o = moment()
                    .subtract(1, "months")
                    .startOf("month")
                    .format()),
                    (n = moment()
                      .subtract(1, "months")
                      .endOf("month")
                      .format()),
                    e.draw();
                  break;
                case "last90days":
                  (o = moment().subtract(30, "days").format()),
                    (n = moment().format()),
                    e.draw();
                  break;
                default:
                  (o = moment()
                    .subtract(100, "years")
                    .startOf("month")
                    .format()),
                    (n = moment().add(1, "months").endOf("month").format()),
                    e.draw();
              }
            }),
            $.fn.dataTable.ext.search.push(function (t, e, a) {
              var r = o,
                s = n,
                i = parseFloat(moment(e[1]).format()) || 0;
              return !!(
                (isNaN(r) && isNaN(s)) ||
                (isNaN(r) && i <= s) ||
                (r <= i && isNaN(s)) ||
                (r <= i && i <= s)
              );
            }),
            document
              .getElementById("kt_filter_search")
              .addEventListener("keyup", function (t) {
                e.search(t.target.value).draw();
              });
        })();
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  KTProjectOverview.init();
});

const viewDetail = async (item_id) => {
  const t = document.getElementById("project_overview_chart");

  if (!t) return;

  try {
    const response = await axios.get(`detail-history/${item_id}`);
    const data = response.data.data;

    document.getElementById('filename').innerHTML = `${data.filename}`;

    document.getElementById("upload_date").innerHTML = new Date(
      data.upload_date
    ).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const labelElement = document.getElementById("label");
    labelElement.classList.remove(
      "text-success",
      "text-warning",
      "text-danger"
    );

    if (data.label === "Early Blight") {
      labelElement.classList.add("text-warning");
    } else if (data.label === "Late Blight") {
      labelElement.classList.add("text-danger");
    } else {
      labelElement.classList.add("text-success");
    }

    labelElement.innerHTML = data.label;

    document.getElementById('conf-healthy').innerHTML = `${data.detail['Healthy']}%`;
    document.getElementById('conf-early').innerHTML = `${data.detail['Early Blight']}%`;
    document.getElementById('conf-late').innerHTML = `${data.detail['Late Blight']}%`;

    const existingChart = Chart.getChart("project_overview_chart");
    if (existingChart) existingChart.destroy();

    const context = t.getContext("2d");
    new Chart(context, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [
              data.detail["Healthy"],
              data.detail["Early Blight"],
              data.detail["Late Blight"],
            ],
            backgroundColor: ["#50CD89", "#FBC704", "#F1416C"],
          },
        ],
        labels: ["Healthy", "Early Blight", "Late Blight"],
      },
      options: {
        chart: { fontFamily: "inherit" },
        cutoutPercentage: 75,
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        title: { display: false },
        animation: { animateScale: true, animateRotate: true },
        tooltips: {
          enabled: true,
          intersect: false,
          mode: "nearest",
          bodySpacing: 5,
          yPadding: 10,
          xPadding: 10,
          caretPadding: 0,
          displayColors: false,
          backgroundColor: "#20D489",
          titleFontColor: "#ffffff",
          cornerRadius: 4,
          footerSpacing: 0,
          titleSpacing: 0,
        },
        plugins: { legend: { display: false } },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
