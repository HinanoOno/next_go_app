"use client";

import { createWorker } from "tesseract.js";
import Webcamera from "@/features/webcam/webcamera";
import { useState } from "react";
import Preview from "@/features/webcam/preview";

const Page = () => {
  const [url, setUrl] = useState<string | null>(null);

  //画像読み取り
  const readImage = async (url: string | null) => {
    if (url) {
      const worker = await createWorker("jpn");
      const ret = await worker.recognize(url);
      await worker.setParameters({
        tessedit_char_blacklist: "賞味期限",
      });
      console.log(ret.data.text);
      await worker.terminate();
    }
  };

  return (
    <div>
      <Webcamera url={url} setUrl={setUrl}></Webcamera>
      {url && <Preview url={url}></Preview>}
      <button onClick={() => readImage(url)}>表示</button>
    </div>
  );
};

export default Page;
