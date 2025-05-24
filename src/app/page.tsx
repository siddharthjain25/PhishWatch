import { PhishWatchUI } from "@/components/phishwatch/PhishWatchUI";
import { PhishWatchLogo } from "@/components/PhishWatchLogo";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="flex flex-col items-center mb-8 text-center">
        <PhishWatchLogo size={64} className="mb-3 drop-shadow-md" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground drop-shadow-sm">
          PhishWatch
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-md">
          Your vigilant guard against phishing websites. Analyze URLs with AI-powered insights.
        </p>
      </div>
      <PhishWatchUI />
       <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PhishWatch. Stay safe online.</p>
      </footer>
    </main>
  );
}
