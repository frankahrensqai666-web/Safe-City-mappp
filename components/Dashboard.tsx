
import React from 'react';
import { DASHBOARD_STATS } from '../constants';

interface DashboardProps {
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const cardClasses = `backdrop-blur-lg border p-6 rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white/40 border-white/30'}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Всего заявок', value: DASHBOARD_STATS.totalReports, color: isDarkMode ? 'text-blue-400' : 'text-blue-600' },
          { label: 'Решено', value: DASHBOARD_STATS.resolved, color: isDarkMode ? 'text-green-400' : 'text-green-600' },
          { label: 'В работе', value: DASHBOARD_STATS.inProgress, color: isDarkMode ? 'text-orange-400' : 'text-orange-600' },
          { label: 'Ср. время', value: DASHBOARD_STATS.responseTime, color: isDarkMode ? 'text-purple-400' : 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className={`backdrop-blur-lg border p-5 rounded-xl shadow-sm transition-all ${isDarkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white/40 border-white/30'}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
            <p className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className={`lg:col-span-2 ${cardClasses}`}>
        <h3 className={`text-lg font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Распределение</h3>
        <div className="space-y-6">
          {DASHBOARD_STATS.categoryStats.map((cat, i) => {
            const percentage = Math.round((cat.count / DASHBOARD_STATS.totalReports) * 100);
            return (
              <div key={i}>
                <div className="flex justify-between items-end mb-2">
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{cat.name}</span>
                  <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{cat.count} шт. ({percentage}%)</span>
                </div>
                <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200/50'}`}>
                  <div 
                    className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.3)]" 
                    style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={cardClasses}>
        <h3 className={`text-lg font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Статус пилота</h3>
        <div className="space-y-4">
          <div className={`p-4 border rounded-lg ${isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-500/10 border-green-500/20'}`}>
            <p className={`text-sm font-black uppercase tracking-tighter ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Тёплый Стан: Активен</p>
            <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-green-600'}`}>Система запущена в полномасштабном режиме. Данные мониторинга обновляются каждые 5 минут.</p>
          </div>
          <div className={`p-4 rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-200/30 border-transparent'}`}>
            <h4 className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Топ локаций</h4>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                { name: 'ул. Тёплый Стан', count: 12 },
                { name: 'ул. Профсоюзная', count: 9 },
                { name: 'Метро Тёплый Стан', count: 7 }
              ].map((loc, i) => (
                <li key={i} className="flex justify-between items-center group">
                  <span className={isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-600'}>{loc.name}</span> 
                  <span className={`font-black px-2 py-0.5 rounded ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-white text-slate-800 shadow-sm'}`}>{loc.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center pt-2">
            <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Обновлено: Сегодня, 12:45</p>
          </div>
        </div>
      </div>
    </div>
  );
};
