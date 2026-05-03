import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "AI-powered design workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        theme: dark,
        variables: {
          colorBackground: "var(--bg-base)",
          colorForeground: "var(--text-primary)",
          colorPrimary: "var(--accent-primary)",
          colorMutedForeground: "var(--text-secondary)",
          colorInput: "var(--bg-surface)",
          colorInputForeground: "var(--text-primary)",
          colorNeutral: "var(--text-muted)",
          colorDanger: "var(--state-error)",
          colorSuccess: "var(--state-success)",
          colorWarning: "var(--state-warning)",
          borderRadius: "var(--radius)",
          fontFamily: "var(--font-sans)",
        },
      }}
    >
      <html
        lang="en"
        className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`} 
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
