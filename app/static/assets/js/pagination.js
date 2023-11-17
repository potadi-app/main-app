$(document).ready(function () {
  var table = $("#history").DataTable();

  // Function to update the pagination links and data info dynamically
  function updatePaginationAndDataInfo() {
    var info = table.page.info();
    var currentPage = info.page + 1;
    var totalPages = info.pages;
    var entriesInfo =
      "Showing " +
      (info.start + 1) +
      " to " +
      info.end +
      " of " +
      info.recordsTotal +
      " entries";
    var paginationHTML = "";

    // Add previous button
    if (currentPage > 1) {
      paginationHTML +=
        '<a class="icon item" id="previousPage"><i class="left chevron icon"></i></a>';
    } else {
      paginationHTML +=
        '<a class="icon item disabled"><i class="left chevron icon"></i></a>';
    }

    // Add page numbers
    for (var i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHTML += '<a class="item pageNumber active">' + i + "</a>";
      } else {
        paginationHTML += '<a class="item pageNumber">' + i + "</a>";
      }
    }

    // Add next button
    if (currentPage < totalPages) {
      paginationHTML +=
        '<a class="icon item" id="nextPage"><i class="right chevron icon"></i></a>';
    } else {
      paginationHTML +=
        '<a class="icon item disabled"><i class="right chevron icon"></i></a>';
    }

    $(".pagination.menu").html(paginationHTML);
    $(".ui.info").text(entriesInfo);
  }

  // Initial pagination and data info update
  updatePaginationAndDataInfo();

  // Custom pagination click handler
  $(document).on("click", ".pageNumber", function () {
    var page = $(this).text();
    table.page(parseInt(page) - 1).draw("page"); // DataTables uses 0-based indexing
    updatePaginationAndDataInfo(); // Update pagination links and data info
  });

  // Previous page click handler
  $(document).on("click", "#previousPage", function () {
    var currentPage = table.page();
    if (currentPage > 0) {
      table.page(currentPage - 1).draw("page");
      updatePaginationAndDataInfo(); // Update pagination links and data info
    }
  });

  // Next page click handler
  $(document).on("click", "#nextPage", function () {
    var currentPage = table.page();
    if (currentPage < table.page.info().pages - 1) {
      table.page(currentPage + 1).draw("page");
      updatePaginationAndDataInfo(); // Update pagination links and data info
    }
  });

  // Custom search input event handler
  $(".ui.search input.prompt").on("keyup", function () {
    var searchTerm = $(this).val().toLowerCase();
    table.search(searchTerm).draw();
  });

  // Custom dropdown for "Show x entries" event handler
  $(".ui.dropdown").dropdown({
    onChange: function (value, text) {
      table.page.len(value).draw(); // Update table length
      updatePaginationAndDataInfo();
    },
  });

  $(".ui.dropdown").dropdown("set selected", "5").trigger("change");
});
