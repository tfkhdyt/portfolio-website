import JsonViewer from "@/components/json-viewer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-[#13111C] overflow-hidden">
      {/* Background glows */}
      <div className="fixed -top-48 -left-48 w-[450px] h-[450px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow" />
      <div className="fixed -bottom-48 -right-48 w-[450px] h-[450px] rounded-full bg-fuchsia-600/25 blur-3xl animate-pulse-slow" />
      {/* Content */}
      <JsonViewer />
    </main>
  );
}
