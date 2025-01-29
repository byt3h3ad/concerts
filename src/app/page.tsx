import { cities } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid items-center justify-center gap-6 min-h-screen p-8">
      <section className="grid gap-6 text-zinc-400 ">
        <h1 className="text-zinc-300 text-xl py-6">Index</h1>
        {cities.map((city, index: number) => (
          <Link
            key={index}
            href={city}
            className="capitalize hover:underline underline-offset-4 hover:text-zinc-100 transition-all duration-300"
          >
            {city}
          </Link>
        ))}
      </section>
    </div>
  );
}
