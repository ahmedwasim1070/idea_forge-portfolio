// Imports
import { Outlet } from "react-router-dom";
// Components
import Header from "./Header";
import Footer from "./Footer";
// Hooks
import { useScrollToTop } from "@/hooks";

//
function Layout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
