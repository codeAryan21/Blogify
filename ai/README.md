# AI Backend (Gemini API)

This folder contains the Express.js backend for AI-powered features in your blog project. It uses Google Gemini 2.5 Flash via the `@google/generative-ai` SDK.

## Features
- **/api/chat**: Conversational AI endpoint for chatbot functionality.
- Easily extendable for title suggestion, text completion, and more.

## Folder Structure
```
ai/
├── index.js        # Main Express server and AI endpoints
├── package.json    # Node.js dependencies and scripts
├── .env.sample            # Environment variables (not committed)
└── README.md       # This documentation file
```

## Setup
1. **Install dependencies:**
   ```bash
   npm install express cors dotenv @google/generative-ai
   ```
2. **Environment variables:**
   - Create a `.env` file in this folder with:
     ```env
     GEMINI_API_KEY=your-google-gemini-api-key
     ```
3. **Run the server:**
   ```bash
   node index.js
   ```
   The server will start on port 5001 by default.

## Endpoints
### POST `/api/chat`
- **Request body:**
  ```json
  { "messages": [ { "role": "user", "content": "Hello!" } ] }
  ```
- **Response:**
  ```json
  { "reply": "Hi! How can I help you?" }
  ```

## How it works
- Receives chat messages from the frontend.
- Sends them to Gemini 2.5 Flash for a response.
- Returns the AI's reply to the frontend.

## Extending
You can add more endpoints (e.g., `/api/suggest-title`, `/api/complete-text`) using the same pattern as `/api/chat`.

---

**This backend is designed to be used with the React frontend in this project.**