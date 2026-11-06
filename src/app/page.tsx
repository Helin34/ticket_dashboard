import DashboardValue from "@/components/home/DashboardValue";
import DoughnutChart from "@/components/home/DoughnutChart";
import { getStatistics } from "@/utils/service";
import { BarChart, PieChart, TrendingUp } from "lucide-react";
import React from "react";

const Home = async () => {
  const { data } = await getStatistics();
  return (
    <div className="h-full p-2 md:p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Ticket yönetim sistemimizin genel durum ve analizi
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <h2 className="font-semibold mb-2 text-lg">Kategori Dağılımı</h2>
            <DoughnutChart values={data.distributions.byCategory} />
          </div>
          <div>
            <h2 className="font-semibold mb-2 text-lg">Durum Dağılımı</h2>
            <DoughnutChart values={data.distributions.byStatus} />
          </div>
          <div>
            <h2 className="grid md:grid-cols-3 gap-5 pb-10">
              Zaman Bazlı Analiz
            </h2>
            <div className="grid md:grid-cols-3 gap-5 pb-10">
              <DashboardValue
                label="Bugün"
                value={data.dateStats.createdToday}
                icon={<TrendingUp className="text-green-500" />}
              />
              <DashboardValue
                label="Son 7Gün"
                value={data.dateStats.createdLastDays}
                icon={<BarChart className="text-blue-500" />}
              />
              <DashboardValue
                label="Bu Yıl"
                value={data.dateStats.createdThisYear}
                icon={<PieChart className="text-purple-500" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
