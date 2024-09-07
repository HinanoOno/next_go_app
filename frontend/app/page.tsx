"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { createWorker } from "tesseract.js";

const videoConstraints = {
  width: 500,
  height: 300,
  facingMode: "user",
};

const Page = () => {
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setUrl(imageSrc);
  };

  //画像読み取り
  const readImage = async(url: string | null) => {
    if (url) {
      const worker = await createWorker('jpn');
      const ret = await worker.recognize(url);
      await worker.setParameters({
        tessedit_char_blacklist: '賞味期限',
      });
      console.log(ret.data.text);
      await worker.terminate();
    }
  }

  return (
    <div>
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
      {url ? (
        <Image
          src={url}
          width={500}
          height={300}
          alt="description of the image"
        />
      ):(
        <div>画像がありません</div>
      )}
      <button onClick={() => readImage(url)}>表示</button>
    </div>
  );
};

export default Page;
