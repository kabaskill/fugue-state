import GameManager from "@/components/GameManager";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <main className={`flex flex-col items-center justify-between mx-auto ${inter.className}`}>
      <h1 className="text-4xl font-bold p-8">Fugue State</h1>

      <GameManager />
    </main>
  );
}
