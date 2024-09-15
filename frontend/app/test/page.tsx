"use client"

import { useState } from "react"
import { Upload, Image, VolumeUp } from "lucide-react"
import Button from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ExpirationDateReader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleReadExpirationDate = () => {
    setIsProcessing(true)
    // ここで画像処理と音声出力のロジックを実装します
    setTimeout(() => {
      setIsProcessing(false)
      // 音声出力のシミュレーション
      const speech = new SpeechSynthesisUtterance("賞味期限は2024年5月31日です")
      window.speechSynthesis.speak(speech)
    }, 2000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">賞味期限リーダー</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">クリックして画像をアップロード</span></p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 800x400px)</p>
              </div>
              <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
          {imageUrl && (
            <div className="mt-4">
              <Image src={imageUrl} alt="Uploaded image" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}
          <Button 
            onClick={handleReadExpirationDate} 
            disabled={!imageUrl || isProcessing} 
            className="w-full"
          >
            {isProcessing ? "処理中..." : "賞味期限を読み取る"}
            <VolumeUp className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}