import { Link } from "react-router-dom";

export const LogoContainer = () => {
  return (
    <Link to={"/"} className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="Interview.ai Logo"
        className="h-10 w-10 object-contain"
      />
      <h1 className="text-xl font-bold">Interview.ai</h1>
    </Link>
  );
};
