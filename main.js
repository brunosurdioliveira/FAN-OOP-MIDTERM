// Create an array and store returned information as a JavaScript objects
var beerProducts = [];

// Create variable to identify current index (selected object in the array)
var initialIndex = 0;
var currentIndex = 50;

function Next() {
    // add 50 each time to current index
    currentIndex = (currentIndex >= beerProducts.length - 1) ? currentIndex : (currentIndex + 50);
    // Call function to display the beer informations
    displayBeers();
}

// AJAX
function getJSONAsync(url) {
    // We can do simple AJAX calls from any browsers using XMLHttpRequest() - XMLHttpRequest objects are used to interact with servers.
    var request = new XMLHttpRequest();
    // .onreadystatechange property contains the event handler to be called when the readystatechange event is fired, that is every time the readyState property of the XMLHttpRequest changes
    request.onreadystatechange = function () {
        // .readyState - Checks if is finish (4 means "DONE") - returns the state an XMLHttpRequest client is in
        // .status - check if everything is OK (200 means "DONE") - returns the numerical HTTP status code of the XMLHttpRequest's response.
        if (request.readyState === 4 && request.status === 200) {
            // Store in the beerProducts array the JS object
            beerProducts = JSON.parse(request.responseText);

            // Output the beer name and image
            displayBeers();
        }
    }
    // Open a connection using URL
    request.open("GET", url);
    request.setRequestHeader('x-api-key', '32isbi7Lug22v8CKogygf5b2EZwpdFhS2OotvWem');
    // Send the GET request
    request.send();
}

// Function to get the URL and call the function getJSONAsync()
function callURL(url) {
    var url = "https://rsd05guo67.execute-api.us-east-2.amazonaws.com/default/beerstore";
    getJSONAsync(url);
}

// Function to display the beer's information
function displayBeers() {
    // Get the output area
    var myDiv = document.getElementById("beerOutput");

    // Create table and table head
    var htmlData = "<table border=1>";
    htmlData += "<th>index</th>";
    htmlData += "<th>Name</th>";
    htmlData += "<th>Image</th>";
    htmlData += "<th>Type</th>";

    // iterage the objects array
    for (var index = initialIndex; index < currentIndex; index++) {
        // Check if the array is in the end
        if (index < beerProducts.length) {
            htmlData += "<tr>";
            htmlData += "<td>" + index + "</td>";
            htmlData += "<td>" + beerProducts[index].name + "</td>";
            htmlData += "<td>" + "<image src=" + beerProducts[index].image_url + ' width="150" height="160"></td>';
            var type = beerProducts[index].type;
            htmlData += "<td>" + `<button class="btn btn-info" onclick="displayBeersType('${type}')">Show type</button></td>`;
            htmlData += "</tr>";
        }
        else {
            // Assign a new value to current Index to start from 0
            currentIndex = 0;
            break;
        }
    }
    htmlData += "</table>";
    myDiv.innerHTML = htmlData;

    // Assign a new value to initialIndex to start from the end of the previously beer
    initialIndex = currentIndex;
}

// Function to show type
function displayBeersType(type) {
    alert("Selected type: " + type);
}