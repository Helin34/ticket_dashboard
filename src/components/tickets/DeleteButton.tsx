"use client";

import { deleteTicket } from "@/utils/service";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { FC } from "react";
interface Props {
  id: string;
}
const Deletebutton: FC<Props> = ({ id }) => {
  const router = useRouter();
  const handleDelete = () => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;

    deleteTicket(id).then(() => router.refresh());
  };
  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition"
    >
      <Trash className="size-4" />
    </button>
  );
};

export default Deletebutton;
