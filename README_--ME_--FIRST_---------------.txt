# CDP AI Assistant Chatbot

A modern, AI-powered chatbot designed to assist users with Customer Data Platform (CDP) related queries, focusing on Segment, mParticle, Lytics, and Zeotap.

## 📦 Installation

1. Clone the repository:
 
(AFTER CLONING JUST DOUBLE TAP ON "start_chatbot" NOTHING ELSE IT WILL AUTOSTART IF ANYTHING MISSING IT WILL ASK YOU TO DOWNLOAD ) 

ALSO MAKE SURE Node.js PROPERLY INSTALLED  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

AND REMEMBER FIRST RUN CAN TAKE A BIT TIME TO LOAD IF SHOW ERRORS , REFRESH THE TAB UPTO 10 TIMES


IF IN CASE THIS NOT WORK THEN, FOLLOW STEPS BELOW ,,,,,,

2. Install dependencies:
```bash
npm install
```
4. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```





## 🚀 Technology Stack

### Frontend
- **HTML5/CSS3/JavaScript (ES6+)** - For building a responsive and modern UI
- **Inter Font Family** - For consistent and clean typography
- **CSS Custom Properties** - For dynamic theming and maintainable styles
- **CSS Grid/Flexbox** - For responsive layouts
- **CSS Animations** - For smooth transitions and better UX

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Google Gemini API** - For AI-powered responses
- **MongoDB** - For storing conversation history and user preferences
- **Redis** - For caching frequent queries and session management

### Security
- **Helmet.js** - For securing HTTP headers
- **CORS** - For cross-origin resource sharing protection
- **Rate Limiting** - To prevent abuse
- **Input Sanitization** - To prevent XSS attacks
- **JWT** - For secure authentication

## 🛠️ Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6.0 or higher)
- Google Cloud Account (for Gemini API)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cdp-ai-assistant.git
cd cdp-ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🌟 Features

### Core Features
- Real-time chat interface
- Multiple theme support (6 themes + Dark/Light mode)
- Intelligent CDP query handling
- Suggestion buttons for common queries
- Responsive design for all devices
- Real-time typing indicators
- Message history persistence

### Security Features
- API rate limiting
- Input validation and sanitization
- Secure session management
- HTTP security headers
- XSS protection
- CSRF protection

### Performance Optimizations
- Redis caching for frequent queries
- Lazy loading of resources
- Minified assets in production
- Gzip compression
- Browser caching
- Optimized database queries
- Connection pooling

## 🎨 Theme Customization

The application supports 6 different themes:
- Default
- Violet
- Ocean
- Forest
- Sunset
- Midnight

Plus a global Dark/Light mode toggle.

## 💾 Database Schema

### Conversations Collection
```javascript
{
  userId: ObjectId,
  messages: [{
    role: String,
    content: String,
    timestamp: Date,
    cdpContext: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### User Preferences Collection
```javascript
{
  userId: ObjectId,
  theme: String,
  preferredCDP: String,
  settings: {
    notifications: Boolean,
    darkMode: Boolean
  }
}
```

## 🔒 Security Measures

1. **API Security**
   - Rate limiting: 100 requests per IP per 15 minutes
   - Request size limiting: Max 10KB for POST requests
   - Input validation using Joi
   - API key authentication for external services

2. **Data Security**
   - Encrypted data transmission (HTTPS)
   - Sensitive data encryption at rest
   - Regular security audits
   - Secure session management

3. **Infrastructure Security**
   - Regular dependency updates
   - Security headers configuration
   - CORS policy implementation
   - Error handling without information disclosure

## ⚡ Performance Optimizations

1. **Frontend**
   - Minified and compressed assets
   - Lazy loading of images
   - Efficient DOM manipulation
   - Debounced user inputs
   - Optimized animations

2. **Backend**
   - Response caching
   - Database query optimization
   - Connection pooling
   - Efficient error handling
   - Load balancing ready

3. **Database**
   - Indexed collections
   - Optimized queries
   - Efficient data structure
   - Regular maintenance

## 📈 Monitoring and Logging

- Error tracking using Winston
- Performance monitoring using New Relic
- API metrics collection
- User behavior analytics
- System health monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- **Anmol Dubey** - *Initial work*

## 🙏 Acknowledgments

- Google Gemini API team for the powerful AI capabilities
- The open-source community for various tools and libraries
- CDP documentation teams for comprehensive resources 