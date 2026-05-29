import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-ink-900 text-bone-100">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
