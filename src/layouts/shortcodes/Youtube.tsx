import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import React from "react";

interface YoutubeProps {
  id: string;
  title: string;
  [rest: string]: any;
}

const Youtube: React.FC<YoutubeProps> = ({ id, title, ...rest }) => {
  return (
    <div className="rounded overflow-hidden">
      <LiteYouTubeEmbed id={id} title={title} {...rest} />
    </div>
  );
};

export default Youtube;