import React from 'react';

const About = () => {
  return (
    <section className="bg-transparent px-8 pb-8 pt-6">
      <div className="space-y-8">
        <div className="flex flex-col gap-2 group">
          <span className="text-[10px] font-mono font-bold text-cyan-500/70 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-sm shadow-[0_0_5px_#06b6d4]"></span>
            Current Focus
          </span>
          <span className="text-white font-medium text-lg tracking-tight group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Vibecoding</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold text-blue-500/70 uppercase tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-blue-500 rounded-sm shadow-[0_0_5px_#3b82f6]"></span>
             Interests
          </span>
          <div className="flex gap-2 flex-wrap">
            {['Web3', 'AI', 'Web4'].map((item) => (
              <span key={item} className="px-3 py-1.5 bg-slate-800/50 text-slate-300 text-xs font-mono rounded border border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all cursor-default backdrop-blur-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono font-bold text-purple-500/70 uppercase tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-purple-500 rounded-sm shadow-[0_0_5px_#a855f7]"></span>
             Traits
          </span>
          <span className="text-slate-400 text-sm leading-relaxed bg-slate-900/40 p-4 rounded-lg border border-slate-800 italic relative overflow-hidden group">
            <span className="relative z-10 group-hover:text-purple-300 transition-colors">"喜欢探索折腾新鲜事物"</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold text-green-500/70 uppercase tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-sm shadow-[0_0_5px_#22c55e]"></span>
             Connect
          </span>
          <div className="grid grid-cols-4 gap-2">
            {/* Social Links */}
            <a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-white/20 hover:text-white text-slate-400 transition-all group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            
            <a href="https://github.com/your_handle" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-white/20 hover:text-white text-slate-400 transition-all group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>

            <a href="mailto:your.email@example.com" className="flex items-center justify-center p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700 hover:border-white/20 hover:text-white text-slate-400 transition-all group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </a>

            {/* Chat Trigger - Mobile Focused */}
            <button 
              onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300 text-cyan-500/70 transition-all group relative overflow-hidden shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
