import { LOCATIONS } from "@/lib/config";
import { eventsFetcher } from "@/lib/utils";

export async function GET() {
  const events = await eventsFetcher(
    LOCATIONS.Hyderabad.geoHash,
    LOCATIONS.Hyderabad.geonameId
  );
  return Response.json({ events });
}
