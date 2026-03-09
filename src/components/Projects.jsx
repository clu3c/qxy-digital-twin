
import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Dental AI Assistant",
      desc: "基于 LLM 的口腔健康咨询助手",
      tags: ["AI", "Healthcare", "React"],
      link: "#"
    },
    {
      title: "Web3 Health Record",
      desc: "去中心化电子病历原型验证",
      tags: ["Web3", "Solidity", "Privacy"],
      link: "#"
    },
    {
      title: "Personal Knowledge Base",
      desc: "Obsidian + AI 自动化工作流",
      tags: ["PKM", "Automation", "Python"],
      link: "#"
    }
  ];

  return (
    <div className="px-8 pb-8 pt-2">
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-mono font-bold text-amber-500/70 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-sm shadow-[0_0_5px_#f59e0b]"></span>
          Selected Works
        </span>
        
        <div className="space-y-3">
          {projects.map((project, idx) => (
            <a 
              key={idx}
              href={project.link}
              className="block p-3 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:bg-slate-800/60 hover:border-amber-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors">{project.title}</h4>
                <svg className="w-3 h-3 text-slate-600 group-hover:text-amber-500/70 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
              <p className="text-xs text-slate-400 mb-2 line-clamp-1">{project.desc}</p>
              <div className="flex gap-1.5 flex-wrap">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-slate-900/50 text-slate-500 rounded border border-slate-800 group-hover:border-amber-500/20 group-hover:text-amber-500/70 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
