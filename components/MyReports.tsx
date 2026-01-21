
import React from 'react';
import type { MarkerData } from '../types';
import { STATUS_COLORS, TEST_IMAGE_PLACEHOLDER } from '../constants';

interface MyReportsProps {
  reports: MarkerData[];
  isDarkMode: boolean;
}

export const MyReports: React.FC<MyReportsProps> = ({ reports, isDarkMode }) => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Мои обращения</h2>
        <span className={`backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border transition-colors ${isDarkMode ? 'bg-slate-900/50 text-slate-400 border-slate-700' : 'bg-white/50 text-slate-600 border-white/30'}`}>
          Итого: {reports.length}
        </span>
      </div>

      {reports.length === 0 ? (
        <div className={`backdrop-blur-lg border border-dashed rounded-3xl p-20 text-center transition-all ${isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white/40 border-slate-300'}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
             <svg className={`w-10 h-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          </div>
          <h3 className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Пусто</h3>
          <p className={`text-sm mt-3 font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Поставьте метку на карте, чтобы зафиксировать проблему.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className={`backdrop-blur-lg border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group ${isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white/40 border-white/30'}`}>
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img 
                  src={report.image || TEST_IMAGE_PLACEHOLDER} 
                  alt={report.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-[9px] font-black px-2 py-1 rounded-md text-white border border-white/10 uppercase tracking-widest">
                        {report.category}
                    </span>
                </div>
                <div className="absolute bottom-3 right-3">
                    <span 
                      className="text-[10px] font-black px-3 py-1 rounded-full text-white shadow-lg uppercase tracking-widest"
                      style={{ backgroundColor: STATUS_COLORS[report.status] }}
                    >
                      {report.status}
                    </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <h4 className={`font-black uppercase tracking-tight line-clamp-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{report.title}</h4>
                </div>
                <p className={`text-sm line-clamp-2 leading-relaxed h-10 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {report.description}
                </p>
                <div className={`pt-4 border-t flex justify-between items-center transition-colors ${isDarkMode ? 'border-slate-800' : 'border-slate-200/50'}`}>
                    <div className="flex items-center gap-2">
                        <img src={report.avatar} alt="Me" className="w-6 h-6 rounded-full border border-white/20" />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Вы • {report.date}</span>
                    </div>
                    <button className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
                        Детали
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
