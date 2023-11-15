"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { api } from "@/trpc/react";

export function UnsplashImage({ ...props }): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const unsplash = api.unsplash.getImage.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  useEffect(() => {
    if (unsplash.isLoading || unsplash.data === undefined) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      setLoading(false);
    };
    img.src = unsplash.data.urls.regular;
  }, [unsplash.data, unsplash.isLoading]);
  const unsplashUTM = `?utm_source=${process.env.NEXT_PUBLIC_UNSPLASH_NAME}&utm_medium=referral&utm_campaign=api-credit`;

  return (
    <div {...props}>
      <p className="absolute bottom-0 right-0 z-50 m-5 text-right text-white">
        <Link
          className="hover:underline"
          href={`https://unsplash.com/photos/${unsplash.data?.id}${unsplashUTM}`}
          target="_blank"
        >
          Photo
        </Link>{" "}
        by <br />
        <Link
          className="hover:underline"
          href={unsplash.data?.user.links.html + unsplashUTM || ""}
          target="_blank"
        >
          {unsplash.data?.user.name}
        </Link>{" "}
        via{" "}
        <Link
          className="hover:underline"
          href={`https://unsplash.com${unsplashUTM}`}
          target="_blank"
        >
          Unsplash
        </Link>
      </p>
      {unsplash.data?.blur_hash && loading ? (
        <Blurhash
          className="absolute"
          hash={unsplash.data.blur_hash}
          height="100%"
          width="100%"
        />
      ) : null}
      {!loading ? (
        // eslint-disable-next-line @next/next/no-img-element -- I am using this because next/image is expensive and I'm cheap
        <img
          alt={unsplash.data?.alt_description}
          className="absolute h-[100%] max-h-[100vh] w-[100%] object-cover object-center"
          // title={
          //   image?.location?.name ||
          //   image?.description ||
          //   image?.user?.username ||
          //   "Unsplash Image"
          // }
          src={unsplash.data?.urls.regular}
        />
      ) : null}
    </div>
  );
}
