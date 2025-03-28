import JsonViewer from "@/json-viewer"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-gray-950 overflow-hidden">
      {/* Background glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-3xl animate-pulse-slow" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-3xl animate-pulse-slow" />
      <div className="fixed top-0 right-0 w-[300px] h-[300px] rounded-full bg-indigo-600/20 blur-3xl animate-pulse-slow opacity-70" />
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-violet-600/20 blur-3xl animate-pulse-slow opacity-70" />

      {/* Content */}
      <JsonViewer />
    </main>
  )
}

