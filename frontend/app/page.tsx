"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user",
};

const Page = () => {
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setUrl(imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}
        width={500}
        height={500}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>撮影</button>
      {url && (
        <Image
          src={url}
          width={500}
          height={500}
          alt="description of the image"
        />
      )}
    </div>
  );
};

export default Page;
