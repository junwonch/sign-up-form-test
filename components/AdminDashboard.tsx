import React, { useState } from 'react';
import CalendarView from './CalendarView';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchData(csv = false) {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin' + (csv ? '?csv=1' : ''), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Unauthorized or error');
      if (csv) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'participants.csv';
        a.click();
        return;
      }
      setData(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4 flex gap-2 items-center">
        <input type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded bg-gray-100 dark:bg-gray-700" />
        <button onClick={() => fetchData(false)} className="bg-blue-600 text-white px-4 py-2 rounded">Load</button>
        <button onClick={() => fetchData(true)} className="bg-green-600 text-white px-4 py-2 rounded">Export CSV</button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Instrument</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Availabilities</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p: any) => (
              <tr key={p.id}>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.email}</td>
                <td className="p-2">{p.instrument?.join(', ')}</td>
                <td className="p-2">{p.notes}</td>
                <td className="p-2">
                  <ul>
                    {p.availabilities?.map((a: any, i: number) => (
                      <li key={i}>{new Date(a.start).toLocaleString()} - {new Date(a.end).toLocaleString()}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CalendarView data={data} />
    </div>
  );
} 