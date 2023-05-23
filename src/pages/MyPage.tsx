import ErrorContent from "../components/Common/ErrorContent";
import ImageWithSkeleton from "../components/Common/ImageWithSkeleton";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Ticket from "../components/Ticket/Ticket";
import Header from "../layout/Header";
import { GachaInterface } from "../store/reducers/gacha/gachaTypes";
import { ServerResponseInterface } from "../store/reducers/indexTypes";
import { useGetMyCollectionQuery } from "../store/reducers/mypage";

export default function MyPage() {
  return (
    <>
      <Header />
      <MyPageContent />
    </>
  );
}

const useUserQuery = () => {
  return {
    name: "닉네임",
    tags: ["윈터", "카리나"],
    profileImage:
      "https://cdn141.picsart.com/359814356036201.jpg?to=crop&type=webp&r=1456x1813&q=85",
  };
};

function MyPageContent() {
  const { name, tags, profileImage } = useUserQuery();
  const { data, isLoading, error } = useGetMyCollectionQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    const errorData = (error as any)
      .data as ServerResponseInterface<GachaInterface>;
    return <ErrorContent errorMessage={errorData.result.message} />;
  }

  console.log(data?.data);

  if (!data || !data.data || !data.data.gacha_list) {
    return <ErrorContent errorMessage="데이터가 없습니다." />;
  }

  return (
    <>
      <main className="relative mx-auto mb-4 w-full max-w-xl grow px-4">
        <header className="flex items-center gap-4 pt-4">
          <div className="aspect-square w-20 overflow-hidden rounded-full border-4">
            <img src={profileImage} alt="" className="w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h3
              className="font-smei text-xl
            "
            >
              {name}
            </h3>
            <div className="flex gap-2">
              {data.data.category_list.slice(0, 2).map((tag) => (
                <div className="text-gray-400">#{tag.name}</div>
              ))}
            </div>
          </div>
        </header>
        <section className="pt-10">
          <div className="relative flex flex-col gap-10">
            {data?.data?.gacha_list.map((gacha, index) => {
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
                      <span className="font-semibold">{gacha.artist.name}</span>
                      <span>
                        {gacha.seq} / {gacha.event.quantity}
                      </span>
                    </div>
                  </Ticket>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
