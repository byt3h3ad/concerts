import { ConcertCard } from "@/components/concert-card";
import { LOCATIONS, PROD_URL } from "@/lib/config";
import { VenueEvent } from "@/lib/types";
import { eventsFetcher, isValidCity } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: slug,
    openGraph: {
      images: [`${PROD_URL}/api/${slug}/og`, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
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
