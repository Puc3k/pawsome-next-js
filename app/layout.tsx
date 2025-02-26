import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pawsome",
    description: "Quiz app for pawsome puppies",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
        <Navbar userRole="guest" avatar=""/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
