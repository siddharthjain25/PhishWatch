import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhishWatchLogo } from '@/components/PhishWatchLogo';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex flex-col items-center">
        <PhishWatchLogo size={48} className="mb-6 text-destructive" />
        <h1 className="text-6xl font-bold text-destructive mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Oops! The page you were looking for doesn&apos;t seem to exist. It might have been moved or deleted.
        </p>
        <Button asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
      <footer className="absolute bottom-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PhishWatch. Stay safe online.</p>
      </footer>
    </main>
  );
}
