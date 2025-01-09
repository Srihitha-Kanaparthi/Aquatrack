// navigation.js

// Function to dynamically load content based on the selected section
function loadContent(section) {
    let page = '';

    switch (section) {
        case 'home':
            page = '/templates/home2.html';
            break;
        case 'profile':
            page = '/templates/profile.html';
            break;
        case 'login':
            page = '/templates/welcome.html';
            break;
        case 'signup':
            page = '/templates/signup.html';
            break;
        default:
            page = '/templates/home.html'; // Default to home page if section is not recognized
    }
    // Use jQuery's load() to fetch and display the HTML file content dynamically
    $('#main-content').load(page, function(response, status, xhr) {
        if (status === "error" || (status === "success" && !response.trim())) {
            // Handle the error (either status is error or content is empty)
            console.error("Error loading content: ", xhr.status, xhr.statusText);
            // Display an error message to the user
            $('#main-content').html(`<div class="alert alert-danger" role="alert">
                                        Error loading content. Please try again later.
                                    </div>`);
        } else if (section === 'video') {
            // Replace the content of video.html with the updated content
            $('#main-content').html(localStorage.getItem('videoContent'));
        } else if (section === 'AR' || section === 'VR') {
            // Redirect to the AR or VR page directly
            window.location.href = page;
        }
    });
}

//Click events tied to the navigation for the entire application
$(document).ready(function() {
    // Event listeners for navigation links
    $('#home-link').click(function(event) {
        event.preventDefault();
        loadContent('home');
    });

    $('#profile-link').click(function(event) {
        event.preventDefault();
        loadContent('profile');
    });

    $('#logout-link').click(function(event) {
    event.preventDefault();
    localStorage.setItem('loggedIn', false); // Set loggedIn to false
    sessionStorage.removeItem('loggedInUser'); // Remove user name from session
    loadContent('login'); // Redirect to login page
    });

    // Event listener for app name link
    $('#app-name-link').click(function(event) {
        event.preventDefault(); 
        loadContent('home');
    });


    // Event listener for clicking outside the navigation bar to close it
    $(document).click(function(event) {
        // Check if the clicked element is within the navigation bar
        if (!$(event.target).closest('.navbar').length && $('.navbar-collapse').hasClass('show')) {
        // Trigger the toggle event instead of directly removing the class
        $('.navbar-toggler').trigger('click');
        }
    });

    // Document ready function to attach event listeners after the DOM is loaded
$(document).ready(function() {
    // Event listener for the 'Profile' link
    $('#profile-link').click(function(event) {
      event.preventDefault(); // Prevent the default link behavior
      loadContent('profile'); // Load the 'profile' content
    });
    
    // Load the default page from local storage or load Home if not set
    // Check if the user has visited before, using local storage
    if (!localStorage.getItem('firstVisit')) {
        // This is the user's first visit
        localStorage.setItem('firstVisit', true);
        loadContent('login'); // Load login on first visit
    } else {
        // This is not the user's first visit, load home if they are logged in
        if (localStorage.getItem('loggedIn') === 'true') {
            loadContent('home'); // Load home if logged in
        } else {
            // They haven't logged in yet, so go to login
            loadContent('login'); // Load login if not logged in
        }
    }
});
