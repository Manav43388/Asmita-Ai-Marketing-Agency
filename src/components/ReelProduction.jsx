import React, { useState } from 'react';
import { Camera, CheckSquare, Layers, Volume2, AlertCircle } from 'lucide-react';

export default function ReelProduction() {
  const [productionType, setProductionType] = useState('b2b');

  return (
    <div className="grid-layout-1-1">
      
      {/* Recording Gear & Setup Checklist */}
      <div className="flex flex-col gap-6">
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
            <Camera size={22} />
            Smartphone Recording Checklist
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            You do NOT need expensive cameras. Asmita Gruh Udhyog operates on real-world raw marketing. Follow this setup checklist:
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-start gap-3 p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[var(--border-gold)]">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Clean Your Lens</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Always wipe your phone camera lens with a soft micro-fiber cloth before hitting record to remove fingerprint oil spots.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[var(--border-gold)]">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Use Natural Sunlight</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Position your recording table next to a window. Side-lighting from the window highlights incense smoke beautifully.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[var(--border-gold)]">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Lock Focus & Exposure</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tap and hold on the screen to lock exposure. This stops your phone from shifting brightness during close-up shots of rising smoke.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[var(--border-gold)]">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Set to 1080p @ 60fps</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Change camera settings to 60fps (Frames Per Second). This enables you to slow down the clip in edit to make the smoke look magical.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Editing Directions */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--saffron)' }}>
            <Layers size={22} />
            Post-Production / Editing Guides
          </h3>
          
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded border border-[rgba(242,101,34,0.15)] bg-[rgba(242,101,34,0.02)]">
              <strong style={{ fontSize: '0.85rem', color: 'var(--saffron)' }}>Video Transitions:</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Use clean cuts. Avoid heavy spinning or flash transitions. The best transitions are matching motions (e.g. lighting a stick cuts to showing smoke in another room).
              </p>
            </div>
            
            <div className="p-3 rounded border border-[rgba(242,101,34,0.15)] bg-[rgba(242,101,34,0.02)]">
              <strong style={{ fontSize: '0.85rem', color: 'var(--saffron)' }}>Audio Volume Adjustments:</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                If you are doing a voiceover, keep the background music/chant volume at 6-8% in Instagram/CapCut, ensuring your voice is crisp and audible.
              </p>
            </div>

            <div className="p-3 rounded border border-[rgba(242,101,34,0.15)] bg-[rgba(242,101,34,0.02)]">
              <strong style={{ fontSize: '0.85rem', color: 'var(--saffron)' }}>Text Overlays:</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Place hook text in the center-top area of the screen. Keep it safe from the Instagram title block at the bottom and icon block on the right.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Mode & Shot Lists */}
      <div className="glass-panel p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CheckSquare size={22} color="var(--primary)" />
            Shot List Blueprint
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setProductionType('b2b')}
              className={`btn-secondary py-1 px-3 text-xs ${productionType === 'b2b' ? 'active' : ''}`}
              style={productionType === 'b2b' ? {borderColor: 'var(--primary)', color: 'var(--text-primary)'} : {}}
            >
              Wholesale (B2B)
            </button>
            <button 
              onClick={() => setProductionType('b2c')}
              className={`btn-secondary py-1 px-3 text-xs ${productionType === 'b2c' ? 'active' : ''}`}
              style={productionType === 'b2c' ? {borderColor: 'var(--primary)', color: 'var(--text-primary)'} : {}}
            >
              Spiritual (B2C)
            </button>
          </div>
        </div>

        {productionType === 'b2b' ? (
          <div className="flex flex-col gap-4 mt-2">
            <div className="p-4 rounded bg-[rgba(255,255,255,0.01)] border-l-4 border-l-[var(--primary)] flex flex-col gap-2">
              <strong style={{ color: 'var(--text-primary)' }}>Scene 1: The B2B Wholesale Hook (0 - 3s)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Visual:</strong> Slow-motion shot of wholesale cardboard cartons being stacked. A packing label reading "Surat, Gujarat" is clearly stuck on top.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Angle: Eye Level, static tripod shot.</span>
            </div>

            <div className="p-4 rounded bg-[rgba(255,255,255,0.01)] border-l-4 border-l-[var(--primary)] flex flex-col gap-2">
              <strong style={{ color: 'var(--text-primary)' }}>Scene 2: Inside the Factory (3 - 10s)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Visual:</strong> Close-up tracking shot of raw materials (natural gums, sandalwood powders, bamboo sticks). Slide transition into packaging workers boxing the Rose Premium packs.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Angle: Close-up macro tracking, hand-held.</span>
            </div>

            <div className="p-4 rounded bg-[rgba(255,255,255,0.01)] border-l-4 border-l-[var(--primary)] flex flex-col gap-2">
              <strong style={{ color: 'var(--text-primary)' }}>Scene 3: Direct Factory Pricing (10 - 15s)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Visual:</strong> Hands typing on WhatsApp to order, close up on the screen (displays bulk list prices). Cut to the shipping labels.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Angle: POV over-the-shoulder.</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            <div className="p-4 rounded bg-[rgba(255,255,255,0.01)] border-l-4 border-l-[var(--saffron)] flex flex-col gap-2">
              <strong style={{ color: 'var(--text-primary)' }}>Scene 1: Lighting the Stick (0 - 3s)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Visual:</strong> Macro close-up of a match stick lighting Gugal Dhoop. Flame flares, glows orange, then blown out to leave rising white smoke rings.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Angle: Extreme close-up (Macro lens or zoom), backlit.</span>
            </div>

            <div className="p-4 rounded bg-[rgba(255,255,255,0.01)] border-l-4 border-l-[var(--saffron)] flex flex-col gap-2">
              <strong style={{ color: 'var(--text-primary)' }}>Scene 2: Pooja Room Ambiance (3 - 10s)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Visual:</strong> A clean, well-lit pooja plate containing copper vessels, flowers, and the burning incense stick. Smoke trails float upward into beautiful sunbeams.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Angle: Medium shot, slow pan left.</span>
            </div>

            <div className="p-4 rounded bg-[rgba(255,255,255,0.01)] border-l-4 border-l-[var(--saffron)] flex flex-col gap-2">
              <strong style={{ color: 'var(--text-primary)' }}>Scene 3: Peace & Wellness CTA (10 - 15s)</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Visual:</strong> A family member sitting in meditation. Slowly fades into showing the Asmita logo and contact information.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Angle: Wide shot, slow zoom out.</span>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 rounded-lg bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.15)] flex items-start gap-2">
          <Volume2 size={24} className="mt-0.5" style={{ color: 'var(--primary)' }} />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <strong>Director's Tip:</strong> Natural audio (the striking of a match, the rustling of boxes, the soft wind) makes Reels feel 3x more authentic and raises retention. Don't mute these sounds; blend them under the audio chant.
          </p>
        </div>
      </div>

    </div>
  );
}
