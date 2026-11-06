import connectMongo from "@/utils/connect-mongo";
import Ticket from "../models/tickets";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongo();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    const [aggregateResult] = await Ticket.aggregate([
      {
        $facet: {
          overall: [
            {
              $group: {
                _id: null,
                totalTickets: { $sum: 1 },
                completedTickets: {
                  $sum: { $cond: [{ $eq: ["$status", "Çözüldü"] }, 1, 0] },
                },
                criticalTickets: {
                  $sum: { $cond: [{ $gt: ["$priority", 4] }, 1, 0] },
                },
                totalPriority: { $sum: "$priority" },
                ticketsCreatedToday: {
                  $sum: {
                    $cond: [{ $gte: ["$createdAt", today] }, 1, 0],
                  },
                },
                ticketsCreatedLastDays: {
                  $sum: {
                    $cond: [{ $gte: ["$createdAt", thisWeek] }, 1, 0],
                  },
                },
                ticketsCreatedThisYear: {
                  $sum: {
                    $cond: [{ $gte: ["$createdAt", thisYear] }, 1, 0],
                  },
                },
              },
            },
          ],
          byCategory: [
            {
              $group: { _id: "$category", count: { $sum: 1 } },
            },
          ],
          byStatus: [
            {
              $group: { _id: "$status", count: { $sum: 1 } },
            },
          ],
        },
      },
    ]);

    const stats = aggregateResult?.overall?.[0] || {
      totalTickets: 0,
      completedTickets: 0,
      criticalTickets: 0,
      totalPriority: 0,
      ticketsCreatedToday: 0,
      ticketsCreatedLastDays: 0,
      ticketsCreatedThisYear: 0,
    };

    const averagePriority =
      stats.totalTickets > 0
        ? +(stats.totalPriority / stats.totalTickets).toFixed(1)
        : 0;

    // 1. Kategorileri dönüştür
    const ticketsByCategory = (aggregateResult?.byCategory || []).reduce(
      (acc: Record<string, number>, curr: { _id: string; count: number }) => {
        if (curr._id) acc[curr._id] = curr.count;
        return acc;
      },
      {},
    );

    // 2. DÜZELTME: byStatus verisi byStatus dizisinden alınmalı!
    const ticketsByStatus = (aggregateResult?.byStatus || []).reduce(
      (acc: Record<string, number>, curr: { _id: string; count: number }) => {
        if (curr._id) acc[curr._id] = curr.count;
        return acc;
      },
      {},
    );

    return res.json({
      message: "İstatistikler hesaplandı",
      data: {
        overview: {
          totalTickets: stats.totalTickets,
          completedTickets: stats.completedTickets, // EKLENDİ: Artık yanıtta görünecek
          criticalTickets: stats.criticalTickets,
          averagePriority: averagePriority,
        },
        dateStats: {
          createdToday: stats.ticketsCreatedToday,
          createdLastDays: stats.ticketsCreatedLastDays,
          createdThisYear: stats.ticketsCreatedThisYear,
        },
        distributions: {
          byCategory: ticketsByCategory,
          byStatus: ticketsByStatus, // Doğru kaynak bağlandı
        },
      },
    });
  } catch (error) {
    return res.json(
      {
        message: "İstatistikler hesaplanırken bir hata oluştu.",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      {
        status: 400,
      },
    );
  }
}
