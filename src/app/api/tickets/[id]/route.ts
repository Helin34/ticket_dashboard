import connectMongo from "@/utils/connect-mongo";
import Ticket, { ITicket } from "../../models/tickets";
import { NextResponse as res } from "next/server";
interface Params {
  params: Promise<{
    id: string;
  }>;
}
export async function GET(req: Request, { params }: Params) {
  try {
    await connectMongo();
    const { id } = await params;

    // Eğer verileri listelemek istiyorsanız:
    const ticket = await Ticket.findById(id);

    if (!ticket) throw Error("Ticket Bulunamadı");
    return res.json({ message: "Ticket Bulundu", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket aranırken bir hata oluştu.",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {
        status: 400,
      },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectMongo();
    const { id } = await params;

    // Eğer verileri listelemek istiyorsanız:
    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) throw Error("Ticket Bulunamadı");
    return res.json({ message: "Ticket Silindi", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket silinirken bir hata oluştu.",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {
        status: 400,
      },
    );
  }
}
export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectMongo();
    const { id } = await params;
    const body = (await req.json()) as ITicket;
    const ticket = await Ticket.findByIdAndUpdate(id, body, { new: true });

    // Eğer verileri listelemek istiyorsanız:

    if (!ticket) throw Error("Ticket Bulunamadı");
    return res.json({ message: "Ticket Güncellendi", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket güncellenirken bir hata oluştu.",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {
        status: 400,
      },
    );
  }
}
