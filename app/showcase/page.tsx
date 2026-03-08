"use client";

import React, { useState } from "react";

const templates = [
  { id: "bakery", name: "Bakery Theme", path: "/templates/bakery/index.html" },
  { id: "eyewear", name: "Eyewear Theme", path: "/templates/eyewear/index.html" },
  { id: "plumber", name: "Plumber Theme", path: "/templates/plumber/index.html" },
  { id: "elegant", name: "Elegant Theme", path: "/templates/elegant/index.html" },
  { id: "interactive", name: "Interactive Theme", path: "/templates/interactive/index.html" },
];

export default function ShowcasePage() {
  const [currentTemplate, setCurrentTemplate] = useState(templates[0].path);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 ease-in-out border-r border-neutral-800 bg-neutral-900 flex flex-col shrink-0`}
      >
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className={`font-bold text-xl tracking-tight ${!isSidebarOpen && "hidden"}`}>
            Themes<span className="text-blue-500">.</span>
          </h2>
        </div>

        <nav className={`flex-1 overflow-y-auto py-4 ${!isSidebarOpen && "hidden"}`}>
          <ul className="space-y-1 px-3">
            {templates.map((template) => (
              <li key={template.id}>
                <button
                  onClick={() => setCurrentTemplate(template.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${currentTemplate === template.path
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                    }`}
                >
                  {template.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`p-6 border-t border-neutral-800 ${!isSidebarOpen && "hidden"}`}>
          <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`} className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-2">
            &larr; Back to Main Site
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-white">
        {/* Top bar for toggling sidebar and actions */}
        <header className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="pointer-events-auto bg-neutral-900/80 backdrop-blur-md text-white p-3 rounded-full hover:bg-neutral-800 transition-colors shadow-lg border border-neutral-700/50"
            aria-label="Toggle Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Call to action button for purchasing */}
          <div className="pointer-events-auto flex items-center gap-3 bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-neutral-700/50">
            <span className="text-sm font-medium text-neutral-200 hidden sm:inline-block">Like what you see?</span>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-1.5 px-4 rounded-full transition-colors shadow-sm">
              Buy for 99€
            </button>
          </div>
        </header>

        {/* Iframe displaying the actual template */}
        <iframe
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${currentTemplate}`}
          className="flex-1 w-full h-full border-none bg-white"
          title="Theme Preview"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </main>
    </div>
  );
}
