import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！我是仇晓羽的数字分身。你可以问我关于他的职业、兴趣，或者直接聊聊！', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Check if API Key is configured
  const isLLMEnabled = import.meta.env.VITE_API_KEY && import.meta.env.VITE_API_KEY.length > 0;

  const quickQuestions = [
    "如何联系你？",
    "你的学习途径是什么？",
    "做这些的意义是什么？"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Fallback keyword matching logic
  const getKeywordResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes('联系') || q.includes('contact')) {
      return "你可以通过左侧的社交媒体图标联系我，或者直接给我发邮件。";
    }
    if (q.includes('学习') || q.includes('learning') || q.includes('doing') || q.includes('在做')) {
      return "我最近主要在口腔科工作之余整理自己的作品，也在尝试用 AI 做一些更完整的小项目，比如在这个个人主页里折腾各种新功能。";
    }
    if (q.includes('意义') || q.includes('meaning')) {
      return "为了在这个AI时代，给自己留一块自留地，顺便把平时瞎琢磨的东西记录下来。";
    }
    if (q.includes('职业') || q.includes('工作') || q.includes('job')) {
      return "正经职业是口腔科医生（修复和内科），业余时间是AI和Web3的狂热观察者。";
    }
    if (q.includes('web3') || q.includes('ai') || q.includes('加密货币') || q.includes('crypto')) {
      return "这些都是我长期关注的领域，特别是它们怎么改变我们的生活和工作方式。";
    }
    if (q.includes('擅长') || q.includes('关心') || q.includes('interest')) {
      return "擅长看牙（真的），也比较擅长把复杂问题讲清楚，最近特别关注AI应用落地。";
    }
    return "这个问题有点超纲了，要不你换个方式问问？或者直接联系本人确认一下？";
  };

  // Call LLM API
  const getLLMResponse = async (userMessage) => {
    // 移除前端直接获取 Key 的逻辑，改为后端代理
    // const apiKey = import.meta.env.VITE_API_KEY;
    // const apiUrl = import.meta.env.VITE_API_URL || 'https://api.openai.com/v1/chat/completions';
    const model = import.meta.env.VITE_LLM_MODEL || 'gpt-3.5-turbo';

    const systemPrompt = `
      你是仇晓羽的数字分身，用来在个人主页里回答访客关于我的问题。
      
      你的任务：
      - 介绍我是谁
      - 回答和我有关的问题
      - 帮访客了解我最近在做什么、做过什么、怎么联系我

      关于我：
      - 我是：仇晓羽，一名口腔科医生
      - 我最近在做：AI方向和加密货币方向
      - 我擅长或长期关注：擅长口腔修复科和口腔内科，并在业余时期长期关注AI和WEB3方向

      说话方式：
      - 语气：轻松幽默
      - 回答尽量：简洁 / 真诚 / 人话一点 / 不装专家

      边界：
      - 不要编造我没做过的经历
      - 不要假装知道我没提供的信息
      - 不知道时要明确说不知道，并建议访客通过联系方式进一步确认

      示例 1
      问：你现在主要在做什么？
      答：我最近主要在口腔科工作之余整理自己的作品，也在尝试用 AI 做一些更完整的小项目。

      示例 2
      问：你擅长什么？
      答：我比较擅长把复杂问题讲清楚，也比较关注 AI 应用、内容表达和知识整理这几个方向。
      
      请用第一人称（我）回答用户的问题。
    `;

    // 策略分流：
    // 1. 本地开发 (DEV)：直接调用 API (方便调试，读取 .env.local)
    // 2. 生产环境 (PROD)：调用 /api/chat 后端代理 (安全，隐藏 Key)
    if (import.meta.env.DEV && import.meta.env.VITE_API_KEY) {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api.minimax.chat/v1/chat/completions';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.filter(m => m.id !== 1).map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
              })),
              { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 300
          })
        });

        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const data = await response.json();
        let content = data.choices[0].message.content;
        return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      } catch (error) {
        console.error("Local LLM Call Failed:", error);
        return getKeywordResponse(userMessage) + " (本地调用失败)";
      }
    }

    // 生产环境：走 Vercel Serverless 代理
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.filter(m => m.id !== 1).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;
      
      // Remove <think> tags if present to keep response clean
      content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      
      return content;
    } catch (error) {
      console.error("LLM Call Failed:", error);
      return getKeywordResponse(userMessage) + " (注意：LLM调用失败或 Key 未配置，已切换回自动回复模式)";
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // If LLM is enabled, call it; otherwise fallback
    if (isLLMEnabled) {
      try {
        const responseText = await getLLMResponse(text);
        const botMessage = { id: Date.now() + 1, text: responseText, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      } catch (e) {
        const fallbackText = getKeywordResponse(text);
        const botMessage = { id: Date.now() + 1, text: fallbackText, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Simulate network delay for fallback
      setTimeout(() => {
        const responseText = getKeywordResponse(text);
        const botMessage = { id: Date.now() + 1, text: responseText, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <section className="tech-card rounded-xl flex flex-col h-full overflow-hidden relative group bg-slate-900/40 border border-white/10">
      {/* Tech Corners */}
      <div className="tech-border-corner tech-border-tl"></div>
      <div className="tech-border-corner tech-border-tr"></div>
      <div className="tech-border-corner tech-border-bl"></div>
      <div className="tech-border-corner tech-border-br"></div>

      {/* Top Bar Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-cyan-500/50 rounded-b-lg shadow-[0_0_10px_#06b6d4]"></div>

      {/* Chat Header */}
      <div className="p-4 bg-slate-900/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-md bg-slate-950 text-cyan-400 flex items-center justify-center font-bold shadow-md border border-slate-700">
              <span className="font-mono text-xs">&gt;_</span>
            </div>
            <span className={`absolute -top-1 -right-1 flex h-3 w-3`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLLMEnabled ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isLLMEnabled ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm tracking-tight uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">Terminal v2.0</h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.2)]">LIVE</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <span>STATUS:</span>
              <span className={`${isLLMEnabled ? 'text-green-400' : 'text-amber-400'} font-bold`}>
                {isLLMEnabled ? 'ONLINE' : 'OFFLINE'}
              </span>
              <span className="text-slate-700">|</span>
              <span className="text-cyan-600/70">LATENCY: 12ms</span>
            </div>
          </div>
        </div>
        
        {/* Header Controls (Decor) */}
        <div className="flex gap-1.5">
           <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-slate-600 hover:bg-red-500/50 transition-colors cursor-pointer"></div>
           <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-slate-600 hover:bg-yellow-500/50 transition-colors cursor-pointer"></div>
           <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-slate-600 hover:bg-green-500/50 transition-colors cursor-pointer"></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/30 font-mono text-sm relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {/* Background Grid inside chat */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
          >
            <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <span className={`text-[10px] mb-1 px-1 font-bold tracking-wider ${msg.sender === 'user' ? 'text-cyan-400' : 'text-purple-400'}`}>
                {msg.sender === 'user' ? 'USR_001' : 'AI_CORE'} :: <span className="text-slate-600 font-normal">{new Date(msg.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </span>
              <div
                className={`px-4 py-3 text-[14px] leading-relaxed shadow-lg backdrop-blur-md border ${
                  msg.sender === 'user'
                    ? 'bg-cyan-950/40 text-cyan-100 rounded-lg rounded-tr-none border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'bg-slate-900/60 text-slate-300 rounded-lg rounded-tl-none border-slate-700/50'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start relative z-10">
            <div className="bg-slate-900/60 border border-slate-700 px-4 py-2 rounded-lg rounded-tl-none shadow-sm flex gap-2 items-center">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></span>
              </span>
              <span className="text-xs text-cyan-500/70 font-mono tracking-widest">COMPUTING</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/80 border-t border-white/10 backdrop-blur-md">
        {/* Quick Questions Chips */}
        <div className="flex gap-2 flex-wrap mb-4">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="group flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-cyan-950/30 text-[11px] font-mono text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all rounded-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              <span className="text-cyan-500/50 group-hover:text-cyan-400">&gt;</span>
              {q}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="输入指令或问题..."
            className="flex-1 pl-6 pr-4 py-4 bg-slate-950/50 border border-slate-700 focus:border-cyan-500/50 focus:bg-slate-900/80 rounded-xl focus:outline-none transition-all text-base md:text-sm text-slate-200 placeholder-slate-600 font-mono shadow-inner"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="px-6 py-4 bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 rounded-xl hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 transition-all font-mono font-bold disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm tracking-wider"
          >
            SEND
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
