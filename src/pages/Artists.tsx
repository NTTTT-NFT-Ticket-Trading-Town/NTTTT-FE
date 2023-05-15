import Finder from "../components/Finder";
import MiniTicket from "../components/MiniTicket";
import Header from "../layout/Header";
import Button from "../components/Button";
import MiniImage from "../components/MiniImage";
import { dispatch, useSelector } from "../store";
import {
  toggleFavoriteGroups,
  toggleFavoriteArtist,
  useGetAllArtistsQuery,
} from "../store/reducers/artist";
import { AnimatePresence } from "framer-motion";
import Chip from "../components/Chip";
import ErrorContent from "../components/Common/ErrorContent";
import LoadingSpinner from "../components/Common/LoadingSpinner";

export default function Artists() {
  // apis
  const { data, error, isLoading } = useGetAllArtistsQuery();

  // states
  const search = useSelector((state) => state.artist.search);
  const selectedArtists = useSelector((state) => state.artist.artists);
  const selectedGroups = useSelector((state) => state.artist.groups);

  // preprocess
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    console.log("error", error);
  }
  if (!data) return <ErrorContent />;

  const groupsDTO = data.data;
  const groups = groupsDTO.map((groupDTO) => groupDTO.group);
  const artists = groupsDTO.map((groupDTO) => groupDTO.members).flat();

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
            {groups.map((group) => (
              <Chip
                key={group}
                handleClick={() => dispatch(toggleFavoriteGroups(group))}
                label={group}
                active={selectedGroups.includes(group)}
              />
            ))}
          </div>

          {/* article - body */}
          <div className="grid grid-cols-3 gap-3 xs:gap-0">
            {artists
              .filter((artist) => artist.name.includes(search))
              .filter((artist) => {
                if (selectedGroups.length === 0) return true;
                return selectedGroups.includes(artist.group);
              })
              .map((artist) => {
                return (
                  <MiniTicket
                    key={artist.id}
                    onClick={() => dispatch(toggleFavoriteArtist(artist))}
                    clicked={!!selectedArtists.find((e) => e.id === artist.id)}
                    title={artist.name}
                    img_url={artist.imgUrl}
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
                    src={artist.imgUrl}
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
