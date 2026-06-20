import React, { useState } from 'react';
import { Play, Check, AlertCircle, RefreshCw, BarChart2, Star, Megaphone, Users2 } from 'lucide-react';

export default function Dashboard({ products, calendar, setCalendar, setActiveTab }) {
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      theme: "Kesar & Chandan Royal Pooja",
      type: "Reel",
      product: "Kesar & Chandan Premium Agarbati",
      desc: "Cinematic close-up of a royal saffron incense stick being lit in a traditional brass burner.",
      lang: "Hindi",
      status: "Awaiting CEO Approval"
    },
    {
      id: 2,
      theme: "B2B Gujarat Distributors Pitch",
      type: "Carousel",
      product: "Nag Champa Agarbati",
      desc: "5 reasons why Gujarati religious shops make 40% more margin by buying direct wholesale from Asmita.",
      lang: "Gujarati",
      status: "Awaiting CEO Approval"
    }
  ]);

  const [weeklyStatus, setWeeklyStatus] = useState('Idle');

  const handleApprove = (id) => {
    const item = approvals.find(a => a.id === id);
    if (!item) return;

    // Add to Calendar
    const newCalendarItem = {
      id: Date.now(),
      day: "Saturday",
      date: new Date().toISOString().split('T')[0],
      theme: item.theme,
      type: item.type,
      product: item.product,
      hook: item.desc,
      category: item.type === 'Reel' ? 'Product Showcase' : 'Educational',
      language: item.lang,
      status: 'Scheduled'
    };

    setCalendar([...calendar, newCalendarItem]);
    setApprovals(approvals.filter(a => a.id !== id));
    alert(`"${item.theme}" approved and added to active Content Calendar!`);
  };

  const runWeeklyProcedure = () => {
    setWeeklyStatus('Planning');
    setTimeout(() => {
      // Set calendar with initial set + weekly campaign additions
      const weeklyAdditions = [
        {
          id: 301,
          day: "Saturday",
          date: "2026-06-27",
          theme: "Diwali Gifting Pooja Box Prep",
          type: "Reel",
          product: "Pooja Essentials Gift Set",
          hook: "Looking for the perfect gift for your relatives? (Handmade with pure resins)",
          category: "Product Showcase",
          language: "Hindi + English",
          status: "Scheduled"
        },
        {
          id: 302,
          day: "Sunday",
          date: "2026-06-28",
          theme: "Sunday Spiritual Quote & Incense",
          type: "Story",
          product: "Lavender Calm Agarbati",
          hook: "Start your Sunday with pure peace...",
          category: "Spiritual Lifestyle",
          language: "Gujarati",
          status: "Scheduled"
        }
      ];
      setCalendar(prev => {
        // Avoid duplicates
        const filtered = prev.filter(c => c.id !== 301 && c.id !== 302);
        return [...filtered, ...weeklyAdditions];
      });
      setWeeklyStatus('Done');
      alert('Weekly Operating Procedure complete! 2 new festival campaigns added.');
    }, 1200);
  };

  const agents = [
    { name: 'Marketing CEO', status: 'Active', color: '#ff6b7e', role: 'Manage operations & approvals' },
    { name: 'Business Knowledge', status: 'Synched', color: 'var(--primary)', role: 'Product indexes & target catalog' },
    { name: 'Trend Research', status: 'Scanning', color: 'var(--saffron)', role: 'Track spiritual/B2B viral reels' },
    { name: 'Content Strategy', status: 'Idle', color: '#10b981', role: 'Daily/Weekly/Monthly calendars' },
    { name: 'Script Writer', status: 'Idle', color: '#3b82f6', role: 'Gujarati/Hindi caption & reels writer' },
    { name: 'Reel Production', status: 'Idle', color: '#8b5cf6', role: 'Smartphone camera & shot lists setup' },
    { name: 'Brand Quality', status: 'Active', color: '#ec4899', role: 'Review tone & CTA checklist' },
    { name: 'Performance Analyst', status: 'Analyzing', color: '#14b8a6', role: 'Monitor views & WhatsApp leads' },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* CEO Message Banner */}
      <div className="ceo-banner">
        <div className="ceo-banner-text">
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 'bold', tracking: '0.05em' }}>
            Marketing CEO Statement
          </span>
          <h2 className="text-2xl font-semibold mt-1">Grow Asmita Gruh Udhyog Brand Quality & Wholesale Reach</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            "We are not here to build technical complexity. We optimize for high margins, distributor growth, and spiritual devotion."
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('daily-loop')}
          className="btn-primary"
        >
          <Play size={16} /> Execute Daily Routine
        </button>
      </div>

      {/* Main Grid: Approvals, Actions, Roster */}
      <div className="grid-layout-2-1">
        
        {/* Left column: Approval center & Weekly Planning */}
        <div className="flex flex-col gap-6">
          
          {/* CEO Approval Center */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
              <Star size={20} color="var(--primary)" />
              CEO Campaign Approval Board
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Review these draft marketing concepts. Approving them will instantly push them onto the active content calendar.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {approvals.map(app => (
                <div key={app.id} className="approval-card">
                  <div className="approval-card-header">
                    <div className="flex items-center gap-2">
                      <span className="approval-type-tag">{app.type}</span>
                      <span className="approval-lang-tag">Lang: {app.lang}</span>
                    </div>
                    <span className="approval-status-tag">{app.status}</span>
                  </div>
                  <div className="approval-card-body">
                    <h4>{app.theme}</h4>
                    <p>{app.desc}</p>
                    <div className="approval-card-focus">Focus: {app.product}</div>
                  </div>
                  <div className="approval-card-footer">
                    <button 
                      onClick={() => handleApprove(app.id)}
                      className="btn-primary btn-sm"
                    >
                      <Check size={12} /> Approve Campaign
                    </button>
                  </div>
                </div>
              ))}

              {approvals.length === 0 && (
                <div className="p-6 text-center text-secondary border border-dashed border-[var(--border-gold)] rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                  ✔ No pending concepts to approve. All content is scheduled!
                </div>
              )}
            </div>
          </div>

          {/* Weekly loop card */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Megaphone size={20} color="var(--primary)" />
              Weekly Strategy & Festival Planning
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Run the Weekly Procedure to create a structured content plan, review performance metrics, and inject festival and gifting packs campaigns.
            </p>
            <button 
              onClick={runWeeklyProcedure}
              disabled={weeklyStatus === 'Planning'}
              className="btn-secondary justify-center w-full"
            >
              {weeklyStatus === 'Planning' ? (
                <>
                  <RefreshCw className="animate-spin" size={16} /> Planning weekly layouts...
                </>
              ) : (
                <>
                  <Play size={16} /> Run Weekly Operating Procedure
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right column: Active Agency Roster */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Users2 size={20} color="var(--primary)" />
            AI Agency Departments
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Status check of our 8 AI marketing agents currently operating the Asmita Gruh Udhyog pipeline:
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {agents.map((agent, idx) => (
              <div key={idx} className="agent-roster-item">
                <div>
                  <h4 className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>{agent.name}</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{agent.role}</p>
                </div>
                <span 
                  className="agent-badge-pill"
                  style={{ 
                    background: agent.status === 'Active' || agent.status === 'Synched' ? 'rgba(16,185,129,0.1)' : 'rgba(212,175,55,0.1)',
                    color: agent.status === 'Active' || agent.status === 'Synched' ? '#10b981' : 'var(--primary)',
                    border: agent.status === 'Active' || agent.status === 'Synched' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(212,175,55,0.2)'
                  }}
                >
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
