document.addEventListener('DOMContentLoaded', () => {
  // Retrieve quotes from local storage or set default quotes
  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The purpose of our lives is to be happy.", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteBtn = document.getElementById('addQuoteBtn');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const categoryFilter = document.getElementById('categoryFilter');
  const exportQuotesBtn = document.getElementById('exportQuotes');

  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategoryFilter();
  }

  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }

  // Function to add a new quote
  function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      newQuoteText.value = '';
      newQuoteCategory.value = '';
      saveQuotes();
      alert('Quote added successfully!');
    } else {
      alert('Please enter both a quote and a category.');
    }
  }

  // Function to filter quotes based on selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    } else {
      quoteDisplay.textContent = 'No quotes available for this category.';
    }
  }

  // Function to populate category filter dropdown
  function populateCategoryFilter() {
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  // Function to export quotes to a JSON file
  function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  addQuoteBtn.addEventListener('click', addQuote);
  exportQuotesBtn.addEventListener('click', exportQuotes);

  // Initial setup
  saveQuotes();
  showRandomQuote();
});
