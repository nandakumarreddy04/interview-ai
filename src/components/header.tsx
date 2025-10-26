import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { NavLink } from "react-router-dom";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

const Header = () => {
  const { userId } = useAuth();

  const interviewLink = {
    path: userId ? "/generate" : "/guest-interview",
    label: userId ? "Take An Interview" : "Guest Interview",
  };

  return (
    <header
      className={cn("w-full border-b duration-150 transition-all ease-in-out fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-md")}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* logo section */}
          <LogoContainer />

          {/* navigation section */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                cn(
                  "text-base text-neutral-600",
                  isActive && "text-neutral-900 font-semibold"
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to={interviewLink.path}
              className={({ isActive }) =>
                cn(
                  "text-base text-neutral-600",
                  isActive && "text-neutral-900 font-semibold"
                )
              }
            >
              {interviewLink.label}
            </NavLink>
            <NavigationRoutes />
          </nav>

          <div className="ml-auto flex items-center gap-6">
            <ProfileContainer />
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
