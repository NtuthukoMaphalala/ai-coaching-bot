// Cooking knowledge database
const cookingKnowledge = {
    recipes: {
        "scrambled eggs": {
            ingredients: ["2-3 eggs", "2 tbsp butter", "Salt to taste", "Pepper to taste"],
            steps: [
                "Crack eggs into a bowl",
                "Add salt and pepper",
                "Whisk eggs until well combined",
                "Heat butter in a non-stick pan over medium-low heat",
                "Pour in eggs and gently stir as they cook",
                "Remove from heat while still slightly wet",
                "Serve immediately"
            ],
            difficulty: "Beginner",
            time: "5 minutes"
        },
        "pasta": {
            ingredients: ["200g pasta", "Salt", "Olive oil", "Garlic", "Parmesan cheese"],
            steps: [
                "Boil water in a large pot with salt",
                "Add pasta and cook according to package directions",
                "While pasta cooks, heat olive oil in a pan",
                "Add minced garlic and cook for 1 minute",
                "Drain pasta, reserving some pasta water",
                "Toss pasta with garlic oil",
                "Add pasta water if needed",
                "Top with Parmesan cheese"
            ],
            difficulty: "Beginner",
            time: "15 minutes"
        }
    },
    
    techniques: {
        "chopping": "Keep fingers curved and knuckles forward. Use a rocking motion with the knife.",
        "seasoning": "Taste as you go. Salt enhances flavors, add it gradually.",
        "heat control": "Medium heat works for most cooking. High heat for searing, low heat for simmering."
    },
    
    tips: [
        "Always read the entire recipe before starting",
        "Prep all ingredients before you start cooking",
        "Taste your food as you cook",
        "Clean as you go to keep workspace organized",
        "Don't be afraid to make mistakes - they're learning opportunities!"
    ]
};

// AI coaching questions based on user level
const coachingQuestions = {
    beginner: [
        "What's your main goal with cooking? (save money, eat healthier, impress someone?)",
        "How comfortable are you with basic knife skills?",
        "What kitchen equipment do you currently have?",
        "Are there any cuisines you're particularly interested in?",
        "Do you prefer quick meals or are you okay with longer cooking times?"
    ],
    
    intermediate: [
        "What cooking techniques would you like to master?",
        "Are you interested in learning about flavor pairing?",
        "Would you like to explore more complex recipes?",
        "Are you comfortable with multitasking while cooking?",
        "What's the most challenging dish you've attempted?"
    ]
};

// Current conversation state
let conversationState = {
    userLevel: null,
    currentTopic: null,
    askedQuestions: [],
    userResponses: []
};

// Main function to send messages
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    
    // Process message and get AI response
    setTimeout(() => {
        const response = processUserMessage(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add message to chat display
function addMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Process user message and generate appropriate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check if user is asking about a specific recipe
    for (const recipe in cookingKnowledge.recipes) {
        if (lowerMessage.includes(recipe)) {
            return generateRecipeResponse(recipe);
        }
    }
    
    // Check for technique questions
    for (const technique in cookingKnowledge.techniques) {
        if (lowerMessage.includes(technique)) {
            return `Great question about ${technique}! ${cookingKnowledge.techniques[technique]}`;
        }
    }
    
    // Check for beginner indicators
    if (lowerMessage.includes('beginner') || lowerMessage.includes('new') || lowerMessage.includes('start')) {
        conversationState.userLevel = 'beginner';
        return generateBeginnerResponse();
    }
    
    // Check for general cooking questions
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
        const randomTip = cookingKnowledge.tips[Math.floor(Math.random() * cookingKnowledge.tips.length)];
        return `Here's a great cooking tip: ${randomTip}`;
    }
    
    // Default coaching response
    return generateCoachingResponse(message);
}

// Generate recipe response
function generateRecipeResponse(recipe) {
    const recipeData = cookingKnowledge.recipes[recipe];
    return `
        <strong>${recipe.charAt(0).toUpperCase() + recipe.slice(1)}</strong><br>
        <strong>Difficulty:</strong> ${recipeData.difficulty}<br>
        <strong>Time:</strong> ${recipeData.time}<br><br>
        <strong>Ingredients:</strong><br>
        ${recipeData.ingredients.map(ing => `• ${ing}`).join('<br>')}<br><br>
        <strong>Steps:</strong><br>
        ${recipeData.steps.map((step, index) => `${index + 1}. ${step}`).join('<br>')}
    `;
}

// Generate beginner-friendly response
function generateBeginnerResponse() {
    return `Welcome to cooking! I'm excited to help you start your culinary journey. 
            Let's begin with some basics. I'd recommend starting with simple recipes like scrambled eggs or pasta. 
            What would you like to learn first? You can ask me about:
            <br>• Specific recipes (try "scrambled eggs" or "pasta")
            <br>• Cooking techniques (like "chopping" or "seasoning")  
            <br>• General cooking tips
            <br>• Kitchen equipment advice`;
}

// Generate coaching response based on context
function generateCoachingResponse(message) {
    const responses = [
        "That's a great question! Let me help you with that. Can you tell me more about your current cooking experience?",
        "I love your enthusiasm for cooking! Based on what you're asking, I think we should focus on building your foundational skills first.",
        "Cooking is all about practice and patience. What specific area would you like to improve?",
        "Every great cook started somewhere! Let's break this down into manageable steps.",
        "That's exactly the kind of curiosity that makes a great cook! Let me guide you through this."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
}

// Allow pressing Enter to send message
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
