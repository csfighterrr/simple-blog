import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simple Blog - Thoughtful Writing for Curious Minds",
    template: "%s | Simple Blog",
  },
  description: "A sophisticated platform for sharing insights, ideas, and stories. Discover thoughtful articles on technology, design, culture, and more.",
  keywords: ["blog", "articles", "writing", "technology", "design", "culture", "ideas"],
  authors: [{ name: "Simple Blog" }],
  creator: "Simple Blog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simpleblog.com",
    siteName: "Simple Blog",
    title: "Simple Blog - Thoughtful Writing for Curious Minds",
    description: "A sophisticated platform for sharing insights, ideas, and stories.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Blog - Thoughtful Writing for Curious Minds",
    description: "A sophisticated platform for sharing insights, ideas, and stories.",
    creator: "@simpleblog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-body antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
