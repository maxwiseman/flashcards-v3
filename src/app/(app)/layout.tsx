
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
      <main className="p-8">{children}</main>
    </>
  );
}
