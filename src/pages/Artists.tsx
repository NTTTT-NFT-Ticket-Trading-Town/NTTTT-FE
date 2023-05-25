import { AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import Chip from "../components/Chip";
import ErrorContent from "../components/Common/ErrorContent";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Finder from "../components/Finder";
import MiniImage from "../components/MiniImage";
import MiniTicket from "../components/MiniTicket";
import Header from "../layout/Header";
import { dispatch, useSelector } from "../store";
import {
  toggleFavoriteArtist,
  toggleFavoriteGroups,
  useGetAllArtistsQuery,
} from "../store/reducers/artist";
import { ServerResponseInterface } from "../store/reducers/indexTypes";
import { usePostFavoriteArtistsMutation } from "../store/reducers/user";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Artists() {
  // apis
  const { data, error, isLoading } = useGetAllArtistsQuery();
  const [postFavoriteArtists, { isSuccess }] = usePostFavoriteArtistsMutation();
  // states
  const search = useSelector((state) => state.artist.search);
  const selectedArtists = useSelector((state) => state.artist.artists);
  const selectedGroups = useSelector((state) => state.artist.groups);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/gacha");
  }, [isSuccess]);

  // hooks

  // preprocess
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error || !data) {
    const errorData = (error as any).data as ServerResponseInterface<null>;
    return <ErrorContent errorMessage={errorData?.result?.message} />;
  }

  const groupsDTO = data.data;
  const groups = groupsDTO.map((groupDTO) => groupDTO.group);
  const artists = groupsDTO.map((groupDTO) => groupDTO.members).flat();

  // handlers
  const handleOnClickSave = async () => {
    try {
      await postFavoriteArtists(
        selectedArtists.map((artist) => {
          return { artistId: artist.id };
        })
      ).unwrap();
    } catch (error) {
      console.log("rejected", error);
    }
  };

  return (
    <>
      <Header />
      <main className="relative mx-auto mb-4 flex w-full max-w-xl flex-grow flex-col px-4">
        {/* article - header */}
        <div className=" text-center text-lg font-bold">
          아티스트를 선택해주세요
        </div>
        <div className="text-center text-sm">
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
        <div className="grid gap-3 xs:grid-cols-3 xs:gap-0 sm:grid-cols-4 sm:gap-2">
          {artists
            .filter((artist) => artist.name.includes(search))
            .filter((artist) => {
              if (selectedGroups.length === 0) return true;
              return selectedGroups.includes(artist.group);
            })
            .map((artist, idx) => {
              return (
                <MiniTicket
                  key={artist.id}
                  delay={idx}
                  onClick={() => dispatch(toggleFavoriteArtist(artist))}
                  clicked={!!selectedArtists.find((e) => e.id === artist.id)}
                  title={artist.name}
                  img_url={artist.img_url}
                />
              );
            })}
        </div>

        {/* article - footer */}
        <div className="fixed bottom-0 left-0 w-full  bg-opacity-10 bg-gradient-to-t from-white to-transparent">
          <div className="mb-4 ml-4 flex max-w-[calc(100%-200px)] gap-3 overflow-x-scroll scrollbar-hide">
            <AnimatePresence>
              {selectedArtists.map((artist) => (
                <MiniImage
                  key={artist.img_url}
                  src={artist.img_url}
                  alt="image"
                  onClick={() => {
                    dispatch(toggleFavoriteArtist(artist));
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
          <Button
            className="absolute bottom-4 right-4"
            onClick={handleOnClickSave}
          >
            저장
          </Button>
        </div>
      </main>
    </>
  );
}
