import { useRef } from "react";
import Webcam from "react-webcam";
import { Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebcameraProps } from "@/types/page";

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user",
};

const Webcamera = (props: WebcameraProps) => {
  const { setUrl } = props;

  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setUrl(imageSrc);
  };

  return (
    <>
      <div className="relative w-full max-w-md bg-black rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={false}
          screenshotFormat="image/jpeg"
          //videoConstraints={videoConstraints}
          className="w-full h-full"
        />
      </div>
      <div className="mt-4 space-x-4">
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Camera className="mr-2 h-4 w-4" /> Start Camera
        </Button>
        <Button onClick={capture} className="bg-green-500 hover:bg-green-600">
          <Check className="mr-2 h-4 w-4" /> Capture
        </Button>
      </div>
    </>
  );
};
export default Webcamera;
