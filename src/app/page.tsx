import { Banner } from "@/components/Banner";
import { CardGrid } from "@/components/CardGrid";
import { Descricao } from "@/components/Descricao";
import { HallDaFama } from "@/components/Hall";

export default function Home() {
  return (
    <div className="space-y-12">
      <Banner />
      <CardGrid />
      <Descricao />
      <HallDaFama/>
    </div>
  );
}
