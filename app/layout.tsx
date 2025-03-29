import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/jetbrains-mono";

export const metadata: Metadata = {
  title: "Taufik Hidayat - Full Stack Developer",
  description:
    "Software Developer with proven track record in crafting modern web solutions using TypeScript and Golang. At Netovas Eterna Teknologi, built high-impact applications including an optimized ticketing system with 20% improved performance and a comprehensive billing platform. Distinguished Informatics Engineering graduate with multiple academic awards and a portfolio of successful open-source projects ranging from developer tools to web applications. Seeking challenging opportunities to create innovative, scalable software solutions that deliver measurable business value.",
  keywords: [
    "Full Stack Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "React Developer",
    "Svelte Developer",
    "Golang Developer",
    "Web Application Developer",
    "Software Engineer",
    "JavaScript Developer",
    "Backend Developer",
    "Frontend Development",
    "Backend Development",
    "Full Stack Web Development",
    "Modern Web Development",
    "JavaScript Frameworks",
    "Web Application Architecture",
    "REST API Development",
    "GraphQL Developer",
    "Microservices Development",
    "Cross-Platform Development",
    "Agile Development",
    "Cloud-Native Applications",
    "Real-Time Applications",
    "Scalable Web Applications",
    "High-Performance Web Apps",
    "Full Stack Developer with TypeScript and Node.js",
    "React and Svelte Expert for Web Projects",
    "Golang Backend Developer for Scalable Applications",
    "Hire Full Stack Developer for TypeScript Projects",
    "Build Modern Web Apps with React and Node.js",
    "TypeScript and Golang Developer for Backend Systems",
    "Svelte Framework Developer for Lightweight Applications",
    "Experienced Developer in React, Node.js, and Golang",
    "Full Stack Developer Specializing in Microservices",
    "Web Developer Proficient in TypeScript and Svelte",
    "Custom Web Solutions with React and TypeScript",
    "Develop REST APIs with Node.js and Golang",
    "Real-Time Web Applications Using Node.js and Svelte",
    "Full Stack Developer for Enterprise-Level Applications",
    "Hire Developer for Scalable Backend Systems in Golang",
    "Full Stack Developer in Bandung, Indonesia",
    "TypeScript Developer in Bandung, Indonesia",
    "Node.js Developer Near Me",
    "React Developer Jobs in Bandung, Indonesia",
    "Golang Developer for Remote Work",
    "E-commerce Web Developer",
    "Fintech Full Stack Developer",
    "Healthcare Application Developer",
    "EdTech Web Application Developer",
    "SaaS Platform Developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
