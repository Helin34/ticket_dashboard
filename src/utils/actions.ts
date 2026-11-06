"use server";

import Ticket from "@/app/api/models/tickets";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation"; //

export async function createTicketAction(formData: FormData) {
  const id = formData.get("id");
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };
  await connectMongo();

  id
    ? await Ticket.findByIdAndUpdate(id, rawData)
    : await Ticket.create(rawData);

  redirect("/tickets");
}
