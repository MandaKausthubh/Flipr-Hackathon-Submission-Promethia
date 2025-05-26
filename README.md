**Smart Escalation Customer Support Chatbot**

*A GenAI-powered customer support system that automatically escalates to a human agent based on sentiment analysis.*

---

## 🚀 Project Overview

A next-generation customer support chatbot built for Flipr Hackathon by **Team Promethia**. The system leverages LangChain for conversational AI, Hugging Face for sentiment analysis, and seamlessly escalates to a live agent when customer satisfaction drops.

## 🔑 Key Features

* **Conversational AI**: Initial user queries handled by a LangChain-based chatbot.
* **Real-time Sentiment Analysis**: Monitors user messages using Hugging Face’s `pipeline` to detect dissatisfaction.
* **Automated Escalation**: Upon negative sentiment detection, the chat transitions to a human customer care agent.
* **Agent Assist**: The human agent has access to a context-aware chatbot interface to streamline responses.
* **Seamless Switching**: Both customer and agent chats run on the same platform for continuity.

## 🧰 Tech Stack

* **Backend**: FastAPI
* **Database**: MongoDB
* **AI/ML**:

  * LangChain (Conversational agent)
  * Hugging Face Transformers (`pipeline` for sentiment analysis)
* **Frontend**: React.js
* **Deployment**: Docker (optional), hosted on any cloud provider

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MandaKausthubh/Flipr-Hackathon-Submission-Promethia.git
   cd Flipr-Hackathon-Submission-Promethia
   ```

2. **Backend Setup**

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Configure Environment Variables**

   * Create a `.env` file in `backend/` with:

     ```ini
     MONGODB_URI=<your_mongodb_connection_string>
     HF_API_TOKEN=<your_huggingface_token>
     ```
   * (Optional) Adjust `REACT_APP_API_URL` in `frontend/.env`.

5. **Run Locally**

   * **Backend**

     ```bash
     cd backend
     uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
     ```
   * **Frontend**

     ```bash
     cd frontend
     npm start
     ```

Open your browser at `http://localhost:3000` to interact with the chatbot.

## 🗂️ Project Structure

```
team-promethia-chatbot/
├── backend/                # FastAPI app
│   ├── app/
│   ├── requirements.txt
│   └── .env
├── frontend/               # React.js app
│   ├── public/
│   ├── src/
│   └── .env
├── docs/                   # Documentation & guides
└── README.md               # Project overview (this file)
```

## 💡 Usage

1. Open the chat widget on the homepage.
2. Interact with the AI chatbot for queries.
3. If your sentiment turns negative (e.g., frustration), the system will notify you and connect you to a live agent.
4. The live agent can consult the AI-assistant within their dashboard for suggested replies.

## ⚙️ Configuration

* **MongoDB**: Store conversation logs and user metadata.
* **LangChain**: Configure prompt templates and memory strategies in `backend/app/agents.py`.
* **Sentiment Pipeline**: Adjust thresholds in `backend/app/sentiment.py`.

## 📈 Evaluation Metrics

* **Response Accuracy**: Percentage of queries resolved without escalation.
* **Escalation Recall**: Correct detection of dissatisfied users.
* **Average Handle Time**: Combined AI + human response time.

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

*Happy Chatting!*
