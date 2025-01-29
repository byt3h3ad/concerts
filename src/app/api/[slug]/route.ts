import { LOCATIONS } from "@/lib/config";
import { eventsFetcher, isValidCity } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  if (isValidCity(slug)) {
    const { geoHash, geonameId } = LOCATIONS[slug];
    const events = await eventsFetcher(geoHash, geonameId);
    return Response.json({ events }, { status: 200 });
  }
  return Response.json({ message: "Location not found" }, { status: 404 });
}
