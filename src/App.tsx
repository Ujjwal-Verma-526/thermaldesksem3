import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { useStore } from './lib/store'
import { Dashboard } from './pages/Dashboard'
import { SyllabusPage } from './pages/Syllabus'
import { TopicPage } from './pages/TopicPage'
import { ExamplesPage, ExampleDetailPage } from './pages/Examples'
import { QuestionsPage } from './pages/Questions'
import { FormulasPage } from './pages/Formulas'
import { DiagramsPage } from './pages/Diagrams'
import { RevisionPage } from './pages/Revision'
import { PapersPage, PaperPage } from './pages/Papers'
import { NotFound } from './pages/NotFound'

function useApplyTheme() {
  const theme = useStore((s) => s.theme)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') delete root.dataset.theme
    else root.dataset.theme = theme
  }, [theme])
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  useApplyTheme()
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/syllabus" element={<SyllabusPage />} />
        <Route path="/topic/:topicId" element={<TopicPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/examples/:exampleId" element={<ExampleDetailPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/formulas" element={<FormulasPage />} />
        <Route path="/diagrams" element={<DiagramsPage />} />
        <Route path="/revision" element={<RevisionPage />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/papers/:paperId" element={<PaperPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
