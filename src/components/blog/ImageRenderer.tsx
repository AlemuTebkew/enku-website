// components/ImageRenderer.tsx
import Image from "next/image";

interface ImageRendererProps {
  content: string;
  title: string;
  width?: number; // Accept width as a prop
  height?: number; // Accept height as a prop
}

const ImageRenderer: React.FC<ImageRendererProps> = ({
  content,
  title,
  width = 500,
  height = 300,
}) => {
  return (
    // <Image
    //   src={`https://api.enkubeauty.com/files/${content}`}
    //   alt={title}
    //   width={width} // Use the width prop
    //   height={height} // Use the height prop
    //   className="object-cover" // Remove fixed width and height class
    //   priority // Optional: use priority if this image is critical for the page
    // />

    <img
      src={`https://api.enkubeauty.com/files/${content}`}
      alt={title}
      width={width} // Use the width prop
      height={height} // Use the height prop
      className="object-cover" // Tailwind CSS for image styling
      loading="lazy" // Optional: lazy load the image
    />
  );
};

export default ImageRenderer;
