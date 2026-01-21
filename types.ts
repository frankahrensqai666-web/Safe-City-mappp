
export type Category = 'Освещение' | 'Дороги/ямы' | 'Переходы' | 'Транспорт' | 'Двор';

export type Status = 'на модерации' | 'принято' | 'решено';

export type Coords = [number, number];

export interface MarkerData {
  id: number;
  coords: Coords;
  category: Category;
  title: string;
  description: string;
  author: string;
  date: string;
  avatar: string;
  image?: string;
  status: Status;
}

export interface Suggestion {
  name: string;
  description: string;
  coords: Coords;
}

// Declare ymaps on window for TypeScript
declare global {
  interface Window {
    ymaps: any;
  }
}
