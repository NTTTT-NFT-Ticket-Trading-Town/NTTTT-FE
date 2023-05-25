import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorContent from "../components/Common/ErrorContent";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ImageWithDetail from "../components/Ticket/ImageWithDetail";
import Ticket from "../components/Ticket/Ticket";
import Header from "../layout/Header";
import { GachaInterface } from "../store/reducers/gacha/gachaTypes";
import { ServerResponseInterface } from "../store/reducers/indexTypes";
import { useGetMyCollectionQuery } from "../store/reducers/mypage";
import { useDetailQuery } from "../store/reducers/user";

export default function MyPage() {
  return (
    <>
      <Header />
      <MyPageContent />
    </>
  );
}

function MyPageContent() {
  const { data: userData } = useDetailQuery();
  const { data, isLoading, error } = useGetMyCollectionQuery();
  const someCategory = data?.data?.category_list.slice(0, 3) || [];
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    const errorData = (error as any)
      .data as ServerResponseInterface<GachaInterface>;
    return <ErrorContent errorMessage={errorData?.result?.message} />;
  }

  if (!userData || !data || !data.data || !data.data.gacha_list) {
    return <ErrorContent errorMessage="데이터가 없습니다." />;
  }

  const userDetail = userData.data;

  return (
    <>
      <main className="relative mx-auto mb-4 w-full max-w-xl grow px-4">
        <header className="flex items-center justify-between gap-2 pt-4">
          <div className="flex flex-row items-center gap-2">
            <div className="aspect-square w-20 overflow-hidden rounded-full border-4">
              <img
                src={"bg-bright.png"}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-smei text-xl">{userDetail.nickname}</h3>
              <div className="flex gap-2">
                {someCategory.length > 0 ? (
                  someCategory.map((tag) => (
                    <div key={tag.name + tag.group} className="text-gray-400">
                      #{tag.name}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">아티스트를 선택해주세요!</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link to="/artists" className="rounded bg-gray-300 p-2 text-xs">
              아티스트 수정
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("ntttt-user-session");
                navigate("/login");
              }}
              className="rounded bg-gray-300 p-2 text-center text-xs"
            >
              로그아웃
            </button>
          </div>
        </header>
        <section className="gap-100 relative flex flex-col pt-4 sm:pt-8">
          {data?.data.gacha_list.length !== 0 ? (
            <>
              {data.data.gacha_list.map((gacha, index) => {
                console.log(gacha);
                return <CollectionTicket key={index} gacha={gacha} />;
              })}
              <div key="invisible-padding" className="h-[50vh] w-full"></div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-center text-gray-500">
                보유한 티켓이 없습니다.
              </div>
              <Link
                className="rounded bg-purple-600 px-4 py-2 text-white"
                to="/gacha"
              >
                구매하러 가기
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

const CollectionTicket = ({ gacha }: { gacha: GachaInterface }) => {
  if (!gacha) return null;

  // this is a function when this gacha has scrolled to the top,
  // then shrink the size of the ticket
  // maybe use intersection observer?

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85px", "start 100px"],
  });

  const scrollYProgressRange = [-1, 1];
  const scaleRange = [0.8, 1];

  const yValue = useTransform(
    scrollYProgress,
    scrollYProgressRange,
    scaleRange
  );

  const springScrollYProgress = useSpring(yValue, {
    stiffness: 1000,
    damping: 100,
  });

  return (
    <motion.div
      ref={ref}
      key={gacha.id}
      style={{
        scale: springScrollYProgress,
      }}
      className="sticky top-16 mx-auto w-[80%] origin-center"
    >
      <Ticket getNextToken={() => null}>
        <div className="bg-white px-6 pt-4">
          <ImageWithDetail description={gacha.desc} image={gacha.image} />
        </div>
        <Ticket.Split />
        <div className="flex justify-between rounded-b-lg bg-white px-6 pb-6 pt-4 text-xl text-black sm:px-8 sm:pb-8">
          <span className="font-semibold">{gacha.artist.name}</span>
          <span>
            #{gacha.seq} / {gacha.event.quantity}
          </span>
        </div>
      </Ticket>
    </motion.div>
  );
};
