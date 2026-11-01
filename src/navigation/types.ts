import type { NavigatorScreenParams } from '@react-navigation/native';
import type { RequestTarget } from '../api/requests';
import type { Country } from '../shared/countries';
import type { Stay } from '../shared/stay';
import type { TourCategory } from '../shared/types';

export interface SummaryRow {
  label: string;
  value: string;
}

export type HotelsTab = 'search' | 'quote';

export type TabParamList = {
  Home: undefined;
  Hotels: { city?: string; stay?: Stay; tab?: HotelsTab } | undefined;
  Tours: { country?: Country; category?: TourCategory } | undefined;
  Packages: undefined;
  Blog: undefined;
  More: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  HotelDetail: { id: string; city: string; stay: Stay; name?: string };
  Request: {
    title: string;
    target: RequestTarget;
    stay: Stay;
    mode: 'stay' | 'day' | 'fixed';
    summary?: SummaryRow[];
  };
  Confirmation: { id: string; title: string; rows: SummaryRow[] };
  TourDetail: { slug: string };
  PackageDetail: { slug: string };
  Concerts: undefined;
  ConcertDetail: { slug: string };
  Destinations: undefined;
  DestinationDetail: { country: Country };
  Article: { slug: string };
  QatarEvents: undefined;
  Vip: undefined;
  Settings: undefined;
};
