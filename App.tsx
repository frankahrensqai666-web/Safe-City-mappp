
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Map } from './components/Map';
import { Dashboard } from './components/Dashboard';
import { MyReports } from './components/MyReports';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { Testimonials } from './components/Testimonials';
import { Toast } from './components/Toast';
import type { MarkerData, Category, Coords, Status } from './types';
import { INITIAL_MARKERS, CATEGORIES, DISTRICT_BOUNDS } from './constants';

export type AppView = 'map' | 'dashboard' | 'my-reports' | 'admin' | 'login';
export type UserRole = 'admin' | 'user' | 'none';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('map');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [markers, setMarkers] = useState<MarkerData[]>(INITIAL_MARKERS);
  const [activeFilters, setActiveFilters] = useState<Category[]>(CATEGORIES.map(c => c.name));
  const [mapCenter, setMapCenter] = useState<Coords>(DISTRICT_BOUNDS.center);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [userRole, setUserRole] = useState<UserRole>('none');
  
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0].name);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
  
  const geocodeTimeoutRef = useRef<number | null>(null);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleFilterToggle = useCallback((category: Category) => {
    setActiveFilters(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleAddMarker = useCallback(() => {
    if (!address) {
        setToastMessage('Адрес не указан');
        setTimeout(() => setToastMessage(''), 3000);
        return;
    }
    const newMarker: MarkerData = {
      id: Date.now(),
      coords: mapCenter,
      category: selectedCategory,
      title: address,
      description: description || 'Описание не предоставлено пользователем.',
      author: 'Вы',
      date: new Date().toLocaleDateString('ru-RU'),
      avatar: `https://i.pravatar.cc/40?u=user-me`,
      image: selectedImage,
      status: 'на модерации'
    };
    setMarkers(prev => [newMarker, ...prev]);
    setToastMessage('Ваша отметка добавлена и отправлена на модерацию');
    setTimeout(() => setToastMessage(''), 4000);
    setAddress('');
    setDescription('');
    setSelectedImage(undefined);
    setIsTyping(false);
  }, [address, description, mapCenter, selectedCategory, selectedImage]);

  const handleUpdateStatus = useCallback((id: number, newStatus: Status) => {
    setMarkers(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    setToastMessage(`Статус обновлен на "${newStatus}"`);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const handleDeleteMarker = useCallback((id: number) => {
    setMarkers(prev => prev.filter(m => m.id !== id));
    setToastMessage('Обращение удалено');
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const handleLogin = useCallback((role: UserRole) => {
    setUserRole(role);
    setView(role === 'admin' ? 'admin' : 'map');
    setToastMessage(role === 'admin' ? 'Вход выполнен как администратор' : 'Добро пожаловать в Safe City Map');
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const handleMapBoundsChange = useCallback((coords: Coords) => {
    setMapCenter(coords);
    if (isTyping) return;
    if (geocodeTimeoutRef.current) clearTimeout(geocodeTimeoutRef.current);
    geocodeTimeoutRef.current = window.setTimeout(() => {
        if (window.ymaps) {
            window.ymaps.ready(() => {
                window.ymaps.geocode(coords).then((res: any) => {
                    const firstGeoObject = res.geoObjects.get(0);
                    if (firstGeoObject && !isTyping) {
                        const newAddress = firstGeoObject.getAddressLine();
                        setAddress(newAddress);
                    }
                });
            });
        }
    }, 400);
  }, [isTyping]);

  const filteredMarkers = useMemo(() => {
    return markers.filter(marker => activeFilters.includes(marker.category));
  }, [markers, activeFilters]);

  const userMarkers = useMemo(() => {
    return markers.filter(marker => marker.author === 'Вы');
  }, [markers]);

  // Если пользователь не авторизован, принудительно показываем экран логина
  if (userRole === 'none') {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
        <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
        <Toast message={toastMessage} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F5F7FA] text-slate-800'}`}>
      <div className="max-w-screen-xl mx-auto space-y-6">
        <Header 
            onReportProblemClick={() => { setView('map'); }} 
            currentView={view} 
            onViewChange={setView} 
            userRole={userRole}
            onLogout={() => { setUserRole('none'); setView('login'); }}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
        />

        <main className="min-h-[500px]">
          {view === 'map' && (
            <div className="flex flex-col lg:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500">
              <Sidebar
                activeFilters={activeFilters}
                onFilterToggle={handleFilterToggle}
                onAddMarker={handleAddMarker}
                setMapCenter={setMapCenter}
                address={address}
                setAddress={setAddress}
                description={description}
                setDescription={setDescription}
                onAddressFocus={() => setIsTyping(true)}
                onAddressBlur={() => setIsTyping(false)}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
                isDarkMode={isDarkMode}
              />
              <div className="flex-grow w-full lg:w-[60%] h-[500px] lg:h-[600px]">
                <Map 
                  center={mapCenter} 
                  markers={filteredMarkers} 
                  onBoundsChange={handleMapBoundsChange}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          )}
          {view === 'dashboard' && <Dashboard isDarkMode={isDarkMode} />}
          {view === 'my-reports' && <MyReports reports={userMarkers} isDarkMode={isDarkMode} />}
          {view === 'admin' && userRole === 'admin' && (
            <AdminPanel 
              markers={markers} 
              onUpdateStatus={handleUpdateStatus} 
              onDelete={handleDeleteMarker} 
              isDarkMode={isDarkMode}
            />
          )}
        </main>

        <Testimonials isDarkMode={isDarkMode} />
        
        <footer className={`text-center text-[10px] py-8 border-t transition-colors ${isDarkMode ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-200'}`}>
          <div className="flex justify-center gap-4 mb-2 font-bold tracking-widest">
            <span>SAFE CITY MAP © 2025</span>
          </div>
          ДАННЫЕ СИНХРОНИЗИРОВАНЫ С ГИС ЖКХ РАЙОНА ТЁПЛЫЙ СТАН.
        </footer>
      </div>
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
