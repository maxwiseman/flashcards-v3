"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { AspectRatio } from "./aspect-ratio";
import { Skeleton } from "./skeleton";

function Img(
  props: ImageProps & { className?: string; ratio?: number },
): React.ReactElement {
  const { className, ratio, ...imageprops } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setLoading(false);
    };
    img.src = props.src as string;
  }, [props.src]);

  if (loading) {
    return (
      <Skeleton
        className={cn(
          "relative h-full w-full border-[1px] border-border",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      {ratio ? (
        <AspectRatio ratio={ratio}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- This does have an alt prop, it just isn't obvious to ESLint */}
          <Image
            className={cn("object-cover", className)}
            fill
            placeholder={props.blurDataURL ? "blur" : "empty"}
            {...imageprops}
          />
        </AspectRatio>
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text -- This does have an alt prop, it just isn't obvious to ESLint
        <Image
          className={cn("object-cover", className)}
          fill
          placeholder={props.blurDataURL ? "blur" : "empty"}
          {...imageprops}
        />
      )}
    </div>
  );
}

export { Img as Image };
