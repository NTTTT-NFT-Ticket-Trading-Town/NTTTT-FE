import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="relative mx-auto h-full max-w-xl">
      <Outlet />
    </div>
  );
}
