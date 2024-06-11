import Image from "next/image";

import { Test, Button } from "shared";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Test />
      <Button>button</Button>
    </main>
  );
}
