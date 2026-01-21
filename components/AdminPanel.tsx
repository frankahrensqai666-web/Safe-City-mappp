
import React from 'react';
import type { MarkerData, Status } from '../types';
import { STATUS_COLORS } from '../constants';

interface AdminPanelProps {
  markers: MarkerData[];
  onUpdateStatus: (id: number, newStatus: Status) => void;
  onDelete: (id: number) => void;
  isDarkMode: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ markers, onUpdateStatus, onDelete, isDarkMode }) => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Панель управления</h2>
        <div className="flex gap-4">
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                Всего: {markers.length}
            </span>
            <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                Очередь: {markers.filter(m => m.status === 'на модерации').length}
            </span>
        </div>
      </div>

      <div className={`backdrop-blur-lg border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white/40 border-white/30'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[10px] uppercase tracking-widest font-black ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-800/90 text-white'}`}>
                <th className="px-6 py-5">Превью</th>
                <th className="px-6 py-5">Объект / Адрес</th>
                <th className="px-6 py-5">Категория</th>
                <th className="px-6 py-5">Автор</th>
                <th className="px-6 py-5">Статус</th>
                <th className="px-6 py-5 text-right">Удалить</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
              {markers.map((m) => (
                <tr key={m.id} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-white/50'}`}>
                  <td className="px-6 py-4">
                    <img 
                      src={m.image || 'https://via.placeholder.com/40'} 
                      className={`w-12 h-12 rounded-xl object-cover border transition-colors ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
                      alt="preview"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-black text-sm leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{m.title}</p>
                    <p className={`text-[10px] uppercase mt-1 line-clamp-1 tracking-tighter ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{m.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{m.category}</span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <p className={`font-black uppercase tracking-tighter ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{m.author}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">{m.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={m.status}
                      onChange={(e) => onUpdateStatus(m.id, e.target.value as Status)}
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none focus:ring-4 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500/20' : 'bg-white border-slate-300 text-slate-800 focus:ring-blue-500/20'}`}
                      style={{ 
                        color: STATUS_COLORS[m.status],
                        borderColor: STATUS_COLORS[m.status]
                      }}
                    >
                      <option value="на модерации">На модерации</option>
                      <option value="принято">Принято</option>
                      <option value="решено">Решено</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDelete(m.id)}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${isDarkMode ? 'text-red-400 hover:bg-red-400/10' : 'text-red-500 hover:bg-red-50'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
