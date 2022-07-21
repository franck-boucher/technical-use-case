import { prisma } from "../lib/prisma";

export type { Employee } from "@prisma/client";

const getEmployeesByJobId = async (jobId: number) => {
  return prisma.employee.findMany({
    where: { jobId },
    orderBy: { salary: "asc" },
  });
};

export const getMarketDataByJobId = async (jobId: number) => {
  const employees = await getEmployeesByJobId(jobId);

  const p25Index = Math.round((25 / 100) * employees.length);
  const p25 = employees[p25Index].salary;

  const p75Index = Math.round((75 / 100) * employees.length);
  const p75 = employees[p75Index].salary;

  const medianIndex = Math.round((50 / 100) * employees.length);
  const median = employees[medianIndex].salary;

  const min = employees[0].salary;
  const max = employees[employees.length - 1].salary;

  const employeesCount = employees.length;

  return {
    p25,
    p75,
    median,
    min,
    max,
    employeesCount,
  };
};
