import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="relative mx-auto h-full max-w-xl">
      <Outlet />
    </main>
  );
}
