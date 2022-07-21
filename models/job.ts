import { prisma } from "../lib/prisma";

export type { Job } from "@prisma/client";

export const getJobs = async () => {
  return prisma.job.findMany();
};
