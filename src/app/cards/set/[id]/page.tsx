"use client";

import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Flashcard } from "@/components/flashcard";

export default function Page({
  params,
}: {
  params: { id: string };
}): React.ReactElement {
  const { setTheme, theme } = useTheme();
  const scroll = useRef(null);

  return (
    <>
      <div className="flex flex-nowrap justify-between">
        <h1 className="text-4xl font-bold">{params.id}</h1>
        <Button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <Pencil className="h-4 w-4" /> Edit
        </Button>
      </div>
      <Separator className="my-6" />
      <div
        // className='overflow-x-scroll overflow-y-hidden whitespace-nowrap w-full snap-x snap-mandatory snap-center'
        className="relative h-max w-1/2"
      >
        <div
          className="no-scrollbar relative flex w-full flex-none snap-x snap-mandatory overflow-auto scroll-smooth"
          ref={scroll}
        >
          {exampleSet.map((card, i) => {
            return (
              <div className="relative min-w-full snap-center" key={card.front}>
                <Flashcard card={card} index={i} />
              </div>
            );
          })}
        </div>
        <Button
          className="absolute left-4 top-1/2 translate-y-[-50%]"
          onClick={() => {
            // @ts-expect-error -- This should be fine
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- This is ok
            scroll.current?.scrollBy({ left: -100, type: "smooth" });
          }}
          size="icon"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          className="absolute right-4 top-1/2 translate-y-[-50%]"
          onClick={() => {
            // @ts-expect-error -- This should be fine
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- This is ok
            scroll.current?.scrollBy({ left: 100, type: "smooth" });
          }}
          size="icon"
          variant="outline"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

const exampleSet: { front: string; back: string }[] = [
  {
    front: "Lorem",
    back: "The",
  },
  {
    front: "Ipsum",
    back: "Internet",
  },
  {
    front: "Dolor",
    back: "Itself",
  },
  {
    front: "Sit",
    back: "Is",
  },
  {
    front: "Amet",
    back: "Pain",
  },
];
