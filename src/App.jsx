import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Projects from './pages/Projects.jsx';

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('common.seo.title');

    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute('content', t('common.seo.description'));
  }, [i18n.resolvedLanguage, t]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
