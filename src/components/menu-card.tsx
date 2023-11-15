import Link from "next/link";
import "@/styles/cards.css";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function MenuCard(): React.ReactElement {
  return (
    <Link
      className="min-w-[580px] max-w-[50%] flex-shrink flex-grow"
      href="/cards/set/123"
    >
      <Card className="flex h-48 min-h-min w-[580px] min-w-full flex-row flex-nowrap gap-6 p-4">
        <div className="cardSlot">
          <div className="bottomCard" />
          <div className="middleCard" />
          <div className="topCard">Todos los dias</div>
        </div>
        <div>
          <CardTitle className="bg-car text-lg font-semibold">
            Spanish Module 1 Vocab
          </CardTitle>
          <CardDescription className="line-clamp-5">
            Cillum adipisicing cupidatat dolor quis ad nisi. Do consectetur aute
            consequat esse nostrud dolor ullamco fugiat. Enim in cupidatat
            cupidatat do reprehenderit duis occaecat proident. Fugiat sint ipsum
            consequat voluptate aliqua nulla aute ullamco reprehenderit officia
            nostrud mollit. Ut sit aliquip reprehenderit do eiusmod labore
            pariatur qui amet aliqua. Incididunt commodo eiusmod irure laboris
            Lorem ea eu culpa qui.
          </CardDescription>
        </div>
      </Card>
    </Link>
  );
}
