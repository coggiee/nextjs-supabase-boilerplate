import path from "path";
import crypto from "crypto";

import sharp from "sharp";
import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";

// 파일 이름 해시 생성 (요청 파라미터 포함)
const generateImageFileHash = (
  imageUrl: string,
  width: number,
  height: number,
  quality: number,
) => {
  const hashInput = `${imageUrl}-${width}-${height}-${quality}`;
  return crypto.createHash("md5").update(hashInput).digest("hex");
};

// 이미지 다운로드 및 처리 함수
const downloadAndProcessImage = async (
  imageUrl: string,
  width: number,
  height: number,
  quality: number,
) => {
  const response = await fetch(imageUrl);
  if (!response.ok)
    throw new Error(`Failed to fetch image: ${response.statusText}`);

  const buffer = await response.buffer();
  return await sharp(buffer)
    .resize({ width, height, fit: "cover" })
    .webp({ quality })
    .toBuffer(); // 파일 시스템에 저장하지 않고, 메모리에서 Buffer로 반환
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawImagePath =
    searchParams.get("image") || "./public/landing-object.webp";
  const width = parseInt(searchParams.get("width") || "200", 10);
  const height = parseInt(searchParams.get("height") || "200", 10);
  const quality = parseInt(searchParams.get("quality") || "80", 10);

  const fileHash = generateImageFileHash(rawImagePath, width, height, quality);

  try {
    let imageBuffer;

    if (
      rawImagePath.startsWith("http://") ||
      rawImagePath.startsWith("https://")
    ) {
      // 외부 이미지 처리
      imageBuffer = await downloadAndProcessImage(
        rawImagePath,
        width,
        height,
        quality,
      );
    } else {
      // 로컬 파일 처리
      const localImagePath = path.join(process.cwd(), "public", rawImagePath); // public 폴더 경로
      imageBuffer = await sharp(localImagePath)
        .resize({ width, height, fit: "cover" })
        .webp({ quality })
        .toBuffer();
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        ETag: `"${fileHash}"`,
      },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { error: "Image processing failed", details: (error as any).message },
      { status: 500 },
    );
  }
}
