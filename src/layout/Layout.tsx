import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="relative flex min-h-full max-w-xl grow flex-col">
      <Outlet />
    </div>
  );
}
