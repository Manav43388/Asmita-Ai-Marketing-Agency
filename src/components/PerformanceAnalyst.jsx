import React, { useState } from 'react';
import { BarChart, TrendingUp, HelpCircle, Eye, ThumbsUp, MessageSquare, Send, Save, PhoneCall } from 'lucide-react';
import { initialCampaigns } from './mockData';

export default function PerformanceAnalyst() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[1]); // Pure Sandalwood as default

  const totalReach = campaigns.reduce((acc, c) => acc + c.reach, 0);
  const totalLikes = campaigns.reduce((acc, c) => acc + c.likes, 0);
  const totalInquiries = campaigns.reduce((acc, c) => acc + c.inquiries, 0);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Mini KPI row */}
      <div className="kpi-row">
        <div className="glass-panel kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
            <Eye size={24} color="var(--primary)" />
          </div>
          <div>
            <div className="kpi-val">{totalReach.toLocaleString()}</div>
            <div className="kpi-lbl">Total Campaign Reach</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(242, 101, 34, 0.1)' }}>
            <ThumbsUp size={24} color="var(--saffron)" />
          </div>
          <div>
            <div className="kpi-val">{totalLikes.toLocaleString()}</div>
            <div className="kpi-lbl">Total Video Likes</div>
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <PhoneCall size={24} color="#10b981" />
          </div>
          <div>
            <div className="kpi-val">{totalInquiries}</div>
            <div className="kpi-lbl">Wholesale Leads</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Panel: Campaign list & visual charts */}
        <div className="flex flex-col gap-6">
          
          {/* Charts representation */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4" style={{ color: 'var(--primary)' }}>
              <BarChart size={20} />
              Campaign Performance Metrics
            </h3>
            
            <div className="bar-chart-container">
              {campaigns.map(c => {
                const heightPercentage = Math.min(100, Math.max(10, (c.reach / 25000) * 100));
                const isSelected = selectedCampaign.id === c.id;
                return (
                  <div key={c.id} className="bar-wrap" onClick={() => setSelectedCampaign(c)} style={{ cursor: 'pointer' }}>
                    <span className="bar-val">{c.reach.toLocaleString()}</span>
                    <div 
                      className={`bar ${isSelected ? 'highlight' : ''}`}
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    <span className="bar-lbl">{c.product}</span>
                  </div>
                );
              })}
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'var(--saffron)' }}></div>
                <span>Reach Metrics</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'var(--primary)' }}></div>
                <span>Selected Focus</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold mb-4">Past Campaign Logs</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-gold)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Topic</th>
                    <th style={{ padding: '10px' }}>Product</th>
                    <th style={{ padding: '10px' }}>Reach</th>
                    <th style={{ padding: '10px' }}>Likes</th>
                    <th style={{ padding: '10px' }}>Inquiries</th>
                    <th style={{ padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(c => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedCampaign(c)}
                      style={{ 
                        borderBottom: '1px solid rgba(212,175,55,0.05)',
                        cursor: 'pointer',
                        background: selectedCampaign.id === c.id ? 'rgba(212,175,55,0.04)' : 'transparent'
                      }}
                      className="hover:bg-[rgba(212,175,55,0.02)]"
                    >
                      <td style={{ padding: '12px 10px', color: 'var(--text-primary)', fontWeight: '500' }}>{c.title}</td>
                      <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{c.product}</td>
                      <td style={{ padding: '12px 10px' }}>{c.reach.toLocaleString()}</td>
                      <td style={{ padding: '12px 10px' }}>{c.likes.toLocaleString()}</td>
                      <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 'bold' }}>{c.inquiries}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Panel: Campaign breakdown + recommendations */}
        <div className="flex flex-col gap-6">
          {/* Selected Campaign breakdown */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
              <TrendingUp size={18} />
              Reel Breakdown
            </h3>
            
            <div className="flex flex-col gap-3">
              <div>
                <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Theme</strong>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedCampaign.title}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-gold)] pt-3">
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reach</span>
                  <div className="flex items-center gap-1 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    <Eye size={14} color="var(--primary)" />
                    {selectedCampaign.reach.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Likes</span>
                  <div className="flex items-center gap-1 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    <ThumbsUp size={14} color="var(--saffron)" />
                    {selectedCampaign.likes.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Saves</span>
                  <div className="flex items-center gap-1 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    <Save size={14} color="var(--primary)" />
                    {selectedCampaign.saves.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Shares</span>
                  <div className="flex items-center gap-1 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    <Send size={14} color="var(--saffron)" />
                    {selectedCampaign.shares.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border-gold)] pt-3 flex flex-col gap-1">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Instagram Engagement Hook</span>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                  "{selectedCampaign.hook}"
                </p>
              </div>
            </div>
          </div>

          {/* Performance Analyst Agent Advice */}
          <div className="glass-panel p-6 flex flex-col gap-4 border-l-4" style={{ borderLeftColor: 'var(--primary)' }}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp size={18} color="var(--primary)" />
              Performance Analyst Advice
            </h3>
            
            <div className="flex flex-col gap-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                📈 <strong>B2B Reels Outperforming:</strong> Reels focusing on wholesale margins and direct shipping have generated <strong>2.6x more direct inquiries</strong> on WhatsApp per 1,000 views compared to standard floral showcases.
              </p>
              <p>
                🔥 <strong>Smoke Macro Shot Retention:</strong> Retaining viewer attention inside the first 3s increases by <strong>35%</strong> when we begin the reel with a close-up match-striking lighting dhoop stick rather than displaying static packaging boxes.
              </p>
              <p>
                💡 <strong>Actionable Step:</strong> Double down on Gugal Dhoop packaging reels. Record a raw reel of packing a 50-box container.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
