'use client';
import { useEffect } from 'react';
import { useExperience } from './experience/hooks/useExperience';
import { useProjects } from './projects/hooks/useProjects';
import { useEducation } from './education/hooks/useEducation';
import { useSocialLinks } from './social-links/hooks/useSocialLinks';
import Loading from '@/components/Loading';
import AlertMessage from '@/components/AlertMessage';
import PortfolioExperience from '@/components/PortfolioExperience';

export default function Home() {
  const { experiences, loading: loadingExpData, error: errorExpData } = useExperience();
  const { projects, loading: loadingProjData, error: errorProjData } = useProjects();
  const { formations, certifications, loading: loadingEduData, error: errorEduData } = useEducation();
  const { socialLinks, loading: loadingSocialLinks, error: errorSocialLinks } = useSocialLinks();

  const isLoading = loadingExpData || loadingProjData || loadingEduData || loadingSocialLinks;

  const hasError = errorExpData || errorProjData || errorEduData || errorSocialLinks;

  useEffect(() => {
    if (isLoading || hasError || !window.location.hash) return;

    const targetId = decodeURIComponent(window.location.hash.slice(1));
    let cancelled = false;

    const jumpToTarget = () => {
      if (cancelled) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      root.style.scrollBehavior = previousScrollBehavior;
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(jumpToTarget);
    });
    const layoutSettledTimeout = window.setTimeout(jumpToTarget, 240);
    document.fonts?.ready.then(jumpToTarget);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(layoutSettledTimeout);
    };
  }, [hasError, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return (
      <AlertMessage 
        message="Erro ao carregar dados"
        severity="error"
      />
    );
  }

  return <PortfolioExperience
    experiences={experiences}
    projects={projects}
    formations={formations}
    certifications={certifications}
    socialLinks={socialLinks}
  />;
}
