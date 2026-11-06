import Form from "@/components/form";
import { Ticket } from "@/types";
import { getTicketById } from "@/utils/service";
import React, { FC } from "react";
interface Props {
  params: Promise<{
    mode: string;
  }>;
}
const Page: FC<Props> = async ({ params }) => {
  const { mode } = await params;
  const isEditMode = mode !== "add";

  let editItem: Ticket | null = null;

  if (isEditMode) {
    editItem = (await getTicketById(mode)).ticket;
  }
  console.log(editItem);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl text-zinc-400">
        {isEditMode ? "Ticket'ı Güncelle" : "Ticket Oluştur"}
      </h1>
      <Form editItem={editItem} isEditMode={isEditMode} />
    </div>
  );
};

export default Page;
