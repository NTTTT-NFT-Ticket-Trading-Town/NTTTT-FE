import { useState } from "react";
import { makeToken, makeTokenProps } from "../utils/makeToken";
// import MiniTicket from "../components/MiniTicket";

export default function Test() {
  const [data, setData] = useState<makeTokenProps>({
    eventId: 0,
    artistId: 0,
    imgUrl: "",
    ratio: "",
    price: 10000,
    desc: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        makeToken(data);
      }}
      className="flex flex-col gap-4 p-8"
    >
      <div className="text-4xl font-bold">Token Form</div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="eventId">
          eventId
        </label>
        <input
          type="number"
          name="eventId"
          value={data.eventId}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, eventId: e.target.valueAsNumber };
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="artistId">
          artistId
        </label>
        <input
          type="number"
          name="artistId"
          value={data.artistId}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, artistId: e.target.valueAsNumber };
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="imgUrl">
          imgUrl
        </label>
        <input
          type="text"
          name="imgUrl"
          value={data.imgUrl}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, imgUrl: e.target.value };
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="ratio">
          ratio
        </label>
        <input
          type="text"
          name="ratio"
          value={data.ratio}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, ratio: e.target.value };
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="price">
          price
        </label>
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, price: e.target.valueAsNumber };
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="desc">
          desc
        </label>
        <input
          type="text"
          name="desc"
          value={data.desc}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, desc: e.target.value };
            })
          }
        />
      </div>
      <button className="w-full bg-blue-300" type="submit">
        submit
      </button>
    </form>
  );
}
