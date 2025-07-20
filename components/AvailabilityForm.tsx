import React, { useState } from 'react';
import { isOverlap } from '../lib/utils/availability';

const INSTRUMENTS = [
  'Piano', 'Guitar', 'Bass', 'Drums', 'Vocals', 'Saxophone', 'Violin', 'Cello', 'Trumpet', 'Other',
];

const INSTRUMENT_ICONS: Record<string, string> = {
  'Piano': '🎹',
  'Guitar': '🎸',
  'Bass': '🎸',
  'Drums': '🥁',
  'Vocals': '🎤',
  'Saxophone': '🎷',
  'Violin': '🎻',
  'Cello': '🎻',
  'Trumpet': '🎺',
  'Other': '🎵',
};

export default function AvailabilityForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    instrument: [],
    notes: '',
    availabilities: [],
    slot: { start: '', end: '' },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleInstrument(i: string) {
    setForm(f => ({ ...f, instrument: f.instrument.includes(i) ? f.instrument.filter(x => x !== i) : [...f.instrument, i] }));
  }
  function handleSlotChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, slot: { ...f.slot, [e.target.name]: e.target.value } }));
  }
  function addSlot() {
    const { start, end } = form.slot;
    if (!start || !end) return setError('Select start and end time');
    const newSlot = { start: new Date(start), end: new Date(end) };
    if (newSlot.start >= newSlot.end) return setError('End must be after start');
    if (form.availabilities.some((a: any) => isOverlap(a, newSlot))) return setError('Slot overlaps with existing');
    setForm(f => ({ ...f, availabilities: [...f.availabilities, newSlot], slot: { start: '', end: '' } }));
    setError('');
  }
  function removeSlot(idx: number) {
    setForm(f => ({ ...f, availabilities: f.availabilities.filter((_, i) => i !== idx) }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.name || !form.email || !form.instrument.length || !form.availabilities.length) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          instrument: form.instrument,
          notes: form.notes,
          availabilities: form.availabilities,
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSuccess('Saved! Check your email for a magic link to update.');
    } catch {
      setError('Failed to save');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <form id="signup" className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20" onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎵</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Sign Up / Update Availability
          </h2>
          <p className="text-gray-600">Tell us about your musical talents and when you're available to perform!</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center">
            <span className="mr-2">✅</span>
            {success}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">👤 Name *</label>
              <input 
                name="name" 
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all" 
                value={form.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">📧 Email *</label>
              <input 
                name="email" 
                type="email" 
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">🎼 Instrument(s) *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INSTRUMENTS.map(i => (
                <button 
                  type="button" 
                  key={i} 
                  onClick={() => handleInstrument(i)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                    form.instrument.includes(i) 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg transform scale-105' 
                      : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <span className="mr-2">{INSTRUMENT_ICONS[i]}</span>
                  {i}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Notes</label>
            <textarea 
              name="notes" 
              className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all resize-none" 
              rows={3}
              value={form.notes} 
              onChange={handleChange} 
              placeholder="Any preferences, special requests, or additional information..."
            />
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">⏰ Add Availability Slot *</label>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <input 
                type="datetime-local" 
                name="start" 
                value={form.slot.start} 
                onChange={handleSlotChange} 
                className="p-3 rounded-xl bg-white border border-yellow-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all" 
              />
              <input 
                type="datetime-local" 
                name="end" 
                value={form.slot.end} 
                onChange={handleSlotChange} 
                className="p-3 rounded-xl bg-white border border-yellow-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all" 
              />
              <button 
                type="button" 
                onClick={addSlot} 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ➕ Add Slot
              </button>
            </div>
            {form.availabilities.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Your Available Times:</h4>
                {form.availabilities.map((a: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-yellow-200">
                    <span className="text-sm">
                      📅 {a.start.toLocaleString?.() || a.start} - {a.end.toLocaleString?.() || a.end}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => removeSlot(i)} 
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 text-lg mt-8" 
          disabled={loading}
        >
          {loading ? '⏳ Saving...' : '🚀 Submit Availability'}
        </button>
      </form>
    </div>
  );
}
