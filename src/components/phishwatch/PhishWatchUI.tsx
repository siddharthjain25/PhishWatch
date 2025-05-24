"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { analyzeUrl, type AnalyzeUrlOutput } from "@/ai/flows/analyze-url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const UrlSchema = z.object({
  url: z.string().min(1, { message: "URL cannot be empty." }).url({ message: "Please enter a valid URL (e.g., https://example.com)." }),
});

type UrlFormData = z.infer<typeof UrlSchema>;

export function PhishWatchUI() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<AnalyzeUrlOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<UrlFormData>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: UrlFormData) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);
    try {
      const result = await analyzeUrl({ url: data.url });
      setAnalysisResult(result);
    } catch (e) {
      console.error("Analysis error:", e);
      setError("Failed to analyze URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskBadgeVariant = (riskLevel: string | undefined) => {
    switch (riskLevel?.toLowerCase()) {
      case "low":
        return "default"; // Uses primary color (blue)
      case "medium":
        return "outline"; 
      case "high":
        return "destructive";
      default:
        return "secondary";
    }
  };
  
  const getRiskBadgeClassName = (riskLevel: string | undefined) => {
    if (riskLevel?.toLowerCase() === "medium") {
        return "border-accent text-accent bg-accent/10";
    }
    return "";
  }

  const getRiskIcon = (riskLevel: string | undefined, isPhishing: boolean | undefined) => {
    if (isPhishing) {
        return <ShieldAlert className="h-5 w-5 text-destructive" />;
    }
    switch (riskLevel?.toLowerCase()) {
      case "low":
        return <ShieldCheck className="h-5 w-5 text-primary" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-accent" />;
      case "high": // Should be covered by isPhishing, but as a fallback
        return <ShieldAlert className="h-5 w-5 text-destructive" />;
      default:
        return <ShieldCheck className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Analyze Website URL</CardTitle>
        <CardDescription>Enter a URL to check for potential phishing risks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url-input">Website URL</FormLabel>
                  <FormControl>
                    <Input id="url-input" placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Check URL"
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && (
          <div className="mt-6 space-y-4">
            <Alert variant={analysisResult.isPhishing ? "destructive" : "default"} className={cn(analysisResult.isPhishing && "border-destructive/50 shadow-md")}>
              {analysisResult.isPhishing ? <ShieldAlert className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
              <AlertTitle className="font-semibold text-lg">
                {analysisResult.isPhishing ? "Phishing Alert!" : "Site Analysis Complete"}
              </AlertTitle>
              <AlertDescription className="mt-1">
                {analysisResult.reason}
              </AlertDescription>
            </Alert>
            
            <Card className="bg-card/50">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {getRiskIcon(analysisResult.riskLevel, analysisResult.isPhishing)}
                            <span className="text-sm font-medium text-foreground">Overall Risk Level:</span>
                        </div>
                        <Badge 
                            variant={getRiskBadgeVariant(analysisResult.riskLevel)}
                            className={cn("text-sm px-3 py-1", getRiskBadgeClassName(analysisResult.riskLevel))}
                        >
                            {analysisResult.riskLevel.charAt(0).toUpperCase() + analysisResult.riskLevel.slice(1)}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
