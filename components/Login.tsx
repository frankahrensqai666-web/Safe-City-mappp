
import React, { useState } from 'react';
import { UserRole } from '../App';
import { LOGO_SVG_DATA_URL } from '../constants';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isDarkMode: boolean;
}

export const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'admin' && password === '12345') {
      onLogin('admin');
    } else if (login === 'user' && password === '12345') {
      onLogin('user');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const handleQuickLogin = (role: 'user' | 'admin') => {
    setLogin(role);
    setPassword('12345');
    setError('');
  };

  const cardClasses = `max-w-md w-full p-8 backdrop-blur-xl border rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500 transition-all ${isDarkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/40 border-white/40'}`;
  const labelClasses = `block text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`;
  const inputClasses = `w-full px-5 py-3 border rounded-2xl outline-none transition-all font-bold placeholder:text-slate-500 ${isDarkMode ? 'bg-slate-800/60 border-slate-700 text-white focus:ring-4 focus:ring-green-500/20 focus:border-green-500' : 'bg-white/60 border-slate-200 text-slate-900 focus:ring-4 focus:ring-green-500/20 focus:border-green-500'}`;

  return (
    <div className={cardClasses}>
      <div className="text-center mb-8">
        <img src={LOGO_SVG_DATA_URL} alt="Logo" className="block w-20 h-20 mx-auto mb-4 drop-shadow-xl" />
        <h2 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Вход в систему</h2>
        <p className={`text-sm mt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Для использования карты необходимо авторизоваться</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className={labelClasses}>Логин</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className={inputClasses}
            placeholder="Введите логин"
          />
        </div>
        <div className="space-y-1">
          <label className={labelClasses}>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs font-black text-center animate-bounce">{error}</p>
        )}

        <button
          type="submit"
          className={`w-full font-black py-4 px-6 rounded-2xl shadow-xl active:scale-95 transition-all duration-300 text-sm uppercase tracking-widest ${isDarkMode ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-800 text-white hover:bg-slate-900'}`}
        >
          Войти
        </button>
      </form>

      <div className={`mt-10 pt-8 border-t transition-colors ${isDarkMode ? 'border-slate-800' : 'border-slate-200/50'}`}>
        <p className={`text-center text-[10px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Быстрый вход для теста</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleQuickLogin('user')}
            className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-black py-3 px-4 rounded-xl uppercase tracking-widest shadow-lg shadow-green-500/20 transition-all active:scale-95"
          >
            Пользователь
          </button>
          <button
            onClick={() => handleQuickLogin('admin')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black py-3 px-4 rounded-xl uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Администратор
          </button>
        </div>
      </div>
    </div>
  );
};
