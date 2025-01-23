import { VenueEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export const ConcertCard: React.FC<VenueEvent> = ({
  venue,
  artist,
  tour,
  showTime,
  thumbnailUrl,
  url,
}) => {
  return (
    <a
      className="flex gap-4 text-zinc-300 border rounded-lg border-zinc-50 p-3 items-center"
      href={url}
      title={tour || artist}
      target="_blank"
    >
      <Image
        src={thumbnailUrl || "/placeholder.png"}
        width={80}
        height={80}
        alt={artist}
        className="rounded aspect-square object-cover size-20"
      />
      <div>
        <p className="">{artist}</p>
        {tour && <p className="text-sm opacity-80">{tour}</p>}
        <p className="text-sm opacity-80">{venue}</p>
        <p className="text-sm opacity-80">{formatDate(showTime.toString())}</p>
      </div>
    </a>
  );
};
