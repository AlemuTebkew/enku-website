// components/VideoRenderer.tsx
interface VideoRendererProps {
  content: string;
  title: string;
  height?: number;
  width?: number;
}

const VideoRenderer: React.FC<VideoRendererProps> = ({
  content,
  title,
  height = 300,
  width = 500,
}) => {
  const videoSrc = content.includes("youtu.be")
    ? content.replace("youtu.be/", "youtube.com/embed/")
    : content.includes("/shorts/")
    ? `https://www.youtube.com/embed/${
        content.split("/shorts/")[1].split("?")[0]
      }`
    : content.replace("watch?v=", "embed/").split("&")[0];

  return (
    <iframe
      width={width}
      height={height}
      src={videoSrc}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoRenderer;
