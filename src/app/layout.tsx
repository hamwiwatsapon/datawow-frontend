import type { Metadata } from "next";
import { Castoro } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const castoro = Castoro({
  weight: "400",
  variable: "--font-castoro",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${castoro.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
