/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONCERT_FEED } from "./config";
import { commonHeaders, getValidAccessToken } from "./spotify-auth";
import { VenueEvent } from "./types";

async function pathfinderQuery(
  operationName: string,
  queryHash: string,
  variables: Record<string, any>
): Promise<any> {
  const accessToken = await getValidAccessToken();

  const params = new URLSearchParams();
  params.set("operationName", operationName);
  params.set("variables", JSON.stringify(variables));
  params.set(
    "extensions",
    JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash: queryHash,
      },
    })
  );

  const url =
    "https://api-partner.spotify.com/pathfinder/v1/query?" + params.toString();

  const res = await fetch(url, {
    headers: {
      ...commonHeaders,
      authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  if (res.status !== 200)
    throw new Error(`Status code ${res.status}: ${await res.text()}`);

  return await res.json();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchSpotifyEventUrl(
  uri: `spotify:concert:${string}`
): Promise<string> {
  const json = await pathfinderQuery(
    "concert",
    "b13f195349f188fee25480ae889d782852d68663bf07743c654244454750d681",
    { uri }
  );

  return (
    json.data.concert.offers.items[0]?.url ??
    `https://open.spotify.com/concert/${uri.split(":").at(-1)}`
  );
}

export async function fetchSpotifyEvents(
  hash: string,
  id: string
): Promise<VenueEvent[]> {
  console.log("Fetching all Spotify events");

  const json = await pathfinderQuery("concertFeed", CONCERT_FEED.key, {
    geoHash: hash,
    geonameId: id,
    dateRange: null,
    conceptUris: null,
    paginationKey: null,
  });

  const concerts = json.data.liveEventsFeed.sections
    .flatMap((section: any) => {
      if (section.__typename === "LiveEventSection") {
        return section.concerts;
      } else if (section.__typename === "AllEvents") {
        return section.sections.flatMap((section: any) => section.concerts);
      } else {
        throw new Error(`Unknown section type: ${section.__typename}`);
      }
    })
    .flatMap((concert: any) => {
      if (concert.__typename === "ConcertV2ResponseWrapper") {
        return concert.data;
      } else if (concert.__typename === "ConcertGroup") {
        return concert.concerts.flatMap((concert: any) => concert.data);
      } else {
        throw new Error(`Unknown concert type: ${concert.__typename}`);
      }
    });

  const events: VenueEvent[] = [];

  let i = 0;
  for (const concert of concerts) {
    const artistNames = concert.artists.items.map(
      (artist: any) => artist.data.profile.name
    );

    console.log(`(Event ${++i}/${concerts.length}: ${artistNames.join(", ")})`);

    events.push({
      venue: concert.location.name,
      artist: artistNames[0],
      opener: artistNames.length <= 1 ? null : artistNames.slice(1).join(", "),
      tour:
        concert.title === artistNames.join(", ") || concert.title.length > 50
          ? null
          : concert.title,
      showTime: new Date(concert.startDateIsoString),
      thumbnailUrl:
        concert.artists.items[0].data.visuals.avatarImage?.sources[0].url ??
        null,
      url: `https://open.spotify.com/concert/${concert.uri.split(":").at(-1)}`,
    });
  }

  return events;
}
