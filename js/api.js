class ChatAPI {
    constructor() {
        this.baseURL = CONFIG.API.BASE_URL;
    }

    async sendMessage(message, cdp) {
        try {
            const response = await fetch(`${this.baseURL}${CONFIG.API.ENDPOINTS.chat}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    cdp,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async scrapeCDPDocs(cdp, query) {
        try {
            const response = await fetch(`${this.baseURL}${CONFIG.API.ENDPOINTS.scrape}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cdp,
                    query,
                    url: CONFIG.CDP_DOCS[cdp]
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error scraping CDP docs:', error);
            throw error;
        }
    }
} 