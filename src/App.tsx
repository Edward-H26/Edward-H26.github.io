import { useState, lazy, Suspense } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import { Layout } from "@/components/layout/Layout"
import { Navigation } from "@/components/layout/Navigation"
import { usePageBoundaryScroll } from "@/hooks/usePageBoundaryScroll"
import { useNavigationSource } from "@/contexts/NavigationContext"
import { HomePage } from "@/pages/HomePage"

const ResearchPage = lazy(() => import("@/pages/ResearchPage").then(m => ({ default: m.ResearchPage })))
const PublicationsPage = lazy(() => import("@/pages/PublicationsPage").then(m => ({ default: m.PublicationsPage })))
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage").then(m => ({ default: m.ExperiencePage })))
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })))
const InfoPage = lazy(() => import("@/pages/InfoPage").then(m => ({ default: m.InfoPage })))

function App() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resetSource } = useNavigationSource()

  usePageBoundaryScroll({ enabled: false })

  const handleExitComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" })
    resetSource()
  }

  return (
    <>
      <Navigation onMenuClick={() => setMobileMenuOpen(true)} />
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <Routes location={location} key={location.pathname}>
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
            <Route path="research" element={<Suspense fallback={null}><ResearchPage /></Suspense>} />
            <Route path="publications" element={<Suspense fallback={null}><PublicationsPage /></Suspense>} />
            <Route path="experience" element={<Suspense fallback={null}><ExperiencePage /></Suspense>} />
            <Route path="projects" element={<Suspense fallback={null}><ProjectsPage /></Suspense>} />
            <Route path="info" element={<Suspense fallback={null}><InfoPage /></Suspense>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
