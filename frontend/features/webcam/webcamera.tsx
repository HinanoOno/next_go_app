import { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 500,
  height: 300,
  facingMode: "user",
};

type WebcameraProps = {
  url: string | null;
  setUrl: (url: string | null) => void;
};

const Webcamera = (props: WebcameraProps) => {
  const { url, setUrl } = props;

  const webcamRef = useRef<Webcam>(null);
  

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setUrl(imageSrc);
  };

  return (
    <>
      <Webcam
        audio={false}
        width={500}
        height={300}
        ref={webcamRef}
        mirrored={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>撮影</button>
    </>
  );
};
export default Webcamera;
