import { eventsFetcher } from "@/lib/utils";

export async function GET() {
  const events = await eventsFetcher();
  return Response.json({ events });
}
