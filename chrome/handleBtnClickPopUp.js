document.getElementById('btn').addEventListener('click', async () => {
    // Get the current tab's URL
    const url = (await chrome.tabs.query({active: true, currentWindow: true}))[0].url
    const urlObj = new URL(url)
    
    // Handle the user not being on a HTTP(S) URL
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        alert('This page cannot be GGFFed!')
        window.close()
        return
    }

    // Grab the results from GGFF.io
    const response = (await fetch("https://ggff.io/api/actions/create", {
        "headers": {
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "user-agent": "GGFF-IT Extension (URL TO BE PUT HERE)"
        },
        "body": `url=${encodeURIComponent(url)}`,
        "method": "POST"
    }))

    // Check if the response was OK
    if (!response.ok) {
        alert('GGFF failed!')
        return
    }

    window.open(response.url, "_blank")
})
