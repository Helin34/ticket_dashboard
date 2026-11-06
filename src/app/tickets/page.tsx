import TicketsGrid from "@/components/tickets/TicketsGrid";
import React, { FC, Suspense } from "react";
import Loading from "./loading";

interface Props {}
const Page: FC<Props> = () => {
  return (
    <div className="mt-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Tickets</h1>
        <p className="text-gray-400">
          Tüm ticket`larını kategori bazında görüntüleyin ve yönetin
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <TicketsGrid />
      </Suspense>
    </div>
  );
};

export default Page;
