"use client";

import React, { useState, useEffect } from "react";

interface CustomImageProps {
  src: string; // 이미지 원본 URL 또는 API endpoint에서 사용할 이미지 경로
  alt: string; // 대체 텍스트
  width?: number; // 이미지 너비
  height?: number; // 이미지 높이
  quality?: number; // 이미지 품질
  className?: string; // 추가 클래스
  loading?: "lazy" | "eager"; // 로딩 방식
  priority?: boolean; // 우선 로드 여부
  placeholder?: "blur" | "empty"; // 플레이스홀더
  blurDataURL?: string; // 블러 효과 이미지 URL
}

export const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width = 200,
  height = 200,
  quality = 80,
  className = "",
  loading = "lazy",
  priority = false,
  placeholder = "empty",
  blurDataURL = "",
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 렌더링할 이미지 URL
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(false); // 에러 상태

  // API Route를 사용하여 이미지 URL 생성
  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        setError(false);

        // API Route를 통해 처리된 이미지 URL 생성
        const apiUrl = `/api/image?image=${encodeURIComponent(src)}&width=${width}&height=${height}&quality=${quality}`;
        setImageSrc(apiUrl);

        // 이미지 사전 로드
        const preloadImage = new Image();
        preloadImage.src = apiUrl;
        preloadImage.onload = () => setIsLoading(false);
        preloadImage.onerror = () => {
          setError(true);
          setIsLoading(false);
        };
      } catch (err) {
        console.error("Error while fetching image:", err);
        setError(true);
      }
    };

    fetchImage();
  }, [src, width, height, quality]);

  if (error) {
    return (
      <div className={`error-image ${className}`}>Failed to load image</div>
    );
  }

  if (placeholder === "blur" && isLoading) {
    return (
      <div
        className={`image-placeholder ${className}`}
        style={{
          backgroundImage: `url(${blurDataURL})`,
          backgroundSize: "cover",
          width,
          height,
        }}
      />
    );
  }

  return (
    <img
      src={imageSrc || undefined}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      loading={priority ? "eager" : loading}
      style={{
        display: isLoading ? "none" : "block",
      }}
    />
  );
};
