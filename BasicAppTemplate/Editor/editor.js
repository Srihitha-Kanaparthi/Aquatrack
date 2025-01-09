// editor.js

$(document).ready(function() {
    // Event listener for loading the preview
    $('#load-preview').click(function() {
        const htmlContent = $('#html-editor').val(); // Get the HTML content from the textbox
        const jsContent = $('#js-editor').val(); // Get the JavaScript content from the JavaScript editor

        // Create a script element with the JavaScript content
        const scriptTag = `<script>${jsContent}</script>`;

        // Combine HTML content with the script tag at the bottom
        const combinedContent = htmlContent + scriptTag;

        // Load the combined content into the preview panel
        $('#preview-panel').html(combinedContent);
    });

    // Event listener for saving the template
    $('#save-template').click(function() {
        const htmlContent = $('#html-editor').val(); // Get the HTML content from the textbox
        const jsContent = $('#js-editor').val(); // Get the JavaScript content from the JavaScript editor

        // Create a script element with the JavaScript content
        const scriptTag = `<script>${jsContent}</script>`;

        // Combine HTML content with the script tag at the bottom
        const combinedContent = htmlContent + scriptTag;

        // Check if there is content to save
        if (combinedContent.trim() === "") {
            alert('Please enter some HTML and JavaScript content before saving.');
            return;
        }

        const fileName = prompt("Enter the name for the new HTML template file (e.g., newTemplate.html):");
        if (fileName) {
            saveTemplateToFile(combinedContent, fileName); // Save the combined content
        }
    });

    // Event listener for updating the CSS theme link
    $('#update-theme').click(function() {
        const themeURL = $('#css-theme-link').val(); // Get the entered CSS theme URL

        // Check if the URL is not empty
        if (themeURL.trim() !== "") {
            $('#theme-css').attr('href', themeURL); // Update the href attribute of the CSS link element
            alert('Theme updated successfully!');
        } else {
            alert('Please enter a valid CSS theme URL.');
        }
    });

    // Event listener for downloading the template as an HTML file
    $('#download-template').click(function() {
        const htmlContent = $('#html-editor').val(); // Get the HTML content from the textbox
        const jsContent = $('#js-editor').val(); // Get the JavaScript content from the JavaScript editor

        // Create a script element with the JavaScript content
        const scriptTag = `<script>${jsContent}</script>`;

        // Combine HTML content with the script tag at the bottom
        const combinedContent = htmlContent + scriptTag;

        // Check if there is content to download
        if (combinedContent.trim() === "") {
            alert('Please enter some HTML and JavaScript content before downloading.');
            return;
        }

        const fileName = prompt("Enter the name for the HTML file (e.g., template.html):");
        if (fileName) {
            downloadHTMLFile(combinedContent, fileName); // Download the combined HTML and JavaScript content
        }
    });

    // Function to download the combined HTML and JavaScript content as a file
    function downloadHTMLFile(content, fileName) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Function to save the combined HTML and JavaScript content to a file (for server-side saving)
    function saveTemplateToFile(content, fileName) {
        $.ajax({
            type: "POST",
            url: "/save-template", // Server-side endpoint to handle file saving
            data: {
                fileName: fileName,
                content: content
            },
            success: function(response) {
                $('#save-message').show().text(`Template saved successfully as ${fileName}!`);
            },
            error: function() {
                alert('Error saving the template. Please try again.');
            }
        });
    }
});
