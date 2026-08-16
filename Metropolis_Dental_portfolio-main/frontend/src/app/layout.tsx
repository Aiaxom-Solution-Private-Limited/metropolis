import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metropolis Dental Clinic & Implant Centre | Dr. Pratim Talukdar",
  description: "World-class dental implantology, prosthodontics, and smile rehabilitation engineered with precision and luxury in Guwahati.",
  keywords: ["Dental Implants", "Dr. Pratim Talukdar", "Metropolis Dental", "Guwahati Dental Clinic", "Prosthodontics", "Luxury Dental Care"],
  openGraph: {
    title: "Metropolis Dental Clinic & Implant Centre",
    description: "Advanced Implantology. Beautifully Engineered.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-clinical-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
