"use client";

import { createWorker } from "tesseract.js";
import Webcamera from "@/features/webcam/webcamera";
import { useState } from "react";
import Preview from "@/features/webcam/preview";
import { Camera } from "lucide-react";

const Page = () => {
  const [url, setUrl] = useState<string | null>(null);

  //画像読み取り
  // const readImage = async (url: string | null) => {
  //   if (url) {
  //     const worker = await createWorker("jpn");
  //     const ret = await worker.recognize(url);
  //     await worker.setParameters({
  //       tessedit_char_blacklist: "賞味期限",
  //     });
  //     //console.log(ret.data.text);
  //     await worker.terminate();
  //   }
  // };



  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold text-center flex items-center justify-center gap-4">
            <Camera />
            Expiration Date Reader
          </h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {!url ? (
            <>
              <Webcamera url={url} setUrl={setUrl} />
            </>
          ) : (
            <>
              <Preview url={url} setUrl={setUrl}/>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
