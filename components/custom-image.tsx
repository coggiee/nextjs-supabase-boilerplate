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
  unOptimizeExternalImage?: boolean;
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
  blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0OgMAAUYBCAZFUJ4AAAAASUVORK5CYII=",
  unOptimizeExternalImage = false,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 이미지 사전 로딩 로직을 분리한 함수
    const handleImagePreloading = (imageSrc: string) => {
      setIsLoading(true);
      setError(false);

      const preloadImage = new Image();
      preloadImage.src = imageSrc;

      preloadImage.onload = () => {
        setImageSrc(imageSrc);
        setIsLoading(false);
      };

      preloadImage.onerror = () => {
        setError(true);
        setIsLoading(false);
      };
    };

    // 이미지 최적화 API 요청 함수
    const fetchOptimizedImage = async () => {
      try {
        const normalizedSrc = src.startsWith("./")
          ? src.replace("./", "/")
          : src;

        const response = await fetch(
          `/api/image?image=${encodeURIComponent(normalizedSrc)}&width=${width}&height=${height}&quality=${quality}`,
        );

        if (!response.ok) {
          setError(true);
          setIsLoading(false);
          return null;
        }

        const imageBlob = await response.blob();
        return URL.createObjectURL(imageBlob);
      } catch (err) {
        console.error("Error while fetching image:", err);
        setError(true);
        setIsLoading(false);
        return null;
      }
    };

    // 메인 로직
    const loadImage = async () => {
      // 최적화 여부에 따른 분기
      if (unOptimizeExternalImage) {
        handleImagePreloading(src);
      } else {
        const optimizedImageSrc = await fetchOptimizedImage();
        if (optimizedImageSrc) {
          handleImagePreloading(optimizedImageSrc);
        }
      }
    };

    loadImage();

    return () => {
      if (
        imageSrc &&
        ((!unOptimizeExternalImage &&
          !imageSrc.startsWith("http") &&
          !imageSrc.startsWith("https")) ||
          (unOptimizeExternalImage &&
            !imageSrc.startsWith("http") &&
            !imageSrc.startsWith("https")))
      ) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src, width, height, quality, unOptimizeExternalImage]);

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
          width: "100%",
          height: "100%",
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
      className={`${className}`}
      loading={priority ? "eager" : loading}
      style={{
        display: isLoading ? "none" : "block",
      }}
    />
  );
};
