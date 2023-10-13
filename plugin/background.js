
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // If the message is a request for the current tab URL
    if (message.action === 'getTabURL') {
      // Get the current tab ID from the sender
      const tabId = sender.tab.id;
      // Use the tabs API to get the tab URL
      chrome.tabs.get(tabId, (tab) => {
        // Send back the tab URL as a response
        sendResponse(tab.url);
      });
      // Indicate that the response is asynchronous
      return true;
    }
  });


  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getCurrentUrl
    });
  });
  
  function getCurrentUrl() {
    // Get the current URL from the tab
    let currentUrl = window.location.href;
    console.log(currentUrl);
    
    // Send a message to the popup with the current URL
    chrome.runtime.sendMessage({url: currentUrl});
  }

