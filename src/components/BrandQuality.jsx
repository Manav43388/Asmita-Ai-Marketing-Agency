import React, { useState } from 'react';
import { ShieldCheck, ClipboardCheck, MessageSquareCode, Sparkles, XCircle, CheckCircle2 } from 'lucide-react';

export default function BrandQuality() {
  const [scriptText, setScriptText] = useState('');
  const [auditResult, setAuditResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!scriptText.trim()) return;
    setIsAuditing(true);

    setTimeout(() => {
      const text = scriptText.toLowerCase();
      let score = 10.0;
      const issues = [];
      const successes = [];

      // Check for Call to Action
      if (text.includes('whatsapp') || text.includes('dm') || text.includes('order') || text.includes('લિંક') || text.includes('કમેન્ટ')) {
        successes.push('Call To Action (CTA) detected: High wholesale inquiry probability.');
      } else {
        score -= 2.0;
        issues.push('Missing clear Call To Action (No mention of WhatsApp, DM, or order details).');
      }

      // Check for Gujarati/Indian references
      if (text.includes('gujarat') || text.includes('ગુજરાત') || text.includes('temple') || text.includes('pooja') || text.includes('શુદ્ધતા') || text.includes('પૂજા') || text.includes('mandir')) {
        successes.push('Spiritual/Cultural themes detected: Authentic regional alignment.');
      } else {
        score -= 1.5;
        issues.push('Weak cultural connection (No mention of pooja, temples, or Gujarat heritage).');
      }

      // Check for raw product references
      if (text.includes('agarbatti') || text.includes('dhoop') || text.includes('fragrance') || text.includes('અગરબત્તી') || text.includes('સુગંધ') || text.includes('ધૂપ')) {
        successes.push('Product category references match company index.');
      } else {
        score -= 2.0;
        issues.push('No direct product reference found (Make sure to mention agarbatti or dhoop).');
      }

      // Check for bad words/hype
      if (text.includes('cheap') || text.includes('crazy deal') || text.includes('hurry up') || text.includes('buy now')) {
        score -= 1.5;
        issues.push('Overly aggressive sales tone detected. Keep the voice spiritual and respectful.');
      } else {
        successes.push('Tone remains respectful and matches traditional guidelines.');
      }

      setAuditResult({
        score: Math.max(1.0, score).toFixed(1),
        passed: score >= 7.0,
        issues,
        successes
      });
      setIsAuditing(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      
      {/* Script Audit Submitter */}
      <div className="glass-panel p-6 flex flex-col gap-4">
        <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
          <ClipboardCheck size={22} />
          Compliance & Quality Auditor
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Paste your drafted Instagram caption, reel concept, or script below. The Brand Quality Agent will check for brand voice compliance, CTAs, and spiritual tone.
        </p>

        <form onSubmit={handleAudit} className="flex flex-col gap-4">
          <textarea 
            className="form-textarea" 
            rows="8"
            placeholder="e.g. Try our Sandalwood Agarbati! Handcrafted with pure sandalwood. Great for home pooja and meditation. Order today..."
            value={scriptText}
            onChange={e => setScriptText(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary justify-center" disabled={isAuditing}>
            {isAuditing ? (
              <>
                <Sparkles className="animate-spin" size={16} /> Auditing Script...
              </>
            ) : (
              <>
                <ShieldCheck size={16} /> Run Brand Audit
              </>
            )}
          </button>
        </form>
      </div>

      {/* Audit Results Board */}
      <div className="glass-panel p-6 flex flex-col gap-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquareCode size={22} color="var(--primary)" />
          Quality Audit Report
        </h3>

        {auditResult ? (
          <div className="flex flex-col gap-4">
            
            {/* Scorecard */}
            <div className="p-4 rounded-lg flex items-center justify-between border" style={{ 
              background: auditResult.passed ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
              borderColor: auditResult.passed ? '#10b981' : '#ef4444'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Compliance Score</span>
                <h4 style={{ fontSize: '2rem', fontWeight: 'bold', color: auditResult.passed ? '#10b981' : '#ef4444', lineHeight: 1 }}>
                  {auditResult.score} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 10</span>
                </h4>
              </div>
              <div className="text-right">
                <span className="font-semibold" style={{ color: auditResult.passed ? '#10b981' : '#ef4444' }}>
                  {auditResult.passed ? 'PASSED FOR PRODUCTION' : 'REJECTED / WEAK CONTENT'}
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {auditResult.passed ? 'Ready to film' : 'Please address guidelines below'}
                </p>
              </div>
            </div>

            {/* Success checklist */}
            {auditResult.successes.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 'bold' }}>Brand Alignments:</h4>
                {auditResult.successes.map((s, i) => (
                  <div key={i} className="flex gap-2 items-start" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={16} color="#10b981" className="mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Improvement points */}
            {auditResult.issues.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <h4 style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 'bold' }}>Required Revisions:</h4>
                {auditResult.issues.map((iss, i) => (
                  <div key={i} className="flex gap-2 items-start" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    <XCircle size={16} color="#ef4444" className="mt-0.5 shrink-0" />
                    <span>{iss}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          <div className="glass-panel p-12 text-center text-secondary" style={{ color: 'var(--text-secondary)' }}>
            Submit a draft script on the left panel to trigger the Brand Quality Agent's audit process.
          </div>
        )}
      </div>

    </div>
  );
}
