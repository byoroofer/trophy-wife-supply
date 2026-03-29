import { NextResponse } from "next/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const klaviyoRevision = "2024-10-15";

type SubscribePayload = {
  email?: string;
};

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const email = payload.email?.trim().toLowerCase();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.KLAVIYO_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    return NextResponse.json(
      { error: "Email capture is not configured." },
      { status: 503 }
    );
  }

  try {
    const klaviyoResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          revision: klaviyoRevision
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: "SUBSCRIBED"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: listId
                }
              }
            }
          }
        }),
        cache: "no-store"
      }
    );

    if (!klaviyoResponse.ok) {
      const responseText = await klaviyoResponse.text();

      return NextResponse.json(
        {
          error: responseText || "Klaviyo rejected the subscription request."
        },
        { status: klaviyoResponse.status }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Unable to reach Klaviyo right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You are on the list."
  });
}
