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
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Week View</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedDays.map(day => (
          <div key={day} className="bg-gray-100 dark:bg-gray-700 rounded p-3">
            <div className="font-bold mb-1">{day}</div>
            <ul>
              {days[day].map((slot, i) => (
                <li key={i} className="mb-1">
                  <span className="font-semibold">{slot.name}</span> ({slot.instrument}): {slot.start} - {slot.end}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 