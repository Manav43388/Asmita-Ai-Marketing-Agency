import React, { useRef, useEffect } from 'react';

export default function AgentTerminal({ logs, isRunning }) {
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="terminal-title">Agency Operations Chat Log</div>
        <div style={{ width: '40px' }}></div>
      </div>
      <div className="terminal-body">
        {logs.map((log, index) => {
          let badgeBg = 'rgba(212,175,55,0.2)';
          let badgeColor = 'var(--primary)';
          
          if (log.agent === 'Marketing CEO') {
            badgeBg = 'rgba(88,17,26,0.3)';
            badgeColor = '#ff6b7e';
          } else if (log.agent === 'Trend Research') {
            badgeBg = 'rgba(242,101,34,0.2)';
            badgeColor = 'var(--saffron)';
          } else if (log.agent === 'Content Strategy') {
            badgeBg = 'rgba(16,185,129,0.2)';
            badgeColor = '#10b981';
          } else if (log.agent === 'Script Writer') {
            badgeBg = 'rgba(59,130,246,0.2)';
            badgeColor = '#3b82f6';
          } else if (log.agent === 'Reel Production') {
            badgeBg = 'rgba(139,92,246,0.2)';
            badgeColor = '#8b5cf6';
          } else if (log.agent === 'Brand Quality') {
            badgeBg = 'rgba(236,72,153,0.2)';
            badgeColor = '#ec4899';
          } else if (log.agent === 'Performance Analyst') {
            badgeBg = 'rgba(20,184,166,0.2)';
            badgeColor = '#14b8a6';
          }

          return (
            <div key={index} className="agent-msg animate-fade-in">
              <div className="agent-header">
                <span className="agent-badge" style={{ background: badgeBg, color: badgeColor }}>
                  {log.agent}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
              </div>
              <div className="agent-content">{log.message}</div>
            </div>
          );
        })}
        {isRunning && (
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--primary)' }}>
            <span className="animate-pulse">●</span> Agents coordinating campaign structure...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
