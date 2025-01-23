import { ConcertCard } from "@/components/concert-card";
import { VenueEvent } from "@/lib/types";
import { eventsFetcher } from "@/lib/utils";

export default async function Home() {
  const events = await eventsFetcher();
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-8 bg-black">
      <h1 className="text-zinc-300 text-xl">Concerts in Bengaluru</h1>
      <section className="gap-6 grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: VenueEvent, index: number) => (
          <ConcertCard key={index} {...event} />
        ))}
      </section>
    </div>
  );
}
