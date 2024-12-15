let page = 1;
let isLoading = false;
let filter = '';
let searchTerm = '';
const itemsPerPage = 10;
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API URL
// Throttle function to limit the rate of requests
function throttle(func, interval) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        func(...args);
      }
    };
  }
  
  // Debounce function to delay the API call when typing in the search box
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }
  async function fetchData(page, searchTerm, filter) {
    if (isLoading) return; // Prevent multiple simultaneous requests
    isLoading = true;
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
  
    const query = new URLSearchParams({
      _page: page,
      _limit: itemsPerPage,
      q: searchTerm,
      category: filter,
    });
  
    try {
      const response = await fetch(`${apiUrl}?${query}`);
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isLoading = false;
      loadingElement.style.display = 'none';
    }
  }
  
  function displayData(data) {
    const dataList = document.getElementById('dataList');
    data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('dataItem');
      div.textContent = item.title;
      dataList.appendChild(div);
    });
  }
  function handleScroll() {
    const dataList = document.getElementById('dataList');
    if (dataList.scrollTop + dataList.clientHeight >= dataList.scrollHeight) {
      page++;
      fetchData(page, searchTerm, filter);
    }
  }
  
  window.addEventListener('scroll', throttle(handleScroll, 1000)); // Throttling the scroll event
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');
  
  searchInput.addEventListener('input', debounce((e) => {
    searchTerm = e.target.value;
    page = 1; // Reset to page 1 on new search
    document.getElementById('dataList').innerHTML = ''; // Clear existing data
    fetchData(page, searchTerm, filter);
  }, 500));
  
  filterSelect.addEventListener('change', (e) => {
    filter = e.target.value;
    page = 1; // Reset to page 1 on new filter
    document.getElementById('dataList').innerHTML = ''; // Clear existing data
    fetchData(page, searchTerm, filter);
  });
  document.addEventListener('DOMContentLoaded', () => {
    fetchData(page, searchTerm, filter);
  });
        
    
