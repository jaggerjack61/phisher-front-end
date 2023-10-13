// Send a message to the background script to request the current tab URL
chrome.runtime.sendMessage({action: 'getTabURL'}, (response) => {
    // Create a json object with the current tab URL and other fields
    const data = {
      url: response,
      source: 'plugin',
      check_ssl: false
    };
    console.log(data);
    // Create a new XMLHttpRequest object to send data to the localhost server
    const xhr = new XMLHttpRequest();
    // Set the request method and url
    xhr.open('POST', 'http://localhost:8000/check/', true);
    // Set the request header for json content type
    xhr.setRequestHeader('Content-Type', 'application/json');
    // Set the callback function for when the request is completed
    xhr.onload = function() {
      // If the status code is OK
      if (xhr.status === 200) {
        // Parse the response text as a json object
        const result = JSON.parse(xhr.responseText);
  
        // Check if result.status is "phishing"
        if (result.status === 'phishing') {
          const overlay = document.createElement('div');
          // Set some styles for the overlay
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
          overlay.style.color = 'white';
          overlay.style.fontSize = '32px';
          overlay.style.textAlign = 'center';
          overlay.style.lineHeight = '100vh';
  
          // Set the overlay text to the status field of the result object
          overlay.textContent = "This site has been assessed to have a high probability of being a phishing site.";
  
          // Append the overlay to the document body
          document.body.appendChild(overlay);
  
          // Add an event listener to the overlay for click events
          overlay.addEventListener('click', function() {
            // Remove the overlay from the document body
            document.body.removeChild(overlay);
          });
        }
      } else {
        console.error('Error: ' + xhr.statusText);
      }
    };
    // Send the data as a json string
    xhr.send(JSON.stringify(data));
  });

  
  