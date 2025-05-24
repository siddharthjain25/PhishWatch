
# PhishWatch - AI-Powered Phishing Detector

PhishWatch is a web application designed to help users identify potentially malicious websites by analyzing URLs using AI. Users can submit a URL, and the application will provide a risk assessment, indicating whether the site is likely a phishing attempt.

## Features

*   **AI-Powered URL Analysis:** Leverages Generative AI (via Google AI) to analyze URLs for phishing indicators.
*   **Risk Assessment:** Provides a clear risk level (Low, Medium, High) and a detailed explanation for the assessment.
*   **User-Friendly Interface:** Simple and intuitive UI built with Next.js, React, and ShadCN UI components.
*   **Responsive Design:** Adapts to various screen sizes for a good user experience on desktop and mobile.

## Tech Stack

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (React Framework)
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [ShadCN UI](https://ui.shadcn.com/) (Component Library)
    *   [Tailwind CSS](https://tailwindcss.com/) (CSS Framework)
    *   [Lucide React](https://lucide.dev/) (Icons)
*   **Backend (AI/Business Logic):**
    *   [Google AI / Gemini Models](https://ai.google.dev/) (for URL analysis)
*   **Development:**
    *   Node.js & npm
    *   Turbopack (for Next.js development)

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (LTS version recommended, which includes npm)

## Getting Started

Follow these steps to get your development environment set up and running.

### 1. Clone the Repository (Optional)

If you've downloaded the code as a ZIP, you can skip this step. Otherwise, clone the project:

```bash
git clone https://github.com/siddharthjain25/PhishWatch.git
cd <project-directory>
```

### 2. Install Dependencies

Navigate to the project's root directory and install the necessary npm packages:

```bash
npm install
```

### 3. Set Up Environment Variables

The application uses Google AI for its AI-powered features. You'll need a Google AI API key.

1.  **Create a local environment file:**
    Copy the `.env` file to a new file named `.env.local`:
    ```bash
    cp .env .env.local
    ```
    The `.env.local` file is ignored by Git and is the recommended place for your secret keys.

2.  **Set your Google AI API Key:**
    Open `.env.local` in a text editor and add your Google AI API key:
    ```env
    GOOGLE_API_KEY=YOUR_ACTUAL_GOOGLE_API_KEY_HERE
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey) or the Google Cloud Console. Ensure the API key has the necessary permissions to use the Gemini models.

### 4. Run the Development Servers

You'll need to run two separate development servers: one for the Next.js frontend and one for the Genkit AI flows.

*   **Next.js Development Server:**
    This command starts the Next.js application. By default (as configured in `package.json`), it runs on port 9002.
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the app.

## Building for Production

To create an optimized production build of the Next.js application, run:

```bash
npm run build
```
This will generate a `.next` folder containing the production-ready assets.

To run the production build locally (after building):
```bash
npm run start
```

## Folder Structure

Here's a brief overview of the key directories:

```
.
├── public/             # Static assets
├── src/
│   ├── ai/             # Genkit AI flows and configuration
│   │   ├── dev.ts      # Genkit development server entry point
│   │   ├── flows/      # AI flow definitions (e.g., analyze-url.ts)
│   │   └── genkit.ts   # Genkit global instance initialization
│   ├── app/            # Next.js App Router (pages, layouts, etc.)
│   ├── components/     # React components
│   │   ├── phishwatch/ # Components specific to PhishWatch features
│   │   └── ui/         # ShadCN UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions and libraries
├── .env                # Base environment variable template
├── .env.local          # Local environment variables (Gitignored)
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue. (Further details can be added here, like coding standards or a code of conduct).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (assuming MIT, you might want to add a LICENSE file).
