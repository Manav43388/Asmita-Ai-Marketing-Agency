import React, { useState } from 'react';
import { Calendar, Filter, Plus, CalendarDays, CheckSquare, Clock } from 'lucide-react';

export default function ContentStrategy({ calendar, setCalendar, products }) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [newPlan, setNewPlan] = useState({
    day: 'Monday',
    theme: '',
    type: 'Reel',
    product: '',
    hook: '',
    category: 'Educational',
    language: 'Hindi + English'
  });

  const categories = ['All', 'Educational', 'Product Showcase', 'Behind-the-scenes', 'Spiritual Lifestyle'];

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.theme) return;
    const plan = {
      ...newPlan,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Scheduled'
    };
    setCalendar([...calendar, plan]);
    setNewPlan({
      day: 'Monday',
      theme: '',
      type: 'Reel',
      product: products[0]?.name || '',
      hook: '',
      category: 'Educational',
      language: 'Hindi + English'
    });
  };

  const filteredCalendar = filterCategory === 'All' 
    ? calendar 
    : calendar.filter(c => c.category === filterCategory);

  return (
    <div className="grid grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
      
      {/* Calendar Listing */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays size={22} color="var(--primary)" />
            Active Content Calendar
          </h3>
          
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter size={16} color="var(--text-secondary)" />
            <select 
              className="form-select py-1 px-3 text-xs w-auto"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{ padding: '6px 12px' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Weekly Cards */}
        <div className="flex flex-col gap-4">
          {filteredCalendar.map(item => (
            <div 
              key={item.id} 
              className={`glass-panel calendar-day-card ${item.type.toLowerCase() === 'reel' ? 'reel' : item.type.toLowerCase() === 'story' ? 'story' : ''}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', tracking: '0.05em' }}>
                      {item.day} ({item.date})
                    </span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                      {item.type}
                    </span>
                    <span className="product-tag" style={{ fontSize: '0.7rem' }}>
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{item.theme}</h4>
                  
                  {item.hook && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                      <strong>Hook:</strong> "{item.hook}"
                    </p>
                  )}
                  {item.product && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                      Focus: <strong style={{ color: 'var(--text-secondary)' }}>{item.product}</strong>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: item.status === 'Scheduled' ? 'rgba(16,185,129,0.1)' : 'rgba(242,101,34,0.1)',
                    color: item.status === 'Scheduled' ? '#10b981' : 'var(--saffron)',
                    border: item.status === 'Scheduled' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(242,101,34,0.2)'
                  }}>
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Lang: {item.language}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredCalendar.length === 0 && (
            <div className="glass-panel p-8 text-center text-secondary" style={{ color: 'var(--text-secondary)' }}>
              No campaigns scheduled for this category.
            </div>
          )}
        </div>
      </div>

      {/* Add/Plan Content Card */}
      <div className="glass-panel p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar size={18} color="var(--primary)" />
          Plan Campaign Slot
        </h3>
        <form onSubmit={handleAddPlan} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weekday</label>
            <select 
              className="form-select"
              value={newPlan.day}
              onChange={e => setNewPlan({...newPlan, day: e.target.value})}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Campaign Theme / Topic *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Packing 25kg Chandan incense logs"
              value={newPlan.theme}
              onChange={e => setNewPlan({...newPlan, theme: e.target.value})}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Format Type</label>
            <select 
              className="form-select"
              value={newPlan.type}
              onChange={e => setNewPlan({...newPlan, type: e.target.value})}
            >
              <option value="Reel">Instagram Reel</option>
              <option value="Story">Instagram Story</option>
              <option value="Carousel">Carousel Post</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Target Product</label>
            <select 
              className="form-select"
              value={newPlan.product}
              onChange={e => setNewPlan({...newPlan, product: e.target.value})}
            >
              <option value="">-- Select Product --</option>
              {products.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Core Hook Idea</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Stop wasting money on synthetic sprays..."
              value={newPlan.hook}
              onChange={e => setNewPlan({...newPlan, hook: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category</label>
              <select 
                className="form-select"
                value={newPlan.category}
                onChange={e => setNewPlan({...newPlan, category: e.target.value})}
              >
                <option value="Educational">Educational</option>
                <option value="Product Showcase">Product Showcase</option>
                <option value="Behind-the-scenes">Behind-the-scenes</option>
                <option value="Spiritual Lifestyle">Spiritual Lifestyle</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Language</label>
              <select 
                className="form-select"
                value={newPlan.language}
                onChange={e => setNewPlan({...newPlan, language: e.target.value})}
              >
                <option value="Gujarati">Gujarati</option>
                <option value="Hindi + English">Hindi + English</option>
                <option value="English">English</option>
                <option value="Gujarati + Hindi">Gujarati + Hindi</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center mt-2">
            <Plus size={16} /> Schedule Campaign
          </button>
        </form>
      </div>

    </div>
  );
}
