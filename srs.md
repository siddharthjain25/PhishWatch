### 📄 Software Requirements Specification (SRS)

## 🛡️ PhishWatch – AI-Powered Phishing Detector

### 1. Purpose
To detect phishing websites by analyzing URLs using Google Generative AI and returning contextual risk scores.

### 2. Scope
The app allows users to enter URLs, which are analyzed via an AI prompt. The result is a categorized risk score (Low/Medium/High) with a natural-language explanation.

### 3. Functional Requirements
- URL input form
- AI API request and response handling
- Risk classification display
- Error/fallback messaging

### 4. Non-Functional Requirements
- Max latency < 2.5s
- Mobile-first UI
- Secure prompt formatting
- No persistent user data

### 5. Tech Stack
- Frontend: Next.js, TypeScript, TailwindCSS
- Backend: Google Generative AI API (Gemini)
- Deployment: Vercel

### 6. Assumptions
- AI service is available with latency < 1.5s
- Stateless app, no login required

### 7. Future Enhancements
- Add login system and user history tracking
- Custom ML model trained on flagged URLs
- Reporting and feedback loop integration

### 8. Entity Relationship Diagram (ERD)
```
[URLReport]
 └── id (PK)
 └── url
 └── risk_level (Low/Medium/High)
 └── explanation
 └── created_at

(Optional if login added)
[User]
 └── id (PK)
 └── email

Relationship:
User 1 --- * URLReport
```

### 9. System Architecture Diagram (Description)
- **Frontend**: Next.js + TypeScript interface to input URLs.
- **Backend/API Layer**: Communicates with Google GenAI API to analyze URLs.
- **Output Rendering**: The frontend parses risk results and displays them with contextual formatting.
- **Deployment**: Hosted on Vercel with stateless architecture.

