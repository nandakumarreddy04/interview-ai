import { Container } from "@/components/container";
import { Footer } from "@/components/footer";

import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16"> {/* Add padding-top to prevent content from being hidden behind the sticky header */}
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </div>
  );
};
