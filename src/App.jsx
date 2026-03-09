import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Chat from './components/Chat';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased relative overflow-hidden flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000 mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-screen"></div>
      </div>
      
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      <main className="relative z-10 w-full max-w-[95%] md:max-w-[1600px] mx-auto p-4 md:p-8 flex-1 flex flex-col md:flex-row gap-6 items-start justify-center min-h-screen h-auto overflow-visible">
        {/* Left Column: Personal Info (Dashboard Card) */}
        <div className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 flex flex-col gap-6 h-auto">
          <div className="tech-card rounded-xl overflow-hidden sticky top-8 group relative bg-slate-900/40 backdrop-blur-xl border border-white/10">
            {/* Tech Corners */}
            <div className="tech-border-corner tech-border-tl"></div>
            <div className="tech-border-corner tech-border-tr"></div>
            <div className="tech-border-corner tech-border-bl"></div>
            <div className="tech-border-corner tech-border-br"></div>
            
            <div className="absolute top-3 right-4 text-[10px] font-mono text-cyan-400/70 tracking-[0.2em] opacity-80 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-950/30">ID: QXY-001</div>
            
            <Header />
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mx-6 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
            <About />
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mx-6 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
            <Projects />
          </div>
        </div>

        {/* Right Column: Chat Area (Main Console) */}
        <div id="chat-section" className="w-full flex-1 h-[calc(100vh-60px)] md:h-[calc(100vh-100px)] min-h-[600px]">
          <Chat />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
