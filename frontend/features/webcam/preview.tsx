import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { WebcameraProps } from "@/types/page";

const Preview = (props: WebcameraProps) => {
  const { url, setUrl } = props;

  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const reset = () => {
    setUrl(null);
  };

  const sendImg = async () => {
    if (!url) {
      console.error("No image URL found");
      return;
    }

    const formData = new FormData();
    const blob = base64ToBlob(url);
    formData.append("file", blob, `${uuidv4()}.jpg`);

    try {
      await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!url) {
    return null;
  }

  return (
    <>
      <div className="w-full max-w-md bg-black rounded-lg overflow-hidden">
        <Image src={url} alt="Picture" width={500} height={500} />
      </div>
      <div className="mt-4 space-x-4">
        <Button onClick={sendImg} className="bg-blue-500 hover:bg-blue-600">
          Read Date
        </Button>
        <Button onClick={reset} className="bg-gray-500 hover:bg-gray-600">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </>
  );
};

export default Preview;
