// Handle on install
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed!');
})

// Create the context menu
chrome.contextMenus.create({
    contexts: ["page", "link"],
    documentUrlPatterns: ["http://*/*", "https://*/*"],
    id: "GGFF_It",
    title: "GGFF IT"
})

// Handle on click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info?.linkUrl || info?.pageUrl) {
        // Send the GGFF api a request to create a new GGFF.io short link
        const ggffedURL = (await fetch("https://ggff.io/api/actions/create", {
            "headers": {
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "GGFF-IT Extension (URL TO BE PUT HERE)"
            },
            "body": `url=${encodeURIComponent(info.linkUrl ?? info.pageUrl)}`,
            "method": "POST"
        })).url

        chrome.tabs.create({url: ggffedURL}) 
    }
})
