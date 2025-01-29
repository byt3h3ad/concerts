import { cities } from "@/lib/utils";

export async function GET() {
  return Response.json({ cities });
}
