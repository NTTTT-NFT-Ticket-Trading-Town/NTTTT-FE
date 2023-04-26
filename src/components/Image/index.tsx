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
    setIsLoading(false);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={isLoading ? "hidden" : "w-full h-full "}
        onLoad={handleOnLoad}
      />
      {isLoading && <Skeleton />}
    </>
  );
}
