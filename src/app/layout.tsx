import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'PhishWatch - Phishing Detector',
  description: 'Alerts users about potentially malicious websites using AI URL analysis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      {/* Ensure no leading whitespace or comments directly here before body */}
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
