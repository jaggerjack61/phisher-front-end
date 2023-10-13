document.addEventListener("DOMContentLoaded", function () {
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", function () {
      var status = document.querySelector('input[name="status"]:checked').value;
      var currentUrl = "";
      
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        currentUrl = tabs[0].url;
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8000/status/", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            submitBtn.innerText = "Sent";
            submitBtn.disabled = true;
          }
        };
        
        var data = JSON.stringify({
          "url": currentUrl,
          "status": status,
          "source": "plugin"
        });
        
        xhr.send(data);
      });
    });
  });