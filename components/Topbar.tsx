import Link from "next/link";
import Logout from "./icons/Logout";
import User from "./icons/User";

export default function Topbar() {
  return (
    <div className="flex justify-between py-8 items-center mb-4">
      <Link href="/">
        <a>
          <h1 className="text-3xl font-bold underline underline-offset-8 decoration-teal-500 decoration-4">
            Figures 2.0 👌
          </h1>
        </a>
      </Link>
      <span className="flex gap-6">
        <User />
        <Logout />
      </span>
    </div>
  );
}
