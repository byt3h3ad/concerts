import { LOCATIONS } from "@/lib/config";
import { eventsFetcher } from "@/lib/utils";

export async function GET() {
  const events = await eventsFetcher(
    LOCATIONS.Gurgaon.geoHash,
    LOCATIONS.Gurgaon.geonameId
  );
  return Response.json({ events });
}
