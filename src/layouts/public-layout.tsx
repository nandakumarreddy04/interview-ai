import { Footer } from "@/components/footer";
import Header from "@/components/header";
import AuthHanlder from "@/handlers/auth-handler";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* handler to store the user data */}
      <AuthHanlder />
      <Header />

      <main className="flex-grow pt-16"> {/* Add padding-top to prevent content from being hidden behind the sticky header */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
