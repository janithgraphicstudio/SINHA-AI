// Store conversation history
let conversationHistory = [];
let currentLanguage = "tamil";
const apiKey = "AIzaSyBjv-eGcDOS1D2-Ly556tbQx_oFAiBuz2k"; // Your API key

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');
const loader = document.getElementById('loader');
const languageButtons = document.querySelectorAll('.language-btn');

// Language selection
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        languageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentLanguage = button.dataset.language;
        addBotMessage(`Switched to ${button.textContent} mode. How can I assist you?`);
    });
});

// Send message on button click or Enter key
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send message to API
async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addUserMessage(message);
    userInput.value = '';
    
    // Show loader
    loader.style.display = 'block';
    
    try {
        // Prepare conversation context
        const context = getContextForLanguage(currentLanguage);
        const prompt = `${context} Question: ${message}`;
        
        // Call Gemini API
        const response = await fetchGeminiResponse(prompt);
        addBotMessage(response);
        
        // Store in conversation history
        conversationHistory.push({ role: 'user', content: message });
        conversationHistory.push({ role: 'assistant', content: response });
        
        // Keep history manageable (last 10 exchanges)
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
    } catch (error) {
        console.error("Error:", error);
        addBotMessage("Sorry, I encountered an error. Please try again later.");
    } finally {
        loader.style.display = 'none';
    }
}

// Function to get context based on selected language
function getContextForLanguage(language) {
    const contexts = {
        sinhala: "ඔබ සිංහල භාෂාවෙන් ප්‍රශ්න වලට පිළිතුරු සපයන AI සහායකයෙකි. පැහැදිලි හා නිවැරදි පිළිතුරු සපයන්න.",
        english: "You are an AI assistant responding in English. Provide clear and accurate answers.",
        tamil: "நீங்கள் தமிழ் மொழியில் பதிலளிக்கும் AI உதவியாளர். தெளிவான மற்றும் சரியான பதில்களை வழங்கவும்."
    };
    
    return contexts[language] || contexts.english;
}

// Function to call Gemini API
async function fetchGeminiResponse(prompt) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    });
    
    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    return data.candidates[0].content.parts[0].text;
}

// Function to add user message to chat
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Function to add bot message to chat
function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    
    // Process message for markdown-like formatting
    message = processMessage(message);
    messageElement.innerHTML = message;
    
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Function to process message for basic formatting
function processMessage(text) {
    // Handle code blocks
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italics
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Function to scroll chat to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}