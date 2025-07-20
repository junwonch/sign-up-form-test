import React from 'react';

type Props = { data: any[] };

export default function CalendarView({ data }: Props) {
  // Group availabilities by date (YYYY-MM-DD)
  const days: Record<string, { name: string; instrument: string; start: string; end: string }[]> = {};
  data.forEach(p => {
    (p.availabilities || []).forEach((a: any) => {
      const day = a.start.slice(0, 10) || new Date(a.start).toISOString().slice(0, 10);
      if (!days[day]) days[day] = [];
      days[day].push({
        name: p.name,
        instrument: (p.instrument || []).join(', '),
        start: new Date(a.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end: new Date(a.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    });
  });
  const sortedDays = Object.keys(days).sort();
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📅</span>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Week View Calendar
        </h3>
        <p className="text-gray-600">All musician availabilities organized by date</p>
      </div>
      
      {sortedDays.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-gray-500 text-lg">No availabilities scheduled yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDays.map(day => (
            <div key={day} className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-xl text-purple-800 flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date(day).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h4>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {days[day].length} slot{days[day].length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-3">
                {days[day].map((slot, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-purple-800 flex items-center">
                        <span className="mr-2">🎤</span>
                        {slot.name}
                      </h5>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">🎼</span> {slot.instrument}
                    </div>
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-2 border border-yellow-200">
                      <div className="text-xs font-semibold text-yellow-800 flex items-center">
                        <span className="mr-1">⏰</span>
                        {slot.start} - {slot.end}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 