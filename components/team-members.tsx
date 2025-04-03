"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function TeamMembers() {
  const teamMembers = {
    management: [
      {
        name: "Ampah Emily Maureen",
        role: "Project Manager & Backend Developer",
        bio: "Leading the project and contributing to backend development with expertise in system architecture and API design.",
        initials: "AEM",
      },
    ],
    frontend: [
      {
        name: "Dumashie Bruce Klenam",
        role: "Frontend Developer",
        bio: "Specializing in creating responsive and intuitive user interfaces with modern web technologies.",
        initials: "DBK",
      },
      {
        name: "Nsiah Milcah Beatrice Owusuaa",
        role: "Frontend Developer",
        bio: "Focused on creating seamless user experiences and implementing UI components.",
        initials: "NMB",
      },
    ],
    backend: [
      {
        name: "Asaah Manasseh",
        role: "Backend Developer",
        bio: "Building robust server-side applications and database integrations.",
        initials: "AM",
      },
      {
        name: "Ampah Emily Maureen",
        role: "Backend Developer & Project Manager",
        bio: "Dual role in project management and backend development with a focus on system architecture.",
        initials: "AEM",
      },
    ],
    design: [
      {
        name: "Basoah Barima Owusu",
        role: "UI/UX Designer",
        bio: "Creating beautiful and functional designs that enhance user experience.",
        initials: "BBO",
      },
      {
        name: "Twumasi-Ankrah Nana Oduro",
        role: "UI/UX Designer",
        bio: "Specializing in user research and creating intuitive interface designs.",
        initials: "TNO",
      },
      {
        name: "Adjei Albert Arko",
        role: "UI/UX Designer",
        bio: "Focused on visual design and creating cohesive brand experiences.",
        initials: "AAA",
      },
    ],
    ml: [
      {
        name: "Elvis Fosu Owusu",
        role: "Machine Learning Engineer",
        bio: "Developing and fine-tuning AI models for financial data analysis and natural language processing.",
        initials: "EFO",
      },
    ],
    qa: [
      {
        name: "Kusi James",
        role: "Quality Assurance Engineer",
        bio: "Ensuring the highest standards of quality through comprehensive testing and validation.",
        initials: "KJ",
      },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="ml">ML</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground">
                Meet the talented students from Kwame Nkrumah University of Science and Technology who are working
                together to revolutionize banking through AI.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {Object.values(teamMembers)
                .flat()
                .map((member, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <TeamMemberCard member={member} />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="management">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Management</h2>
              <p className="text-muted-foreground">
                Our project management team ensures that FinGenie development stays on track and meets all objectives.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.management.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="frontend">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Frontend Development</h2>
              <p className="text-muted-foreground">
                Our frontend team creates the beautiful and responsive user interfaces that make FinGenie a joy to use.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.frontend.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="backend">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Backend Development</h2>
              <p className="text-muted-foreground">
                Our backend team builds the robust infrastructure that powers FinGenie's AI capabilities and data
                processing.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.backend.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="design">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">UI/UX Design</h2>
              <p className="text-muted-foreground">
                Our design team creates intuitive and beautiful user experiences that make banking conversations feel
                natural.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.design.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="ml">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Machine Learning</h2>
              <p className="text-muted-foreground">
                Our ML team develops and fine-tunes the AI models that power FinGenie's intelligent responses.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.ml.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Our University</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are proud students of Kwame Nkrumah University of Science and Technology (KNUST), one of Ghana's premier
            institutions for technology education and innovation.
          </p>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            As level 300 Computer Science students, we're applying our knowledge and skills to create solutions that
            address real-world challenges in the banking sector.
          </p>
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member }: { member: any }) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {member.initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
          <p className="text-sm text-muted-foreground mt-4">{member.bio}</p>

          <div className="flex space-x-3 mt-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

