🚀 Blogify — AI-Powered Modern Blogging Platform

Blogify is a next-generation blogging platform powered by REACT, VITE, and APPWRITE. It empowers users to write, manage, and explore blog content efficiently with integrated AI features and a beautiful UI.

✨ Features

- 🔐 User Authentication:- (Sign Up, Login, Logout, Password Reset)
- 📝 Blog Management:- (Create, Edit, Delete posts)
- 🖋️ Rich Text Editor:- for seamless writing
- 🖼️ Image Upload Support:- for featured visuals
- 💬 Built-in Chatbot:- for user interaction
- 🤖 AI Utilities:- for smart suggestions (see `ai/` folder)
- 📱 Responsive Design:- (Mobile, Tablet, Desktop)
- 🟢 Post Status Management:- (Active/Inactive)
- 🗄️ Appwrite Backend:- for Auth, Database, and Storage
  

🛠️ Tech Stack

🔹 Frontend
- React + Vite
- Tailwind CSS
- React Hook Form
- Redux Toolkit
- React Router

🔹 Backend
- Appwrite (Authentication, Database, Storage)
- Express.js (for AI utilities)

🔹 AI
- Custom Gemini-powered AI API (in `ai/` folder)


📁 Folder Structure
```bash
BLOGIFY/
│
├── ai/                         # Standalone AI backend (Express.js, Gemini API)
│   ├── index.js                # Main Express server and AI endpoints
│   ├── package.json            # Node.js dependencies and scripts
│   ├── .env.sample             # Environment variables (not committed)
│   └── README.md               # AI backend documentation
│
├── public/                     # Static assets (favicon, images, etc.)
│
├── src/                        # React frontend source code
│   ├── appwrite/               # Appwrite configuration and service files
│   ├── components/             # Reusable UI components (Login, Signup, PostForm, Chatbot, etc.)
│   ├── config/                 # Appwrite and app config files
│   ├── pages/                  # Page components (Home, AddPost, EditPost, AllPosts, etc.)
│   ├── store/                  # Redux store and slices
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles (Tailwind CSS)
│
├── .gitignore                  # Git ignore file
├── package.json                # Project metadata and dependencies (frontend)
├── README.md                   # Project documentation
└── vite.config.js              # Vite configuration
```


🚀 Getting Started

⚙️ Prerequisites

- Node.js v16+
- Appwrite instance (cloud or self-hosted)

📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codeAryan21/Blogify.git
   cd Blogify

2. Install dependencies (for frontend):
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev

6. Open in browser: http://localhost:5173


⚙️ Appwrite Configuration

1. Create a project in your Appwrite Console.
2. Enable Authentication (Email/Password provider).
3. Create a Database and a Collection for blog posts.
4. Enable Storage for image uploads.
5. Update Appwrite config:
   
   Edit src/config/config.js with your values:
   ```js
    export default {
      appwriteURL: "https://cloud.appwrite.io/v1",         // Your Appwrite endpoint
      appwriteProjectID: "your_project_id",
      appwriteDatabaseID: "your_database_id",
      appwriteCollectionID: "your_collection_id",
      appwriteBucketID: "your_bucket_id",                  // For image uploads
    };
   ```


🧠 AI Server Setup (ai/)

1. Navigate to the ai/ folder:
   ```bash
   cd ai

3. Install dependencies:
   ```bash
   npm install

5. Set up environment variables:
    Copy .env.sample to .env and fill in your Gemini API key or other config:
    ```bash
    cp .env.sample .env
    ```
    Example .env:
    GEMINI_API_KEY=your-google-gemini-api-key

7. Run the AI server:
   ```bash
   node index.js
   ```

   The server will start on port 5001 by default.

🔐 Environment Variables

1. Frontend (config.js):
```js
    export default {
        appwriteURL: "https://cloud.appwrite.io/v1",
        appwriteProjectID: "your_project_id",
        appwriteDatabaseID: "your_database_id",
        appwriteCollectionID: "your_collection_id",
        appwriteBucketID: "your_bucket_id",
    };
```

2. AI Backend (.env):
   ```js
    GEMINI_API_KEY=your-google-gemini-api-key


📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute it with proper attribution.

❤️ Credits

Built with React, Vite, Appwrite, and AI — Aryan Singh