import { Job } from "../models/job";

interface JobEntryProps {
  job: Job;
  selected?: boolean;
  onClick: () => void;
}
export default function JobEntry({
  job,
  selected = false,
  onClick,
}: JobEntryProps) {
  const selectedStyle = selected
    ? "font-bold bg-teal-500 border border-teal-500 text-white"
    : "bg-white border border-slate-100";
  return (
    <button
      className={`p-6 shadow-lg text-xl text-left rounded-xl ${selectedStyle}`}
      onClick={onClick}
    >
      {job.name}
    </button>
  );
}
