import { fetchSpotifyEvents } from "./spotify";
import { VenueEvent } from "./types";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    // year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", // GMT+5:30
  };
  return date.toLocaleString("en-US", options);
}

export async function eventsFetcher(
  hash: string,
  id: string
): Promise<VenueEvent[]> {
  const events = await fetchSpotifyEvents(hash, id);
  const orderedEvents = events
    .flat()
    .toSorted((a, b) => a.showTime.getTime() - b.showTime.getTime());
  for (let i = 1; i < orderedEvents.length; i++) {
    const [prev, current] = [orderedEvents[i - 1], orderedEvents[i]];
    if (
      prev.venue === current.venue &&
      prev.showTime.getTime() === current.showTime.getTime() &&
      (prev.artist.includes(current.artist) ||
        current.artist.includes(prev.artist))
    ) {
      orderedEvents.splice(i, 1);
      i--;
    }
  }
  return orderedEvents;
}
