import Image from "next/image";
import { useState } from "react";

interface ImageFallbackProps {
src: string;
fallback: string;
[key: string]: any;
}

const ImageFallback = ({ src, fallback, ...rest }: ImageFallbackProps) => {
const [imgSrc, setImgSrc] = useState<string>(src);

return (
<Image
{...rest}
src={imgSrc}
onError={() => {
setImgSrc(fallback);
}}
/>
);
};

export default ImageFallback;