import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BootScreen from './components/era/BootScreen.jsx';
import EraResetControl from './components/era/EraResetControl.jsx';
import Layout from './components/layout/Layout.jsx';
import MainframeAbout from './components/mainframe/MainframeAbout.jsx';
import MainframeAboutNaguirrel from './components/mainframe/MainframeAboutNaguirrel.jsx';
import MainframeAboutNorman from './components/mainframe/MainframeAboutNorman.jsx';
import MainframeContact from './components/mainframe/MainframeContact.jsx';
import MainframeHome from './components/mainframe/MainframeHome.jsx';
import MainframeProjectDetail from './components/mainframe/MainframeProjectDetail.jsx';
import MainframeProjects from './components/mainframe/MainframeProjects.jsx';
import MainframeShell from './components/mainframe/MainframeShell.jsx';
import PixelDesktopShell from './components/pixel-desktop/PixelDesktopShell.jsx';
import { useEra } from './context/EraContext.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Projects from './pages/Projects.jsx';

export default function App() {
  const { t, i18n } = useTranslation();
  const { hasSelectedEra, selectedEra } = useEra();

  useEffect(() => {
    document.title = t('common.seo.title');

    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute('content', t('common.seo.description'));
  }, [i18n.resolvedLanguage, t]);

  if (!hasSelectedEra) {
    return <BootScreen />;
  }

  if (selectedEra === 'mainframe') {
    return (
      <Routes>
        <Route element={<MainframeShell />}>
          <Route path="/" element={<MainframeHome />} />
          <Route path="/about" element={<MainframeAbout />} />
          <Route path="/about/norman" element={<MainframeAboutNorman />} />
          <Route path="/about/naguirrel" element={<MainframeAboutNaguirrel />} />
          <Route path="/projects" element={<MainframeProjects />} />
          <Route path="/projects/:slug" element={<MainframeProjectDetail />} />
          <Route path="/contact" element={<MainframeContact />} />
        </Route>
      </Routes>
    );
  }

  if (selectedEra === 'pixel-desktop') {
    return (
      <Routes>
        <Route element={<PixelDesktopShell />}>
          <Route path="/" element={null} />
          <Route path="/about" element={null} />
          <Route path="/projects" element={null} />
          <Route path="/projects/:slug" element={null} />
          <Route path="/contact" element={null} />
          <Route path="/settings" element={null} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
      <EraResetControl />
    </>
  );
}
