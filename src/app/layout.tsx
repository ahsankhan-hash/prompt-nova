import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PromptNova AI - Discover Viral AI Prompts & Free Creator Tools",
    template: "%s | PromptNova AI",
  },
  description:
    "Unlock the power of AI with curated prompts, free tools, and creator utilities. Browse 10K+ AI prompts, 50+ free tools for YouTube, SEO, marketing, and more.",
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "Midjourney prompts",
    "AI tools",
    "free AI tools",
    "YouTube title generator",
    "AI bio generator",
    "prompt library",
    "AI SEO tools",
    "content creation",
    "AI writing",
    "PromptNova",
    "creator tools",
  ],
  authors: [{ name: "PromptNova AI" }],
  creator: "PromptNova AI",
  publisher: "PromptNova AI",
  metadataBase: new URL("https://promptnova.ai"),
  alternates: { canonical: "/" },
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptnova.ai",
    siteName: "PromptNova AI",
    title: "PromptNova AI - Discover Viral AI Prompts & Free Creator Tools",
    description:
      "Unlock the power of AI with curated prompts, free tools, and creator utilities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptNova AI - Discover Viral AI Prompts & Free Creator Tools",
    description:
      "Unlock the power of AI with curated prompts, free tools, and creator utilities.",
    creator: "@promptnova",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
