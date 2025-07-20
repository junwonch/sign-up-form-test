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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👑</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">Manage and view all musician availabilities</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1">
              <input 
                type="password" 
                placeholder="🔐 Enter admin password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all" 
              />
            </div>
            <button 
              onClick={() => fetchData(false)} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
              disabled={loading}
            >
              {loading ? '⏳ Loading...' : '📊 Load Data'}
            </button>
            <button 
              onClick={() => fetchData(true)} 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              📥 Export CSV
            </button>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center mb-6">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          {data.length > 0 && (
            <div className="overflow-x-auto">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  Participants ({data.length})
                </h3>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <tr>
                        <th className="p-4 text-left font-semibold">👤 Name</th>
                        <th className="p-4 text-left font-semibold">📧 Email</th>
                        <th className="p-4 text-left font-semibold">🎼 Instrument</th>
                        <th className="p-4 text-left font-semibold">📝 Notes</th>
                        <th className="p-4 text-left font-semibold">⏰ Availabilities</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.map((p: any) => (
                        <tr key={p.id} className="hover:bg-purple-50 transition-colors">
                          <td className="p-4 font-semibold text-gray-800">{p.name}</td>
                          <td className="p-4 text-gray-600">{p.email}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {p.instrument?.map((i: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                  {i}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-gray-600 max-w-xs truncate">{p.notes || '-'}</td>
                          <td className="p-4">
                            <div className="space-y-1">
                              {p.availabilities?.map((a: any, i: number) => (
                                <div key={i} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded border border-yellow-200">
                                  📅 {new Date(a.start).toLocaleString()} - {new Date(a.end).toLocaleString()}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {data.length > 0 && <CalendarView data={data} />}
      </div>
    </div>
  );
} 