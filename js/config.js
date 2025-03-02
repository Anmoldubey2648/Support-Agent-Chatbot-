const CONFIG = {
    // Documentation URLs
    CDP_DOCS: {
        segment: 'https://segment.com/docs/',
        mparticle: 'https://docs.mparticle.com/',
        lytics: 'https://docs.lytics.com/',
        zeotap: 'https://docs.zeotap.com/'
    },
    
    // API Endpoints
    API: {
        BASE_URL: 'http://localhost:3000',
        ENDPOINTS: {
            chat: '/api/chat',
            scrape: '/api/scrape'
        }
    },
    
    // Message Types
    MESSAGE_TYPE: {
        USER: 'user',
        BOT: 'bot',
        ERROR: 'error'
    },
    
    // UI Constants
    UI: {
        MAX_MESSAGE_LENGTH: 8192,
        TYPING_ANIMATION_DURATION: 1500,
        AUTO_SCROLL_OFFSET: 100
    }
}; 