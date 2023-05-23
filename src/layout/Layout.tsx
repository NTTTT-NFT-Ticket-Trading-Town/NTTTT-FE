import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";
import AnimatedOutlet from "./AnimatedOutlet";
import { MetaMaskContextProvider } from "../pages/Signup/useMetaMask";

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
        <MetaMaskContextProvider>
          <AnimatedOutlet />
        </MetaMaskContextProvider>
      </motion.div>
    </AnimatePresence>
  );
}
