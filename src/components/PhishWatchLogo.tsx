import { ShieldAlert } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cn } from "@/lib/utils"; 

interface PhishWatchLogoProps extends LucideProps {
  
}

export function PhishWatchLogo({ className, ...props }: PhishWatchLogoProps) {
  return <ShieldAlert className={cn("text-primary", className)} aria-label="PhishWatch Logo" {...props} />;
}
