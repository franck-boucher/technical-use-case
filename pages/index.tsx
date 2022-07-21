import { GetServerSideProps } from "next";
import React from "react";
import JobEntry from "../components/JobEntry";
import JobMarket from "../components/JobMarket";
import NoJobMarket from "../components/NoJobMarket";
import Topbar from "../components/Topbar";
import { getJobs } from "../models/job";

type Data = {
  jobs: Awaited<ReturnType<typeof getJobs>>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await getJobs();
  const data: Data = { jobs };
  return {
    props: {
      data: JSON.stringify(data),
    },
  };
};

export default function Home(props: { data: string }) {
  const { jobs } = JSON.parse(props.data) as Data;

  const [selectedJobs, setSelectedJobs] = React.useState<number[]>([]);

  const toggleJob = (jobId: number) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Topbar />

      <h2 className="text-2xl mb-4 font-bold">Market Data Browser</h2>

      <div className="flex gap-8">
        <div className="flex flex-col gap-4 w-80">
          {jobs.map((job) => (
            <JobEntry
              key={job.id}
              job={job}
              onClick={() => toggleJob(job.id)}
              selected={selectedJobs.some(
                (selectedJob) => selectedJob === job.id
              )}
            />
          ))}
        </div>

        {selectedJobs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {jobs
              .filter((job) => selectedJobs.includes(job.id))
              .map((job) => (
                <JobMarket key={job.id} job={job} />
              ))}
          </div>
        ) : (
          <NoJobMarket />
        )}
      </div>
    </div>
  );
}
