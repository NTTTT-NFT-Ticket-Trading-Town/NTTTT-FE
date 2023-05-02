import React from "react";
import Skeleton from "./Skeleton";

import { ImagePropsInterface } from "./ImageTypes";

export default function Image(props: ImagePropsInterface) {
  // props
  const { src, alt } = props;

  // states
  const [isLoading, setIsLoading] = React.useState(true);

  // handlers
  const handleOnLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "5px",
        }}
        className={isLoading ? `hidden` : `bg-auto`}
        onLoad={handleOnLoad}
      />
      {isLoading && <Skeleton />}
    </>
  );
}
