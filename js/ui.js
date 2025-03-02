class ChatUI {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.cdpSelect = document.getElementById('cdpSelect');
        this.themeSelect = document.getElementById('themeSelect');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.datetime = document.getElementById('datetime');
        this.suggestionButtons = document.querySelectorAll('.suggestion-btn');
        
        this.setupEventListeners();
        this.adjustTextareaHeight();
        this.initializeTheme();
        this.startClock();
    }

    setupEventListeners() {
        // Handle send button click
        this.sendButton.addEventListener('click', () => this.handleSend());

        // Handle enter key press
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Handle textarea auto-resize
        this.userInput.addEventListener('input', () => this.adjustTextareaHeight());

        // Handle theme changes
        this.themeSelect.addEventListener('change', (e) => this.handleThemeChange(e.target.value));

        // Handle dark mode toggle
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());

        // Add suggestion button listeners
        this.suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.textContent.replace('NEW', '').trim();
                this.userInput.value = question;
                this.handleSend();
            });
        });

        // Load saved preferences
        this.loadPreferences();
    }

    initializeTheme() {
        // Set midnight theme by default
        this.themeSelect.value = 'midnight';
        
        // Set initial theme attributes
        document.documentElement.setAttribute('data-theme', 'midnight');
        localStorage.setItem('theme', 'midnight');
        
        // Update mode text
        const modeText = document.querySelector('.mode-text');
        modeText.textContent = 'Switch to Light Mode';
    }

    handleThemeChange(theme) {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleDarkMode() {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');
        const modeText = document.querySelector('.mode-text');
        
        if (currentTheme === 'midnight') {
            root.setAttribute('data-theme', 'light');
            modeText.textContent = 'Switch to Dark Mode';
        } else {
            root.setAttribute('data-theme', 'midnight');
            modeText.textContent = 'Switch to Light Mode';
        }
    }

    loadPreferences() {
        const savedTheme = localStorage.getItem('theme') || 'midnight';
        this.themeSelect.value = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const modeText = document.querySelector('.mode-text');
        modeText.textContent = savedTheme === 'midnight' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const timeElement = this.datetime.querySelector('.time');
            const dateElement = this.datetime.querySelector('.date');
            
            timeElement.textContent = now.toLocaleTimeString();
            dateElement.textContent = now.toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    formatMessage(text) {
        // Convert URLs to clickable links
        text = text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Convert newlines to <br> tags
        text = text.replace(/\n/g, '<br>');

        return text;
    }

    addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Add message header with timestamp
        const headerDiv = document.createElement('div');
        headerDiv.className = 'message-header';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'bot-name';
        nameSpan.textContent = type === 'bot' ? 'CDP Assistant' : 'You';
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = new Date().toLocaleTimeString();
        
        headerDiv.appendChild(nameSpan);
        headerDiv.appendChild(timeSpan);
        
        contentDiv.appendChild(headerDiv);

        // Add typing effect for bot messages
        if (type === 'bot') {
            this.addTypingEffect(contentDiv, message);
        } else {
            contentDiv.innerHTML += this.formatMessage(message);
        }

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addTypingEffect(element, text) {
        let index = 0;
        element.innerHTML += '<span class="typing-text"></span>';
        const typingElement = element.querySelector('.typing-text');
        
        const type = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, Math.random() * 30 + 20); // Random delay between characters
            }
        };
        
        type();
    }

    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.innerHTML = `
            <div class="message-content loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }

    removeTypingIndicator(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    clearInput() {
        this.userInput.value = '';
        this.adjustTextareaHeight();
    }

    getSelectedCDP() {
        return this.cdpSelect.value;
    }

    getUserInput() {
        return this.userInput.value.trim();
    }

    disableInput() {
        this.userInput.disabled = true;
        this.sendButton.disabled = true;
    }

    enableInput() {
        this.userInput.disabled = false;
        this.sendButton.disabled = false;
        this.userInput.focus();
    }

    handleSend() {
        const message = this.getUserInput();
        if (message) {
            if (this.onSend) {
                this.onSend(message);
            }
            this.clearInput();
        }
    }

    setOnSendCallback(callback) {
        this.onSend = callback;
    }

    adjustTextareaHeight() {
        const textarea = this.userInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
} 