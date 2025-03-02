class ChatApp {
    constructor() {
        this.ui = new ChatUI();
        this.api = new ChatAPI();
        this.messageHistory = [];
        
        this.initialize();
    }

    initialize() {
        // Set up the send callback
        this.ui.setOnSendCallback((message) => this.handleUserMessage(message));
    }

    async handleUserMessage(message) {
        try {
            // Disable input while processing
            this.ui.disableInput();

            // Add user message to UI
            this.ui.addMessage(message, CONFIG.MESSAGE_TYPE.USER);
            
            // Add message to history
            this.messageHistory.push({
                type: CONFIG.MESSAGE_TYPE.USER,
                content: message,
                timestamp: new Date()
            });

            // Show typing indicator
            const typingIndicator = this.ui.addTypingIndicator();

            // Get selected CDP
            const selectedCDP = this.ui.getSelectedCDP();

            let response;
            if (selectedCDP !== 'all') {
                // If a specific CDP is selected, try to get information from its documentation
                try {
                    response = await this.api.scrapeCDPDocs(selectedCDP, message);
                } catch (error) {
                    console.error('Error scraping CDP docs:', error);
                    // Fallback to general chat if scraping fails
                    response = await this.api.sendMessage(message, selectedCDP);
                }
            } else {
                // For general queries, use the chat endpoint
                response = await this.api.sendMessage(message, selectedCDP);
            }

            // Remove typing indicator
            this.ui.removeTypingIndicator(typingIndicator);

            // Add bot response to UI
            this.ui.addMessage(response.message, CONFIG.MESSAGE_TYPE.BOT);
            
            // Add response to history
            this.messageHistory.push({
                type: CONFIG.MESSAGE_TYPE.BOT,
                content: response.message,
                timestamp: new Date()
            });

        } catch (error) {
            console.error('Error handling message:', error);
            this.ui.addMessage(
                'Sorry, I encountered an error processing your request. Please try again.',
                CONFIG.MESSAGE_TYPE.ERROR
            );
        } finally {
            // Re-enable input
            this.ui.enableInput();
        }
    }
}

// Initialize the chat application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new ChatApp();
}); 