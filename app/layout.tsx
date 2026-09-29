import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PathPilot AI | Career Path Simulator: From Class 10 to Career",
  description:
    "AI-Powered Education & Career Decision-Support Platform simulating multi-step pathways, institution comparisons, decision trade-offs, and what-if scenarios for students after Class 10.",
  keywords: [
    "PathPilot AI",
    "Career Path Simulator",
    "Class 10 Career Guidance",
    "Decision Matrix",
    "Education Loan Calculator",
    "Career Pathways",
    "College Trade-offs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
