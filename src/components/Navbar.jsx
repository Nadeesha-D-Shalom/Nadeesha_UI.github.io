import { useEffect, useRef, useState } from 'react';

const links = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Education', target: 'education' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Certificates', target: 'certificates' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar({ visible }) {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const update = () => setScrolled(scrollY > 16); update(); addEventListener('scroll', update, { passive: true }); return () => removeEventListener('scroll', update); }, []);
  useEffect(() => {
    const closeOnEscape = event => event.key === 'Escape' && setMenuOpen(false);
    const closeOnDesktop = () => innerWidth > 600 && setMenuOpen(false);
    const closeOnOutsideTap = event => !headerRef.current?.contains(event.target) && setMenuOpen(false);
    const closeOnScroll = () => setMenuOpen(false);
    addEventListener('keydown', closeOnEscape);
    addEventListener('resize', closeOnDesktop);
    addEventListener('pointerdown', closeOnOutsideTap);
    addEventListener('scroll', closeOnScroll, { passive: true });
    return () => {
      removeEventListener('keydown', closeOnEscape);
      removeEventListener('resize', closeOnDesktop);
      removeEventListener('pointerdown', closeOnOutsideTap);
      removeEventListener('scroll', closeOnScroll);
    };
  }, [menuOpen]);

  return <header ref={headerRef} className={`apple-glass-nav ${visible ? 'visible' : ''} ${scrolled ? 'compact' : ''} ${menuOpen ? 'menu-open' : ''}`}>
    <a className="hero-brand" href="#home"><strong>Nadeesha D Shalom</strong><span>Software Engineer</span></a>
    <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(open => !open)}>
      <span/><span/><span/>
    </button>
    <nav id="primary-navigation" aria-label="Primary navigation">{links.map((link, index) => <a key={link.target} href={`#${link.target}`} onClick={() => setMenuOpen(false)}><small>{String(index + 1).padStart(2, '0')}</small>{link.label}</a>)}</nav>
  </header>;
}
