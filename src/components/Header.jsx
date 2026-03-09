import React from 'react';

const Header = () => {
  return (
    <header className="p-8 md:p-10 flex flex-col items-center text-center">
      <div className="relative mb-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-40 blur-md group-hover:opacity-60 transition duration-500 animate-pulse"></div>
        <img 
          src="/avatar.jpg" 
          alt="Avatar" 
          className="relative w-32 h-32 rounded-full object-cover border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=QXY';
          }}
        />
        <div className="absolute bottom-1 right-1 w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700">
           <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-pulse"></div>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        仇晓羽 <span className="text-cyan-400 font-light text-2xl font-mono">| QXY</span>
      </h1>
      <p className="text-slate-400 font-medium text-base md:text-lg max-w-sm leading-relaxed mb-6 border-b border-white/5 pb-6">
        一个正在学习<span className="text-blue-400">AI</span>和<span className="text-purple-400">Web3</span>的口腔科医生
      </p>
      
      {/* Visual Indicator for Chat - Mobile Only */}
      <div 
        onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="md:hidden animate-bounce mt-2 text-cyan-500/50 cursor-pointer hover:text-cyan-400 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg>
      </div>
    </header>
  );
};

export default Header;
