
import React, { useEffect, useRef, useState } from 'react';
import type { MarkerData, Coords } from '../types';
import { CATEGORY_COLORS, DISTRICT_BOUNDS, STATUS_COLORS } from '../constants';

interface MapProps {
  center: Coords;
  markers: MarkerData[];
  onBoundsChange: (coords: Coords) => void;
  isDarkMode: boolean;
}

export const Map: React.FC<MapProps> = ({ center, markers, onBoundsChange, isDarkMode }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const placemarksCollection = useRef<any>(null);
  const onBoundsChangeRef = useRef(onBoundsChange);

  const isInitialMount = useRef(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    onBoundsChangeRef.current = onBoundsChange;
  }, [onBoundsChange]);

  useEffect(() => {
    if (!mapRef.current) return;
    
    let map: any;
    const initMap = () => {
        if (!window.ymaps) return;
        map = new window.ymaps.Map(mapRef.current!, {
            center: DISTRICT_BOUNDS.center,
            zoom: 14,
            controls: ['zoomControl', 'fullscreenControl'],
            restrictMapArea: DISTRICT_BOUNDS.restrict
        }, {
            minZoom: 13,
            maxZoom: 18
        });
        
        mapInstance.current = map;
        placemarksCollection.current = new window.ymaps.GeoObjectCollection(null, {});
        mapInstance.current.geoObjects.add(placemarksCollection.current);

        map.events.add('actionend', () => {
            const newCenter = map.getCenter();
            onBoundsChangeRef.current(newCenter);
        });
    };

    if (window.ymaps) {
        window.ymaps.ready(initMap);
    }
    
    return () => {
        map?.destroy();
        mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
        const currentCenter = mapInstance.current.getCenter();
        if (currentCenter[0].toFixed(6) !== center[0].toFixed(6) || currentCenter[1].toFixed(6) !== center[1].toFixed(6)) {
            mapInstance.current.setCenter(center, undefined, {
                checkZoomRange: true,
                duration: 500
            });
        }
    }
  }, [center]);

  useEffect(() => {
    const updatePlacemarks = () => {
        if (!placemarksCollection.current || !window.ymaps) return;
        
        placemarksCollection.current.removeAll();

        markers.forEach(marker => {
            const color = CATEGORY_COLORS[marker.category] || '#1E98FF';
            const statusColor = STATUS_COLORS[marker.status];
            const imageHtml = marker.image 
              ? `<img src="${marker.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; border: 1px solid #eee;"/>`
              : '';

            const placemark = new window.ymaps.Placemark(
                marker.coords,
                {
                    balloonContentHeader: `<div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                        <b style="color:#1e293b">${marker.category}</b>
                        <span style="background:${statusColor}; color:white; font-size:9px; padding:2px 6px; border-radius:10px; text-transform:uppercase; font-weight:bold;">${marker.status}</span>
                    </div>`,
                    balloonContentBody: `
                        <div style="font-family: 'Inter', sans-serif; padding: 5px; max-width: 240px; color:#334155">
                            ${imageHtml}
                            <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight:bold;">${marker.title}</h4>
                            <p style="margin-bottom: 8px; font-size: 12px; line-height: 1.4;">${marker.description}</p>
                            <div style="display: flex; align-items: center; border-top: 1px solid #eee; padding-top: 8px;">
                               <img src="${marker.avatar}" width="24" height="24" style="border-radius: 50%; margin-right: 8px;" alt="avatar"/>
                               <div style="font-size: 11px; color: #64748b;">
                                 <b>${marker.author}</b><br/>${marker.date}
                               </div>
                            </div>
                        </div>
                    `,
                },
                {
                    preset: 'islands#dotIcon',
                    iconColor: color
                }
            );
            placemarksCollection.current.add(placemark);
        });
    };
    
    if (isInitialMount.current && window.ymaps) {
      isInitialMount.current = false;
      window.ymaps.ready(updatePlacemarks);
      return;
    }

    setIsFading(true);
    const timer = setTimeout(() => {
      updatePlacemarks();
      setIsFading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [markers]);

  return (
    <div className={`w-full h-full rounded-xl shadow-lg relative overflow-hidden border transition-all duration-500 ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-white/30 bg-white/20'}`}>
      <div 
        ref={mapRef} 
        className={`w-full h-full rounded-xl transition-all duration-500 ${isFading ? 'opacity-50' : 'opacity-100'}`} 
        style={{ 
            filter: isDarkMode ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none',
            background: isDarkMode ? '#1a1d23' : '#e5e7eb'
        }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10" 
        style={{ pointerEvents: 'none' }}
      >
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.4))' }}
        >
          <path 
            d="M16 31C16 31 6 20.3137 6 12C6 6.47715 10.4772 2 16 2C21.5228 2 26 6.47715 26 12C26 20.3137 16 31 16 31Z" 
            fill="#4CAF50" 
            stroke="white" 
            strokeWidth="2"
          />
          <circle cx="16" cy="12" r="4" fill="white"/>
        </svg>
      </div>

      <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-black shadow-sm border uppercase tracking-widest z-10 transition-colors ${isDarkMode ? 'bg-slate-900/80 text-slate-100 border-slate-700' : 'bg-white/70 text-slate-800 border-white/20'}`}>
          Район: Тёплый Стан
      </div>
    </div>
  );
};
