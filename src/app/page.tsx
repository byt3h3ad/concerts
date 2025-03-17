export default function Home() {
  const errorMessage = {
    error: {
      code: 400,
      message: "Unauthorized request",
      extra: {
        _notes:
          "Usage of this endpoint is not permitted under the Spotify Developer Terms and Developer Policy, and applicable law",
      },
    },
  };
  return (
    <div className="grid items-center justify-center gap-6 min-h-screen p-8">
      <section className="grid gap-6 text-zinc-400 ">
        {/* <h1 className="text-zinc-300 text-xl py-6">Index</h1>
        {cities.map((city, index: number) => (
          <Link
            key={index}
            href={city}
            className="capitalize hover:underline underline-offset-4 hover:text-zinc-100 transition-all duration-300"
          >
            {city}
          </Link>
        ))} */}
        <p className="text-center">Spotify shutdown the endpoints :(</p>
        <pre>{JSON.stringify(errorMessage, null, 2)}</pre>
      </section>
    </div>
  );
}
