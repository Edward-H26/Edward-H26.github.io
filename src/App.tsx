import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import { Navigation } from "@/components/layout/Navigation"
import { HomePage } from "@/pages/HomePage"
import { ResearchPage } from "@/pages/ResearchPage"
import { PublicationsPage } from "@/pages/PublicationsPage"
import { ExperiencePage } from "@/pages/ExperiencePage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { InfoPage } from "@/pages/InfoPage"

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navigation onMenuClick={() => setMobileMenuOpen(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              mobileMenuOpen={mobileMenuOpen}
              onMobileMenuClose={() => setMobileMenuOpen(false)}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="info" element={<InfoPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
