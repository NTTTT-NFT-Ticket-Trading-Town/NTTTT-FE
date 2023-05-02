import { AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import { useGetGotchaQuery } from "../store/reducers/gotcha";
import { useMemo, useState } from "react";
import TicketFramedGotcha from "../components/Gacha/TicketFramedGacha";
import ReloadGotcha from "../components/Gacha/ReloadGacha";

export type SetIndexType = React.Dispatch<React.SetStateAction<number>>;
export type ShowDetailType = boolean;
export type SetShowDetailType = React.Dispatch<React.SetStateAction<boolean>>;

export default function Gotcha() {
  const { data, isLoading } = useGetGotchaQuery("gotcha.json");
  const [index, setIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const showReload = useMemo(() => {
    if (isLoading || !data) return false;
    if (index == data.gatcha_list.length) {
      return true;
    }
    return false;
  }, [index, data]);

  let GachaComponent: JSX.Element | null = null;

  if (showReload || !data) {
    GachaComponent = <div>로딩중...</div>;
  } else {
    const gotcha = data.gatcha_list[index];
    GachaComponent = (
      <AnimatePresence mode={"wait"}>
        {!showReload
          ? TicketFramedGotcha(gotcha, setIndex, showDetail, setShowDetail)
          : ReloadGotcha(setIndex)}
      </AnimatePresence>
    );
  }

  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 w-full max-w-xl px-4">
        {GachaComponent}
      </main>
    </>
  );
}
