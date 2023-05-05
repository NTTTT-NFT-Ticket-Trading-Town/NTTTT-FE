import Chip from "../components/Chip";
import MiniTicket from "../components/MiniTicket";
import Header from "../layout/Header";

// TODO: store에서 처리.
const imgs = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RF1_iqBEPjN6gnJb82XeEJbVkF56RZySLw&usqp=CAU",
  "https://ojsfile.ohmynews.com/STD_IMG_FILE/2022/1217/IE003091219_STD.jpg",
  "https://isplus.com/data/isp/image/2023/02/18/isp20230218000168.600x.8.jpg",
  "https://cdn.sisamagazine.co.kr/news/photo/202304/487355_495347_828.png",
  "https://cdn.mhnse.com/news/photo/202212/161460_156782_2326.jpg",
  "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202206/24/starnews/20220624181914689zfdx.jpg",
  "https://img.hankyung.com/photo/202112/03.28304862.1.jpg",
];
const img_len = imgs.length;
const artists = new Array(7).fill(null).map((_, idx) => {
  console.log(imgs[idx % img_len]);
  return {
    title: `아티스트 ${idx + 1}`,
    img_url: imgs[idx % img_len],
  };
});

export default function Artists() {
  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 w-full max-w-xl px-4">
        <div className="flex flex-col items-center justify-center">
          {/* article - header */}
          <div className="text-lg font-bold">아티스트를 선택해주세요</div>
          <div className="text-sm">
            선택하신 아티스트의 NFT토큰을 확인하세요!
          </div>

          {/* article - categorory */}
          {/* TODO: scroll-bar 없애기 */}
          <div className="flex w-full flex-row overflow-scroll">
            {new Array(10).fill(null).map((_, idx) => (
              <Chip label={`카테고리${idx + 1}`} enabled={false} />
            ))}
          </div>
          {/* article - body */}
          <div className="grid grid-cols-3 gap-3">
            {artists.map((artist) => {
              return (
                <MiniTicket title={artist.title} img_url={artist.img_url} />
              );
            })}
          </div>

          {/* article - footer */}
          <div>푸터</div>
        </div>
      </main>
    </>
  );
}
