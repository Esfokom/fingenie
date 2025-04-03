import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TeamHero from "@/components/team-hero"
import TeamMembers from "@/components/team-members"

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <TeamHero />
      <TeamMembers />
      <Footer />
    </main>
  )
}

