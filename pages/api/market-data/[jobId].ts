import type { NextApiRequest, NextApiResponse } from "next";
import { getMarketDataByJobId } from "../../../models/employee";

export type Data = {
  marketData: Awaited<ReturnType<typeof getMarketDataByJobId>>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { jobId } = req.query;

  if (typeof jobId !== "string" || !jobId) {
    res.status(400);
    return;
  }

  const jobIdNbr = parseInt(jobId);
  if (isNaN(jobIdNbr)) {
    res.status(400);
    return;
  }

  const marketData = await getMarketDataByJobId(jobIdNbr);

  res.status(200).json({ marketData });
}
