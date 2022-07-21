import { useEffect, useState } from "react";
import { Job } from "../models/job";
import { Data as MarketData } from "../pages/api/market-data/[jobId]";

interface JobMarketProps {
  job: Job;
}
export default function JobMarket({ job }: JobMarketProps) {
  const [data, setData] = useState<MarketData>();

  useEffect(() => {
    fetch(`/api/market-data/${job.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [job.id]);

  if (!data) return null;

  return (
    <div className="border rounded-xl p-6 shadow-lg bg-white border-slate-100">
      <div>
        <h3 className="font-bold text-xl text-center mb-4">{job.name}</h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <CardNumber title="Min" number={data.marketData.min} />
          <CardNumber title="P25" number={data.marketData.p25} />
          <CardNumber title="Median" number={data.marketData.median} />
          <CardNumber title="P75" number={data.marketData.p75} />
          <CardNumber title="Max" number={data.marketData.max} />
        </div>
      </div>
    </div>
  );
}

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

interface CardNumberProps {
  number: number;
  title: string;
}
const CardNumber = ({ number, title }: CardNumberProps) => (
  <div className="border border-teal-600 p-8 text-center rounded-xl">
    <div className="font-bold text-2xl">{formatter.format(number)}</div>
    <div>{title}</div>
  </div>
);
