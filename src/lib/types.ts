import { LOCATIONS } from "./config";

export interface VenueEvent {
  venue: string;
  artist: string;
  opener: string | null;
  tour: string | null;
  showTime: Date;
  isOnlyDateKnown?: boolean;
  thumbnailUrl: string | null;
  url: string;
}

export type CityName = keyof typeof LOCATIONS;
