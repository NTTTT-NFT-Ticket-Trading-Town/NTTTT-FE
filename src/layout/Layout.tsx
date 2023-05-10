import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-xl grow flex-col">
      <Outlet />
    </div>
  );
}
