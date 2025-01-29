import { LOCATIONS } from "@/lib/config";
import { eventsFetcher } from "@/lib/utils";

export async function GET() {
  const events = await eventsFetcher(
    LOCATIONS.Delhi.geoHash,
    LOCATIONS.Delhi.geonameId
  );
  return Response.json({ events });
}
