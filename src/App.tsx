import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import { HomePage } from "@/pages/HomePage"
import { ResearchPage } from "@/pages/ResearchPage"
import { PublicationsPage } from "@/pages/PublicationsPage"
import { ExperiencePage } from "@/pages/ExperiencePage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { InfoPage } from "@/pages/InfoPage"

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="info" element={<InfoPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
