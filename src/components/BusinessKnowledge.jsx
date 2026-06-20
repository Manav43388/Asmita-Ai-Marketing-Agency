import React, { useState } from 'react';
import { Package, Users, Bookmark, Plus, FileText, CheckCircle, ShieldAlert } from 'lucide-react';
import { targetAudience, brandGuidelines } from './mockData';

export default function BusinessKnowledge({ products, setProducts }) {
  const [activeSubTab, setActiveSubTab] = useState('products');
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Agarbati',
    price: '',
    burnTime: '',
    description: '',
    ingredients: '',
    benefits: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      isNew: true,
      stock: 100,
      salesCount: 0
    };
    setProducts([product, ...products]);
    setNewProduct({
      name: '',
      sku: '',
      category: 'Agarbati',
      price: '',
      burnTime: '',
      description: '',
      ingredients: '',
      benefits: ''
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sub Tabs */}
      <div className="flex gap-4 border-b border-[var(--border-gold)] pb-4">
        <button 
          onClick={() => setActiveSubTab('products')}
          className={`btn-secondary ${activeSubTab === 'products' ? 'active' : ''} flex items-center gap-2`}
          style={activeSubTab === 'products' ? {borderColor: 'var(--primary)', color: 'var(--text-primary)'} : {}}
        >
          <Package size={18} />
          Products & Fragrances ({products.length})
        </button>
        <button 
          onClick={() => setActiveSubTab('audience')}
          className={`btn-secondary ${activeSubTab === 'audience' ? 'active' : ''} flex items-center gap-2`}
          style={activeSubTab === 'audience' ? {borderColor: 'var(--primary)', color: 'var(--text-primary)'} : {}}
        >
          <Users size={18} />
          Target Customers
        </button>
        <button 
          onClick={() => setActiveSubTab('voice')}
          className={`btn-secondary ${activeSubTab === 'voice' ? 'active' : ''} flex items-center gap-2`}
          style={activeSubTab === 'voice' ? {borderColor: 'var(--primary)', color: 'var(--text-primary)'} : {}}
        >
          <Bookmark size={18} />
          Brand Voice & Rules
        </button>
      </div>

      {/* Sub Tab Content */}
      {activeSubTab === 'products' && (
        <div className="grid grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Products List */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Package size={20} color="var(--primary)" />
              Active Product Directory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="glass-panel product-card">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="product-tag">{p.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SKU: {p.sku || 'N/A'}</span>
                    </div>
                    <h4 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{p.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>{p.description}</p>
                    
                    {p.burnTime && (
                      <div className="flex gap-2 items-center mt-3" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <strong>Burn Time:</strong> {p.burnTime}
                      </div>
                    )}
                    {p.ingredients && (
                      <div className="mt-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <strong>Ingredients:</strong> <span style={{ fontStyle: 'italic' }}>{p.ingredients}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center border-t border-[var(--border-gold)] pt-3 mt-2">
                    <span className="product-price">₹{p.price}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--saffron)' }}>
                      {p.isBestseller ? '★ Bestseller' : p.isNew ? 'New Product' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Product Form */}
          <div className="glass-panel p-6 flex flex-col gap-4 h-fit">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Plus size={18} color="var(--primary)" />
              Register New Product
            </h3>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Product Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Kasturi Premium Agarbati"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category</label>
                <select 
                  className="form-select"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="Agarbati">Agarbati</option>
                  <option value="Dhoop">Dhoop Sticks</option>
                  <option value="Gift Set">Gift Set</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Wholesale Price (₹) *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="e.g. 75"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Burn Time</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 45 min"
                    value={newProduct.burnTime}
                    onChange={e => setNewProduct({...newProduct, burnTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>SKU Code</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. KAS-AGB-1007"
                  value={newProduct.sku}
                  onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Short Description</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  placeholder="Aromatherapy fragrance for pooja and spaces..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center mt-2">
                <Plus size={16} /> Save Product to DB
              </button>
            </form>
          </div>
        </div>
      )}

      {activeSubTab === 'audience' && (
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Users size={20} color="var(--primary)" />
            Target Customer Persona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((audience, idx) => (
              <div key={idx} className="glass-panel p-6 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ background: 'var(--maroon)', width: '8px', height: '18px', borderRadius: '2px' }}></div>
                    <h4 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{audience.role}</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    <strong>Core Needs:</strong> {audience.needs}
                  </p>
                </div>
                <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold' }}>Marketing Pitch</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>{audience.angle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'voice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dos */}
          <div className="glass-panel p-6 border-l-4" style={{ borderLeftColor: '#10b981' }}>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4" style={{ color: '#10b981' }}>
              <CheckCircle size={22} />
              Brand Guideline: Dos
            </h3>
            <div className="flex flex-col gap-3">
              {brandGuidelines.doList.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span style={{ color: '#10b981', marginTop: '3px' }}>✔</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)]">
              <strong style={{ fontSize: '0.85rem', color: '#10b981' }}>Brand Tone:</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{brandGuidelines.voice}</p>
            </div>
          </div>

          {/* Don'ts */}
          <div className="glass-panel p-6 border-l-4" style={{ borderLeftColor: '#ef4444' }}>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4" style={{ color: '#ef4444' }}>
              <ShieldAlert size={22} />
              Brand Guideline: Don'ts
            </h3>
            <div className="flex flex-col gap-3">
              {brandGuidelines.dontList.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span style={{ color: '#ef4444', marginTop: '3px' }}>✘</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)]">
              <strong style={{ fontSize: '0.85rem', color: '#ef4444' }}>Critical Notice:</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Asmita Gruh Udhyog manufactures spiritual items. Respect and spiritual devotion must shine in every piece of media we generate.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
