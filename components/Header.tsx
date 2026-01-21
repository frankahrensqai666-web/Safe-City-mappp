
import React from 'react';
import { LOGO_SVG_DATA_URL } from '../constants';
import { AppView, UserRole } from '../App';

interface HeaderProps {
  onReportProblemClick: () => void;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  userRole: UserRole;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onReportProblemClick, 
  currentView, 
  onViewChange, 
  userRole,
  onLogout,
  isDarkMode,
  toggleDarkMode
}) => {
  return (
    <header className={`backdrop-blur-lg border rounded-xl shadow-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-700/50 text-slate-100' : 'bg-white/40 border-white/30 text-slate-800'}`}>
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewChange('map')}>
        <img src={LOGO_SVG_DATA_URL} alt="Safe City Map Logo" className="w-10 h-10" />
        <div>
            <h1 className="text-xl font-bold leading-none">
                Safe City Map <span className="text-[10px] font-bold bg-green-500 text-white px-1.5 py-0.5 rounded ml-1 uppercase">Тёплый Стан</span>
            </h1>
            <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Система мониторинга района</p>
        </div>
      </div>
      
      <div className={`flex p-1 rounded-lg overflow-x-auto max-w-full transition-colors ${isDarkMode ? 'bg-slate-800/80' : 'bg-slate-200/50'}`}>
        {['map', 'dashboard', 'my-reports'].map((view) => (
          <button
              key={view}
              onClick={() => onViewChange(view as AppView)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
                  currentView === view 
                    ? (isDarkMode ? 'bg-slate-700 text-white shadow-lg' : 'bg-white text-slate-800 shadow-sm') 
                    : (isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
              }`}
          >
              {view === 'map' ? 'Карта' : view === 'dashboard' ? 'Аналитика' : 'Мои обращения'}
          </button>
        ))}
        {userRole === 'admin' && (
          <button
              onClick={() => onViewChange('admin')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ml-1 ${
                  currentView === 'admin' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-500 hover:text-blue-400'
              }`}
          >
              Панель управления
          </button>
        )}
      </div>

      <nav className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white/50 text-slate-600 hover:bg-white'}`}
          title={isDarkMode ? 'Светлая тема' : 'Темная тема'}
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          )}
        </button>

        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {userRole === 'admin' ? 'Администратор' : 'Пользователь'}
          </span>
          <button
            onClick={onLogout}
            className="text-xs font-black text-red-500 hover:text-red-600 uppercase transition-colors"
          >
            Выход
          </button>
        </div>
        <button
          onClick={onReportProblemClick}
          className="bg-green-600 text-white font-black px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 active:scale-95 transition-all duration-300 text-sm whitespace-nowrap uppercase tracking-wider"
        >
          Проблема
        </button>
      </nav>
    </header>
  );
};
