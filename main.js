var request = new XMLHttpRequest();
var loadCount = 10; // Initial number of responses to load
var loadedAll = false; // Flag to track whether all data is loaded

const apiUrl = 'https://api.github.com/users/ahiremayur';

// Make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

  })
  .catch(error => {
    console.error('Error:', error);
  });

function loadData() {
    request.open('GET', 'https://api.github.com/users/ahiremayur/repos', true);

    request.onload = function () {
        var data = JSON.parse(this.response);

        var statusHTML = '';
        for (var i = 0; i < loadCount; i++) {
            statusHTML += '<div>';
            statusHTML += '<h4>' + data[i].name + '</h4>';
            statusHTML += '<p>' + data[i].html_url + '</p>';
            statusHTML += '<a>' + data[i].language + '</a>';
            statusHTML += '</div>';
        }

        $('#container').html(statusHTML);

        // Check if there are more items to load
        if (loadCount < data.length && !loadedAll) {
            // Add a "Load More" button if it hasn't been added yet
            if ($('#loadMore').length === 0) {
                $('#container').append('<button id="loadMore">Load More</button>');

                // Attach click event to the "Load More" button
                $('#loadMore').on('click', function () {
                    loadAllData(); // Load all remaining items
                });
            }
        }
    };

    request.send();
}

// Function to load all responses
function loadAllData() {
    request.open('GET', 'https://api.github.com/users/ahiremayur/repos', true);

    request.onload = function () {
        var data = JSON.parse(this.response);

        var statusHTML = '';
        for (var i = 0; i < data.length; i++) {
            statusHTML += '<div>';
            statusHTML += '<h4>' + data[i].name + '</h4>';
            statusHTML += '<p>' + data[i].html_url + '</p>';
            statusHTML += '<a>' + data[i].language + '</a>';
            statusHTML += '</div>';
        }

        $('#container').html(statusHTML);

        // Set the flag to indicate all data is loaded
        loadedAll = true;

        // Remove the "Load More" button
        $('#loadMore').remove();
    };

    request.send();
}

// Initial load
loadData();