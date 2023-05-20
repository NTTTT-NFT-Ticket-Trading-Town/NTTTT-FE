import { Outlet, useLocation, useOutlet } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedOutlet from "./AnimatedOutlet";

export default function Layout() {
  const location = useLocation();
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className="relative mx-auto flex min-h-full w-full max-w-xl grow flex-col"
      >
        <AnimatedOutlet />
      </motion.div>
    </AnimatePresence>
  );
}
