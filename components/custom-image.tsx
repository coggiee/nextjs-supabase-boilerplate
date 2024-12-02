/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
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
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        setError(false);

        // const normalizedSrc = src.startsWith("./")
        //   ? src.replace("./", "/")
        //   : src;

        const response = await fetch(
          `/api/image?image=${encodeURIComponent(src)}&width=${width}&height=${height}&quality=${quality}`,
        ); // 이미지 API로 요청
        if (!response.ok) {
          setError(true);
          return;
        }

        const imageBlob = await response.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageSrc(objectURL);  // imageSrc를 설정한 뒤

      const preloadImage = new Image();
      preloadImage.src = objectURL; // 여기서 objectURL을 사용
      preloadImage.onload = () => setIsLoading(false);
      preloadImage.onerror = () => {
        setError(true);
        setIsLoading(false);
      };
      } catch (err) {
        console.error("Error while fetching image:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
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
