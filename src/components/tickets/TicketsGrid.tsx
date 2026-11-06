import { Ticket } from "@/types";
import { getTickets } from "@/utils/service";
import React from "react";
import TicketCard from "./TicketCard";

export default async function TicketsGrid() {
  const response = await getTickets();
  // Gelen verinin dizi olduğundan emin oluyoruz (güvenli fallback)
  const tickets: Ticket[] = response?.tickets || [];

  const ticketsByCategories = tickets.reduce<Record<string, Ticket[]>>(
    (obj, ticket) => {
      // Eğer ticket'ın kategorisi yoksa (veri eksikse) hata vermemesi için atla
      if (!ticket.category) return obj;

      // Eğer bu kategori için daha önce bir dizi açılmadıysa boş dizi oluştur
      if (!obj[ticket.category]) {
        obj[ticket.category] = [];
      }

      // Artık obj[ticket.category] kesinlikle bir dizi, güvenle push yapabiliriz
      obj[ticket.category].push(ticket);

      return obj;
    },
    {},
  );

  return (
    <div className="p-6 space-y-6">
      {Object.entries(ticketsByCategories).map(
        ([category, categoryTickets]) => (
          /* DÜZELTME 1: key prop'u eklendi */
          <div key={category} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                {category}
              </h2>
              <span className="bg-blue-600/25 text-blue-400 font-medium text-sm py-1 px-2.5 rounded-md">
                {categoryTickets.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket._id} />
              ))}
            </div>
          </div> /* DÜZELTME 2: <div/> yerine doğru kapatma etiketi kullanıldı */
        ),
      )}
    </div>
  );
}
