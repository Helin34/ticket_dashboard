export type StatisticsResponse = {
  message: string;
  data: {
    overview: {
      totalTickets: number;
      completedTickets: number;
      criticalTickets: number;
      averagePriority: number; // averagepPriority -> averagePriority düzeltildi
    };
    dateStats: {
      createdToday: number;
      createdLastDays: number;
      createdThisYear: number;
    };
    distributions: {
      byCategory: Record<string, number>; // string yerine number yapıldı

      byStatus: {
        "Devam Ediyor": number;
        Beklemede: number;
        Çözüldü: number;
        [key: string]: number; // Esneklik için dinamik key desteği eklenebilir
      };
    };
  };
};
export type Ticket = {
  _id: string;
  title: string;
  category: string;
  priority: number;
  progress: number;
  status: "Devam Ediyor" | "Beklemede" | "Çözüldü";
  createdAt: string;
  updatedAt: string;
};

export type TicketsResponse = {
  message: string;
  tickets: Ticket[];
};
export type TicketResponse = {
  message: string;
  ticket: Ticket;
};
