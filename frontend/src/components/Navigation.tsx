'use client';

import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const items = [
  { id: 'home', label: 'Sobre mim', sections: ['home', 'about'] },
  { id: 'projects', label: 'Projetos', sections: ['projects'] },
  { id: 'experience', label: 'Experiência', sections: ['experience', 'education'] },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    let frameId = 0;
    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.36;
        const current = items.find(item => item.sections.some(sectionId => {
          const section = document.getElementById(sectionId);
          if (!section) return false;
          const bounds = section.getBoundingClientRect();
          return bounds.top <= marker && bounds.bottom > marker;
        })) ?? [...items].reverse().find(item => {
          const section = document.getElementById(item.sections[0]);
          return section && section.getBoundingClientRect().top <= marker;
        });
        if (current) setActive(value => value === current.id ? value : current.id);
        frameId = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const onHashChange = () => {
      const target = window.location.hash.slice(1);
      const item = items.find(candidate => candidate.sections.includes(target));
      if (item) setActive(item.id);
    };
    window.addEventListener('hashchange', onHashChange);
    onScroll();
    onHashChange();
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <header className="atlas-nav">
      <a className="atlas-brand" href="#home" aria-label="Ivanildo Barauna — início"><span />IB</a>
      <nav className={open ? 'is-open' : ''} aria-label="Navegação principal">
        {items.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'page' : undefined} onClick={() => { setActive(item.id); setOpen(false); }}>{item.label}</a>)}
      </nav>
      <button className="atlas-menu" onClick={() => setOpen(value => !value)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
        {open ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}
