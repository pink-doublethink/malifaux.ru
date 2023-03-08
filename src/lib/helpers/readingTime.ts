// content reading
export const readingTime = (content: string): string => {
  const WPS = 200 / 60;

  let images = 0;

  let words = content.split(" ").filter((word: string) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return /\w/.test(word);
  }).length;

  let imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  if (minutes < 10) {
    if (minutes < 2) {
      return "0" + minutes + ` Min read`;
    } else {
      return "0" + minutes + ` Mins read`;
    }
  } else {
    return minutes + ` Mins read`;
  }
};
