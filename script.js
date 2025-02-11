  // Global variables for search and filter
  let currentSearch = '';
  let currentFilter = '';

  function filterTable(filter) {
    currentFilter = filter;
    updateTable();
  }

  function searchProducts() {
    currentSearch = document.getElementById('searchInput').value.trim().toLowerCase();
    updateTable();
  }

  function updateTable() {
    const rows = document.querySelectorAll("#productTable tbody tr");

    rows.forEach(row => {
        const productName = row.cells[0].textContent.toLowerCase();
        const productContent = row.cells[2].textContent.toLowerCase();
        const matchSearch = productName.includes(currentSearch) || productContent.includes(currentSearch);
        const matchFilter = currentFilter === '' || row.classList.contains(currentFilter);

        if (currentSearch !== '') {
            // Show rows that match the search, ignoring the filter
            row.classList.toggle('hidden', !matchSearch);
        } else {
            // Show rows that match the filter when there's no search
            row.classList.toggle('hidden', !matchFilter);
        }
    });
}

  // Modal functions
  function openModal(src, alt) {
    const modal = document.querySelector('.modal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;
    modalImage.alt = alt;
    modal.style.display = 'flex';
  }

  function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  }

 // Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const h1 = document.querySelector('h1');
const searchInput = document.querySelector('.search-container input[type="text"]');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const table = document.getElementById('productTable');
const ths = document.querySelectorAll('th');
const tds = document.querySelectorAll('td');
const footer = document.querySelector('footer');
const modalContent = document.querySelector('.modal-content');

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    h1.classList.add(savedTheme);
    searchInput.classList.add(savedTheme);
    filterButtons.forEach(button => button.classList.add(savedTheme));
    table.classList.add(savedTheme);
    ths.forEach(th => th.classList.add(savedTheme));
    tds.forEach(td => td.classList.add(savedTheme));
    footer.classList.add(savedTheme);
    modalContent.classList.add(savedTheme);
    themeToggle.classList.add(savedTheme);

    if (savedTheme === 'dark-theme') {
        themeToggle.textContent = '🌙'; // Set ikon bulan jika tema gelap
    } else {
        themeToggle.textContent = '☀️'; // Set ikon matahari jika tema terang (default)
    }
} else {
    themeToggle.textContent = '☀️'; // Set ikon matahari sebagai default
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    h1.classList.toggle('dark-theme');
    searchInput.classList.toggle('dark-theme');
    filterButtons.forEach(button => button.classList.toggle('dark-theme'));
    table.classList.toggle('dark-theme');
    ths.forEach(th => th.classList.toggle('dark-theme'));
    tds.forEach(td => td.classList.toggle('dark-theme'));
    footer.classList.toggle('dark-theme');
    modalContent.classList.toggle('dark-theme');
    themeToggle.classList.toggle('dark-theme');

    // Change theme toggle icon and aria-label
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Aktifkan Tema Terang'); // Update aria-label
    } else {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Aktifkan Tema Gelap'); // Update aria-label
    }


    // Save or remove theme
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
    } else {
        localStorage.removeItem('theme');
    }
});


  // More robust DOMContentLoaded handling and event listener attachment
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired.'); // Check if this logs

    // Attach event listeners to the filter buttons.  Do this INSIDE the DOMContentLoaded handler.
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('onclick').match(/'(.*?)'/)[1]; // Extract the filter value from onclick
        filterTable(filterValue);
      });
    });
      //Adding event listener to the images
      document.querySelectorAll('td img').forEach(img => {
          img.addEventListener('click', () => {
              openModal(img.src, img.alt);
          });
      });

    // Call filterTable with an empty string to show all products initially.
    filterTable('');
    console.log('Initial filterTable("") call complete.'); // Check if this logs

  });

  console.log('Script execution started.'); // Check if this logs

// Pagination Variables
let currentPage = 1;
const itemsPerPage = 30;

function showPage(page) {
    const rows = document.querySelectorAll("#productTable tbody tr");
    const totalItems = rows.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Update visible items
    rows.forEach((row, index) => {
        row.classList.toggle('hidden', !(index >= (page - 1) * itemsPerPage && index < page * itemsPerPage));
    });

    // Update page number display
    document.getElementById("pageInfo").textContent = `Page ${page} of ${totalPages}`;

    // Enable/Disable navigation buttons
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = page === totalPages;
}

function changePage(offset) {
    currentPage += offset;
    showPage(currentPage);
}

// Add pagination buttons
document.addEventListener("DOMContentLoaded", function () {
    const paginationContainer = document.createElement("div");
    paginationContainer.innerHTML = `
        <button id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageInfo">Page ${currentPage}</span>
        <button id="nextPage" onclick="changePage(1)">Next</button>
    `;
    paginationContainer.style.margin = "20px 0";
    paginationContainer.style.display = "flex";
    paginationContainer.style.justifyContent = "center";
    paginationContainer.style.gap = "10px";

    document.body.appendChild(paginationContainer);

    showPage(currentPage);
});
