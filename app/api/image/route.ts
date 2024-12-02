import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

import sharp from "sharp";
import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";

// 캐시 디렉토리 기본 경로
const CACHE_DIR = path.join(process.cwd(), ".next", "cache", "images");

// 폴더 해시 생성 (이미지 URL 기반)
const generateImageFolderHash = (imageUrl: string) => {
  return crypto.createHash("md5").update(imageUrl).digest("hex");
};

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

// 캐시 디렉토리 존재 확인 및 생성
const ensureCacheDir = async (dirPath: string) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error("Failed to create directory:", error);
  }
};

// 기존 파일 삭제 함수
const deleteExistingFiles = async (folderPath: string) => {
  try {
    const files = await fs.readdir(folderPath);
    const deletePromises = files.map(file =>
      fs.unlink(path.join(folderPath, file)),
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Failed to delete existing files:", error);
  }
};

// 이미지 다운로드 및 처리 함수
const downloadAndProcessImage = async (
  imageUrl: string,
  cachedImagePath: string,
  width: number,
  height: number,
  quality: number,
) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`);

    const buffer = await response.buffer();
    await sharp(buffer)
      .resize({ width, height, fit: "cover" })
      .webp({ quality })
      .toFile(cachedImagePath);
  } catch (error) {
    console.error("Image processing error:", error);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawImagePath =
    searchParams.get("image") || "./public/landing-object.webp";
  const width = parseInt(searchParams.get("width") || "200", 10);
  const height = parseInt(searchParams.get("height") || "200", 10);
  const quality = parseInt(searchParams.get("quality") || "80", 10);

  const folderHash = generateImageFolderHash(rawImagePath);
  const fileHash = generateImageFileHash(rawImagePath, width, height, quality);

  const imageFolderPath = path.join(CACHE_DIR, folderHash);
  const cachedImagePath = path.join(imageFolderPath, `${fileHash}.webp`);

  await ensureCacheDir(imageFolderPath);

  try {
    let isCached = true;

    try {
      await fs.access(cachedImagePath);
    } catch {
      isCached = false;
    }

    if (!isCached) {
      await deleteExistingFiles(imageFolderPath);

      if (
        rawImagePath.startsWith("http://") ||
        rawImagePath.startsWith("https://")
      ) {
        await downloadAndProcessImage(
          rawImagePath,
          cachedImagePath,
          width,
          height,
          quality,
        );
      } else {
        const localImagePath = path.join(
          process.cwd(),
          rawImagePath.replace(/^\.\//, ""),
        );
        await sharp(localImagePath)
          .resize({ width, height, fit: "cover" })
          .webp({ quality })
          .toFile(cachedImagePath);
      }
    }

    const imageBuffer = await fs.readFile(cachedImagePath);
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=3600, immutable",
        "Last-Modified": new Date().toUTCString(),
        ETag: `"${fileHash}"`,
        Vary: "Accept",
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
