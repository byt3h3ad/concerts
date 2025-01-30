import { PROD_URL } from "@/lib/config";
import { ImageResponse } from "next/og";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const parsedUrl = new URL(PROD_URL);
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "black",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: "white",
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
              color: "white",
            }}
          >
            {parsedUrl.hostname}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px 50px",
            margin: "0 42px",
            fontSize: 40,
            width: "auto",
            maxWidth: 550,
            textAlign: "center",
            backgroundColor: "white",
            color: "black",
            lineHeight: 1.4,
          }}
        >
          concerts in {slug}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
