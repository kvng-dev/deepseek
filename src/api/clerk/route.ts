import { Webhook } from "svix";
import connectDb from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface SvixHeaders {
  [key: string]: string;
  "svix-id": string;
  "svix-signature": string;
}

interface WebhookPayload {
  data: unknown;
  type: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const wh = new Webhook(process.env.SIGNING_KEy!);
  const headerPayload = await headers();
  const svixHeaders: SvixHeaders = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
  };

  const payload = await req.json();
  const body: string = JSON.stringify(payload);
  const { data, type }: WebhookPayload = wh.verify(
    body,
    svixHeaders
  ) as WebhookPayload;

  const typedData = data as {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string;
    last_name: string;
    image_url: string;
  };

  const userData = {
    _id: typedData.id,
    email: typedData.email_addresses[0].email_address,
    name: `${typedData.first_name} ${typedData.last_name}`,
    image: typedData.image_url,
  };

  await connectDb();

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;
    case "user.updated":
      await User.findByIdAndUpdate(typedData.id, userData);
      break;
    case "user.deleted":
      await User.findByIdAndDelete(typedData.id);
    default:
      // Handle unknown event types here
      break;
  }

  return NextResponse.json({ message: "Event received successfully" });
}
