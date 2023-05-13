import Finder from "../components/Finder";
import MiniTicket from "../components/MiniTicket";
import Header from "../layout/Header";
import Button from "../components/Button";
import MiniImage from "../components/MiniImage";
import { dispatch, useSelector } from "../store";
import { toggleFavoriteArtist } from "../store/reducers/artist";
import { setSearch } from "../store/reducers/artist";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useState } from "react";
import Chip from "../components/Chip";

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
    id: idx,
    name: `아티스트 ${idx + 1}`,
    image_url: imgs[idx % img_len],
  };
});

function Test() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ width: "50px", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-10 bg-gray-1">{/* Hello */}</div>
    </motion.div>
  );
}

export default function Artists() {
  // states
  const selectedArtists = useSelector((state) => state.artist.artists);
  const search = useSelector((state) => state.artist.search);

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
          <div className="my-3 flex h-9 w-full flex-row overflow-scroll scrollbar-hide">
            <Finder />
            {new Array(5).fill(null).map((_, idx) => (
              <Chip label={`카테고리${idx + 1}`} enabled={false} />
            ))}
          </div>

          {/* article - body */}
          <div className="grid grid-cols-3 gap-3 xs:gap-0">
            {artists
              .filter((artist) => artist.name.includes(search))
              .map((artist) => {
                return (
                  <MiniTicket
                    onClick={() => dispatch(toggleFavoriteArtist(artist))}
                    clicked={!!selectedArtists.find((e) => e.id === artist.id)}
                    title={artist.name}
                    img_url={artist.image_url}
                  />
                );
              })}
          </div>

          {/* article - footer */}
          <div className=" fixed bottom-0 flex w-full max-w-[36rem] items-center justify-between bg-opacity-10 bg-gradient-to-t from-white to-transparent p-4">
            <div className="flex max-w-[calc(100%-200px)] gap-3 overflow-x-scroll scrollbar-hide">
              <AnimatePresence>
                {selectedArtists.map((artist) => (
                  <MiniImage
                    key={artist.id}
                    src={artist.image_url}
                    alt="image"
                    onClick={() => {
                      dispatch(toggleFavoriteArtist(artist));
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
            <Button>저장</Button>
          </div>
        </div>
      </main>
    </>
  );
}
