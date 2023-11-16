import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";

export const metadata = {
  title: "Flashcards",
  description: "By Max Wiseman",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <Navbar />
      <main className="p-8">{children}</main>
    </>
  );
}
