
import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { Category, Coords, Suggestion } from '../types';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  activeFilters: Category[];
  onFilterToggle: (category: Category) => void;
  onAddMarker: () => void;
  setMapCenter: (coords: Coords) => void;
  address: string;
  setAddress: (address: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onAddressFocus: () => void;
  onAddressBlur: () => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  selectedImage?: string;
  onImageSelect: (image?: string) => void;
  isDarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeFilters,
  onFilterToggle,
  onAddMarker,
  setMapCenter,
  address,
  setAddress,
  description,
  setDescription,
  onAddressFocus,
  onAddressBlur,
  selectedCategory,
  onCategoryChange,
  selectedImage,
  onImageSelect,
  isDarkMode
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debounceTimeout = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSuggestions = useCallback((query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    if (window.ymaps) {
        window.ymaps.ready(() => {
          window.ymaps.geocode(query, { results: 5 }).then((res: any) => {
            const geoObjects = res.geoObjects.toArray();
            const newSuggestions: Suggestion[] = geoObjects.map((obj: any) => ({
              name: obj.getAddressLine(),
              description: obj.properties.get('description'),
              coords: obj.geometry.getCoordinates(),
            }));
            setSuggestions(newSuggestions);
          });
        });
    }
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
      if (address) {
        fetchSuggestions(address);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [address, fetchSuggestions]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setAddress(suggestion.name);
    setSuggestions([]);
    setMapCenter(suggestion.coords);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cardClasses = `backdrop-blur-lg border rounded-xl shadow-lg p-6 transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white/40 border-white/30'}`;
  const inputClasses = `w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-500 text-sm ${isDarkMode ? 'bg-slate-800/80 border-slate-700 text-white focus:ring-2 focus:ring-green-500/30 focus:border-green-500' : 'bg-white/50 border-gray-300/50 text-slate-800 focus:ring-2 focus:ring-green-500/50 focus:border-green-500'}`;

  return (
    <aside className="w-full lg:w-[380px] flex-shrink-0 space-y-6">
      <div className={cardClasses}>
        <h2 className="text-lg font-black uppercase tracking-widest mb-4">Фильтры</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(({ name, icon }) => {
            const isActive = activeFilters.includes(name);
            return (
              <button
                key={name}
                onClick={() => onFilterToggle(name)}
                className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'bg-green-600 text-white border-green-700 shadow-md'
                    : isDarkMode 
                      ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700' 
                      : 'bg-white/50 text-slate-700 border-gray-300/50 hover:bg-white/80'
                }`}
              >
                {icon}
                <span className="font-bold text-xs uppercase tracking-tighter">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`${cardClasses} space-y-4`}>
        <h2 className="text-lg font-black uppercase tracking-widest">Новая отметка</h2>
        
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={handleInputChange}
            onFocus={onAddressFocus}
            onBlur={onAddressBlur}
            placeholder="Адрес или метка"
            className={inputClasses}
          />
          {suggestions.length > 0 && (
            <ul className={`absolute z-20 w-full mt-1 backdrop-blur-md border rounded-lg shadow-2xl max-h-48 overflow-y-auto ${isDarkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-gray-200'}`}>
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(s)}
                  className={`px-4 py-2 cursor-pointer border-b last:border-b-0 transition-colors ${isDarkMode ? 'hover:bg-slate-700 border-slate-700' : 'hover:bg-gray-100 border-gray-100'}`}
                >
                  <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{s.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{s.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={`block text-[10px] font-black uppercase mb-1 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Категория
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value as Category)}
                className={inputClasses}
              >
                {CATEGORIES.map(({ name }) => (
                  <option key={name} value={name} className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase mb-1 ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Фотография
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`group cursor-pointer relative w-full h-32 border-2 border-dashed rounded-lg transition-all flex flex-col items-center justify-center overflow-hidden ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white/30 border-gray-300 hover:bg-white/50'}`}
            >
              {selectedImage ? (
                <>
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-black uppercase">Изменить</span>
                  </div>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span className="text-[10px] font-black uppercase text-gray-500">Прикрепить фото</span>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишите проблему..."
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          onClick={onAddMarker}
          disabled={!address}
          className="w-full bg-green-600 text-white font-black py-4 px-4 rounded-lg shadow-xl hover:bg-green-700 active:scale-95 disabled:bg-slate-700 disabled:text-slate-500 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 text-sm uppercase tracking-widest"
        >
          Опубликовать
        </button>

        <div className="pt-4 border-t border-slate-800/20 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Live</span>
            </div>
            <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>v 1.0.5</span>
        </div>
      </div>
    </aside>
  );
};
