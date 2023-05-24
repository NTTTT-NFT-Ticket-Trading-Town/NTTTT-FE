import { AnimatePresence } from "framer-motion";
import TicketFramedGacha from "../components/Gacha/TicketFramedGacha";
import Header from "../layout/Header";

export type SetIndexType = React.Dispatch<React.SetStateAction<number>>;
export type ShowDetailType = boolean;
export type SetShowDetailType = React.Dispatch<React.SetStateAction<boolean>>;

export default function Gacha() {
  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 mt-4 flex w-full max-w-xl grow justify-center px-4">
        <AnimatePresence mode={"wait"}>
          <GachaComponent />
        </AnimatePresence>
      </main>
    </>
  );
}

function GachaComponent() {
  return <TicketFramedGacha />;
}
