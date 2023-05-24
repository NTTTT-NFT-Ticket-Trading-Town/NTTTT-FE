import { Link, useNavigate } from "react-router-dom";
import ErrorContent from "../components/Common/ErrorContent";
import ImageWithSkeleton from "../components/Common/ImageWithSkeleton";
import LoadingSpinner from "../components/Common/LoadingSpinner";
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
    return <ErrorContent errorMessage={errorData.result.message} />;
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
              <h3
                className="font-smei text-xl
            "
              >
                {userDetail.nickname}
              </h3>
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
        <section className="pt-10">
          <div className="relative flex flex-col gap-10">
            {data?.data ? (
              data.data.gacha_list.map((gacha, index) => {
                if (!gacha) return null;
                return (
                  <div
                    key={gacha.id}
                    style={{
                      top: `${index * 50}px`,
                      position: "sticky",
                      width: "80%",
                      marginInline: "auto",
                    }}
                  >
                    <Ticket getNextToken={() => null}>
                      <div className="bg-white px-6 pt-4">
                        <ImageWithSkeleton gacha={gacha.image} />
                      </div>
                      <Ticket.Split />
                      <div className="flex justify-between rounded-b-lg bg-white px-8 pb-8 pt-4 text-xl text-black">
                        <span className="font-semibold">
                          {gacha.artist.name}
                        </span>
                        <span>
                          {gacha.seq} / {gacha.event.quantity}
                        </span>
                      </div>
                    </Ticket>
                  </div>
                );
              })
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
          </div>
        </section>
      </main>
    </>
  );
}
