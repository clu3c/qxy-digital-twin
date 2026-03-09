import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-400 py-6 text-center text-sm">
      <p>© {new Date().getFullYear()} 仇晓羽. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
