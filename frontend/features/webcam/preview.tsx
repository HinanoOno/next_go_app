import Image from "next/image";

interface PreviewProps {
  url: string | null;
}

const Preview: React.FC<PreviewProps> = ({ url }) => {
  if (!url) {
    return null;
  }

  return <Image src={url} alt="Picture" width={500} height={500} />;
};

export default Preview;
