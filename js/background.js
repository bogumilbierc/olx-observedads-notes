chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if(details.frameId === 0) {
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
			var tabUrl = tab.url;
			if(tabUrl.indexOf("olx") !== -1){
		
				console.log("Sending message to OLX tab");
				chrome.tabs.sendMessage(tab.id, {greeting: "olx"}, function(response) {
					console.log(response.farewell);
				});
				
			}
        });
    }
});