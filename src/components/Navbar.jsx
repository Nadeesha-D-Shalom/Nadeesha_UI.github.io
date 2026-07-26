import { useEffect, useState } from 'react';

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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(scrollY > 16); update(); addEventListener('scroll', update, { passive: true }); return () => removeEventListener('scroll', update); }, []);
  return <header className={`apple-glass-nav ${visible ? 'visible' : ''} ${scrolled ? 'compact' : ''}`}>
    <a className="hero-brand" href="#home"><strong>Nadeesha D Shalom</strong><span>Software Engineer</span></a>
    <nav aria-label="Primary navigation">{links.map(link => <a key={link.target} href={`#${link.target}`}>{link.label}</a>)}</nav>
  </header>;
}
