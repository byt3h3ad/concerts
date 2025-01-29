import { LOCATIONS } from "@/lib/config";
import { eventsFetcher } from "@/lib/utils";

export async function GET() {
  const events = await eventsFetcher(
    LOCATIONS.Bangalore.geoHash,
    LOCATIONS.Bangalore.geonameId
  );
  return Response.json({ events });
}
