export interface INavigationItem {
  name: string;
  href: string;
}

export * from './user';
export * from './health';
export * from './diagnosis';
export * from './recommendation';

// 유틸리티 인터페이스
export interface ILocation {
  lat: number;
  lng: number;
}

export interface IDateRange {
  from: Date;
  to: Date;
} 