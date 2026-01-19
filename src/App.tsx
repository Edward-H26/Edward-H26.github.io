import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import { Navigation } from "@/components/layout/Navigation"
import { usePageBoundaryScroll } from "@/hooks/usePageBoundaryScroll"
import { HomePage } from "@/pages/HomePage"
import { ResearchPage } from "@/pages/ResearchPage"
import { PublicationsPage } from "@/pages/PublicationsPage"
import { ExperiencePage } from "@/pages/ExperiencePage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { InfoPage } from "@/pages/InfoPage"

function App() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  usePageBoundaryScroll({ enabled: true })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.pathname])

  return (
    <>
      <Navigation onMenuClick={() => setMobileMenuOpen(true)} />
      <Routes location={location}>
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
