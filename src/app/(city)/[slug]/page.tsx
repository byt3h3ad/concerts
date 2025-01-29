import { ConcertCard } from "@/components/concert-card";
import { LOCATIONS } from "@/lib/config";
import { VenueEvent } from "@/lib/types";
import { eventsFetcher, isValidCity } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  if (isValidCity(slug)) {
    const { geoHash, geonameId } = LOCATIONS[slug];
    const events = await eventsFetcher(geoHash, geonameId);
    return (
      <>
        <h1 className="text-zinc-300 text-xl">
          Concerts in <span className="capitalize">{slug}</span>
        </h1>
        <section className="gap-6 grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {events.map((event: VenueEvent, index: number) => (
            <ConcertCard key={index} {...event} />
          ))}
        </section>
      </>
    );
  }
  return <div>My Post: {slug}</div>;
}
