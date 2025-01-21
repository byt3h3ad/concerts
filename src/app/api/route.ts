import { fetchSpotifyEvents } from "@/lib/spotify";

export async function GET() {
  const events = await fetchSpotifyEvents();
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
  return Response.json({ events: orderedEvents });
}
