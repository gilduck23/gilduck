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