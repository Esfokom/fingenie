import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ModelsHero from "@/components/models-hero"
import FinGenieModel from "@/components/fingenie-model"
import BankoraModel from "@/components/bankora-model"
import ModelComparison from "@/components/model-comparison"

export default function ModelsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ModelsHero />
      <FinGenieModel />
      <BankoraModel />
      <ModelComparison />
      <Footer />
    </main>
  )
}

