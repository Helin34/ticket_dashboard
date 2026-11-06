import React, { FC } from "react";
import PriorityBadge from "./PriorityBadge";
import Deletebutton from "./DeleteButton";
import Link from "next/link";
import ProgressBar from "./ProgressBar";
import { Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { dateFormat } from "@/utils/constants";

interface Props {
  ticket: Ticket;
}
const TicketCard: FC<Props> = ({ ticket }) => {
  const isRecent =
    new Date(ticket.createdAt) > new Date(Date.now() - 12 * 60 * 60 * 100);

  const createdAt = new Date(ticket.createdAt).toLocaleString("tr", dateFormat);
  const updatedAt = new Date(ticket.updatedAt).toLocaleString("tr", dateFormat);

  return (
    <div className="group bg-zinc-800 rounded-xl shadow-sm hover:shadow-md shadow-zinc-900/20 transition border border-zinc-700 hover:border-zinc-600 overflow-hidden">
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={ticket.priority} />
            {isRecent && (
              <div className="bg-green-100 text-green-800 px-2 text-xs py-1 rounded-full ">
                Yeni
              </div>
            )}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition">
            <Deletebutton id={ticket._id} />
          </div>
        </div>
        <div>
          <Link href={`/ticket/${ticket._id}`} className="block">
            <h3 className="font-semibold text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-400 transition">
              {ticket.title}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2 mb-3">
              {ticket.description}
            </p>
          </Link>
          <div className="mb-3">
            <span className="bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded-md">
              {ticket.category}
            </span>
          </div>
          <div className="mb-3">
            <ProgressBar progress={ticket.progress} />
          </div>
        </div>
        {/* footer */}
        <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700 flex items-center justify-between gap-2">
          {/* Sol taraf: Tarih bilgileri alt alta */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="size-3" />
              <span>Oluşturuldu: {createdAt}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="size-3" />
              <span>Güncellendi: {updatedAt}</span>
            </div>
          </div>

          {/* Sağ taraf: Status Badge yanına taşındı */}
          <div>
            <StatusBadge status={ticket.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
