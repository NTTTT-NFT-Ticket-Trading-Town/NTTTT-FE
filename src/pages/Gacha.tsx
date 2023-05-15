import { AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import { useGetDailyGachaQuery } from "../store/reducers/gacha";
import { useMemo, useState } from "react";
import TicketFramedGacha from "../components/Gacha/TicketFramedGacha";
import ReloadGacha from "../components/Gacha/ReloadGacha";
import LoadingSpinner from "../components/Common/LoadingSpinner";

export type SetIndexType = React.Dispatch<React.SetStateAction<number>>;
export type ShowDetailType = boolean;
export type SetShowDetailType = React.Dispatch<React.SetStateAction<boolean>>;

export default function Gacha() {
  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 flex w-full max-w-xl grow justify-center px-4">
        <AnimatePresence mode={"wait"}>
          <GachaComponent />
        </AnimatePresence>
      </main>
    </>
  );
}

function GachaComponent() {
  const { data, isLoading } = useGetDailyGachaQuery("gacha.json");
  const [index, setIndex] = useState(0);

  const showReload = useMemo(() => {
    if (isLoading || !data) return false;
    if (index == data.gacha_list.length) {
      return true;
    }
    return false;
  }, [index, data]);

  if (!data || isLoading) {
    return <LoadingSpinner />;
  }

  const gacha = data.gacha_list[index];

  return (
    <>
      {showReload ? (
        <ReloadGacha key="Reload" setIndex={setIndex} />
      ) : (
        <TicketFramedGacha key={gacha.id} gacha={gacha} setIndex={setIndex} />
      )}
    </>
  );
}
