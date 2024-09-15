"use client";

import { createWorker } from "tesseract.js";
import Webcamera from "@/features/webcam/webcamera";
import { useState } from "react";
import Preview from "@/features/webcam/preview";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
      //console.log(ret.data.text);
      await worker.terminate();
    }
  };
  
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

  const sendImg = async () => {
    if (!url) {
      console.error("No image URL found");
      return;
    }

    const formData = new FormData();
    const blob = base64ToBlob(url);
    formData.append("file", blob, `${uuidv4()}.jpg`);

   try{
    await axios.post("http://localhost:8080/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   }
   catch (e) {
     console.error(e);
   }
  };

  return (
    <div>
      <Webcamera url={url} setUrl={setUrl}></Webcamera>
      {url && <Preview url={url}></Preview>}
      <button onClick={() => readImage(url)}>表示</button>
      <button onClick={sendImg}>送信</button>
    </div>
  );
};

export default Page;
