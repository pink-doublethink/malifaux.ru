/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/M3ed.png";

const ImageFallback = (props) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src || fallback || FALLBACK_IMAGE);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc((current) => {
          const target = fallback || FALLBACK_IMAGE;
          return current !== target ? target : current;
        });
      }}
    />
  );
};

export default ImageFallback;
