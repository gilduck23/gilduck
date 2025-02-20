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
    const productCards = document.querySelectorAll(".product-card"); // Pilih elemen .product-card sekarang

    productCards.forEach(card => { // Loop melalui product cards, bukan rows
        const productName = card.querySelector("h3").textContent.toLowerCase(); // Ambil teks dari h3
        const productContent = card.querySelector("p").textContent.toLowerCase(); // Ambil teks dari p
        const matchSearch = productName.includes(currentSearch) || productContent.includes(currentSearch);
        const matchFilter = currentFilter === '' || card.classList.contains(currentFilter);

        if (currentSearch !== '') {
            // Show rows that match the search, ignoring the filter
            card.classList.toggle('hidden', !matchSearch); // Tampilkan/sembunyikan card
        } else {
            // Show rows that match the filter when there's no search
            card.classList.toggle('hidden', !matchFilter); // Tampilkan/sembunyikan card
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
const html = document.documentElement; // Get the <html> element

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.classList.add('dark'); // Add 'dark' class to <html> for dark theme
    themeToggle.textContent = '🌙';
} else {
    themeToggle.textContent = '☀️';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark'); // Toggle 'dark' class on <html>

    // Change theme toggle icon and aria-label
    if (html.classList.contains('dark')) {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Aktifkan Tema Terang');
        localStorage.setItem('theme', 'dark'); // Save dark theme preference
    } else {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Aktifkan Tema Gelap');
        localStorage.removeItem('theme'); // Remove dark theme preference
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
const itemsPerPage = 32;

function showPage(page) {
    const productCards = document.querySelectorAll(".product-card");
    const totalItems = productCards.length;
    const itemsPerPage = 32; // Sudah diubah menjadi 32
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    console.log("Halaman:", page); // Tambahkan log halaman saat ini
    console.log("Total Item:", totalItems); // Tambahkan log total item
    console.log("Item per Halaman:", itemsPerPage); // Tambahkan log item per halaman
    console.log("Total Halaman:", totalPages); // Tambahkan log total halaman

    productCards.forEach((card, index) => {
        const shouldBeVisible = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage);
        console.log(`Produk ke-${index + 1} (Halaman ${page}):`, shouldBeVisible ? "Tampil" : "Tersembunyi"); // Log status produk
        card.classList.toggle('hidden', !shouldBeVisible);
    });

    document.getElementById("pageInfo").textContent = `Halaman ${page} dari ${totalPages}`;
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
    paginationContainer.className = "pagination-container";
    paginationContainer.innerHTML = `
        <button id="prevPage" onclick="changePage(-1)">⬅️ Previous</button>
        <span id="pageInfo">Page ${currentPage}</span>
        <button id="nextPage" onclick="changePage(1)">Next ➡️</button>
    `;

    document.body.appendChild(paginationContainer);
    showPage(currentPage);
});
