import React, { useState } from 'react';
import { isOverlap } from '../lib/utils/availability';

const INSTRUMENTS = [
  'Piano', 'Guitar', 'Bass', 'Drums', 'Vocals', 'Saxophone', 'Violin', 'Cello', 'Trumpet', 'Other',
];

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
    <form id="signup" className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded shadow p-6 mt-8" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Sign Up / Update Availability</h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <label className="block mb-2">Name*<input name="name" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" value={form.name} onChange={handleChange} required /></label>
      <label className="block mb-2">Email*<input name="email" type="email" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" value={form.email} onChange={handleChange} required /></label>
      <div className="mb-2">
        <div className="mb-1">Instrument(s)*</div>
        <div className="flex flex-wrap gap-2">
          {INSTRUMENTS.map(i => (
            <button type="button" key={i} onClick={() => handleInstrument(i)}
              className={`px-3 py-1 rounded border ${form.instrument.includes(i) ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>{i}</button>
          ))}
        </div>
      </div>
      <label className="block mb-2">Notes<textarea name="notes" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" value={form.notes} onChange={handleChange} /></label>
      <div className="mb-2">
        <div className="mb-1">Add Availability Slot*</div>
        <div className="flex gap-2 mb-2">
          <input type="datetime-local" name="start" value={form.slot.start} onChange={handleSlotChange} className="p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <input type="datetime-local" name="end" value={form.slot.end} onChange={handleSlotChange} className="p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <button type="button" onClick={addSlot} className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
        </div>
        <ul>
          {form.availabilities.map((a: any, i: number) => (
            <li key={i} className="flex items-center gap-2 mb-1">
              <span>{a.start.toLocaleString?.() || a.start} - {a.end.toLocaleString?.() || a.end}</span>
              <button type="button" onClick={() => removeSlot(i)} className="text-red-600">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4" disabled={loading}>{loading ? 'Saving...' : 'Submit'}</button>
    </form>
  );
} 