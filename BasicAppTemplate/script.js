$(document).ready(function() {
  // Theme Management: Check if a theme is stored in local storage and apply it
  const currentTheme = localStorage.getItem('theme') || 'light';
  setTheme(currentTheme);
  
  // Event listener for theme toggle button
  $('#theme-toggle').click(function() {
    const newTheme = $('body').hasClass('light-theme') ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // Function to set the theme by enabling/disabling Bootstrap CSS files
  function setTheme(theme) {
    if (theme === 'light') {
      $('#bootstrap-light').prop('disabled', false);
      $('#bootstrap-dark').prop('disabled', true);
      $('body').removeClass('dark-theme').addClass('light-theme');
      $('.navbar').removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light');
      $('#theme-toggle').text('Switch to Dark Theme');
    } else {
      $('#bootstrap-light').prop('disabled', true);
      $('#bootstrap-dark').prop('disabled', false);
      $('body').removeClass('light-theme').addClass('dark-theme');
      $('.navbar').removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark');
      $('#theme-toggle').text('Switch to Light Theme');
    }
    localStorage.setItem('theme', theme);
  }
  
  // ... Your other code ...

  // Get references to ALL elements (use unique variable names!)
  const unitSelect = document.getElementById('unitSelect'); 
  const weekStartSelect = document.getElementById('weekStartSelect');
  const intakeGoalSelect = document.getElementById('intakeGoalSelect');
  const intakeGoalUnit = document.getElementById('intakeGoalUnit'); 

  // ... (Get user's saved settings - example) ...
  const savedUnits = 'ml';
  const savedWeekStart = 'Wednesday';

  // Set default selected options 
  unitSelect.value = savedUnits;
  weekStartSelect.value = savedWeekStart;

  function updateIntakeGoalUnit() {
    const selectedUnit = unitSelect.value === 'ml' ? 'ml' : 'oz';
    const savedIntakeGoal = parseInt(localStorage.getItem('intakeGoal') || '2000'); 
  
    // Update the unit display
    intakeGoalUnit.textContent = selectedUnit;
  
    // *** IMPROVED METHOD TO CLEAR OPTIONS ***
    intakeGoalSelect.options.length = 0; // This clears the options more reliably
  
    // Generate new options 
    for (let i = 500; i <= 8000; i += 500) {
      const option = document.createElement('option');
      option.value = i;
      option.text = `${i} ${selectedUnit}`;
  
      // Set selected option
      if (i === savedIntakeGoal) {
        option.selected = true;
      }
  
      intakeGoalSelect.appendChild(option); 
    }
  }
  
  
  // Event listeners to handle changes
  unitSelect.addEventListener('change', (event) => {
    const selectedUnit = event.target.value;
    // ... Save the selectedUnit to user preferences ...
    console.log("Selected unit:", selectedUnit);

    // Update intake goal unit AND options when unit selection changes
    updateIntakeGoalUnit(); 
  });

  weekStartSelect.addEventListener('change', (event) => {
    const selectedDay = event.target.value;
    // ... Save the selectedDay to user preferences ...
    console.log("Selected week start:", selectedDay);
  });

  intakeGoalSelect.addEventListener('change', (event) => {
    const newIntakeGoal = event.target.value;
    // ... Save newIntakeGoal to user preferences ... 
    console.log("Selected intake goal:", newIntakeGoal); 
  }); 

  // Call updateIntakeGoalUnit() on page load to initialize
  updateIntakeGoalUnit(); 

  // Register service worker for the PWA 
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js')
      .then(function (registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function (error) {
        console.log('Service Worker registration failed:', error);
      });
    });
  } 

}); 
