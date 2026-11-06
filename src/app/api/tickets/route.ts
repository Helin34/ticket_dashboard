import { NextResponse as res } from "next/server";
import Ticket, { ITicket } from "../models/tickets";
import connectMongo from "@/utils/connect-mongo";

export async function POST(req: Request) {
  try {
    // 1. Veritabanı bağlantısını burada çağırıyoruz
    await connectMongo();

    const body = (await req.json()) as ITicket;
    const newTicket = await Ticket.create(body);

    return res.json(
      { message: "Ticket Oluşturuldu", ticket: newTicket },
      { status: 201 },
    );
  } catch (error) {
    return res.json(
      {
        message: "Ticket oluşturulurken bir hata oluştu.",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {
        status: 400,
      },
    );
  }
}

export async function GET(req: Request) {
  try {
    // GET isteğinde de veritabanına bağlanmak iyi bir pratiktir
    await connectMongo();

    // Eğer verileri listelemek istiyorsanız:
    const tickets = await Ticket.find();
    return res.json({ message: "Ticketler Listelendi", tickets });
  } catch (error) {
    return res.json(
      {
        message: "Ticket listelenirken bir hata oluştu.",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {
        status: 400,
      },
    );
  }
}
