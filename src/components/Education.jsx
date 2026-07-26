import { useEffect, useRef } from 'react';
import sliitLogo from '../../assets/img/sliit-logo.png';
import pibtLogo from '../../assets/img/pibt.png';
import debarawewaLogo from '../../assets/img/debarawewa-cc.png';
import englishScoreLogo from '../../assets/img/british-c.png';

const education = [
  {
    institution: 'SLIIT',
    credential: 'BSc (Hons)',
    field: 'in Software Engineering',
    period: 'Jul 2024 — Present',
    description: 'Developing production-ready software through modern engineering, architecture, and practical project work.',
    logo: sliitLogo,
    url: 'https://www.linkedin.com/in/nadeesha-shalom-a5a2a4251/details/education/',
  },
  {
    institution: 'Pioneer Institute of Business and Technology',
    credential: 'Higher Diploma',
    field: 'in Software Engineering',
    period: '2019 — 2021',
    description: 'Built a practical foundation in programming, databases, software design, and application development.',
    logo: pibtLogo,
    url: 'https://www.linkedin.com/in/nadeesha-shalom-a5a2a4251/details/education/',
  },
  {
    institution: 'Debarawewa National College',
    credential: 'G.C.E. O/L & A/L',
    field: 'in Commerce',
    period: '2013 — 2021',
    description: 'Studied Accounting, Business Studies, and ICT, while serving as Deputy Head Prefect in 2018.',
    logo: debarawewaLogo,
    url: 'https://www.linkedin.com/in/nadeesha-shalom-a5a2a4251/details/education/',
  },
  {
    institution: 'EnglishScore',
    credential: 'English Language',
    field: 'and Literature',
    period: 'Jan 2019 — Apr 2019',
    description: 'Strengthened professional reading, writing, listening, and spoken communication skills.',
    logo: englishScoreLogo,
    url: 'https://www.linkedin.com/in/nadeesha-shalom-a5a2a4251/details/education/',
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)),
      { threshold: 0.14, rootMargin: '-4% 0px -8% 0px' },
    );
    section.querySelectorAll('[data-education-reveal]').forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="education-section" id="education" ref={sectionRef} aria-labelledby="education-title">
      <header className="education-heading">
        <span>02 / EDUCATION</span>
        <h2 id="education-title">Academic <em>foundation.</em></h2>
        <p>Formal study supported by practical software engineering experience and continuous independent learning.</p>
      </header>

      <div className="education-list">
        {education.map((item, index) => (
          <article key={item.institution} data-education-reveal style={{ '--education-delay': `${index * 100}ms` }}>
            <div className="education-logo">
              <img src={item.logo} alt={`${item.institution} logo`} />
            </div>
            <div className="education-content">
              <small>0{index + 1}</small>
              <p className="education-degree"><strong>{item.credential}</strong> {item.field}</p>
              <h3><a href={item.url} target="_blank" rel="noreferrer">{item.institution}<span aria-hidden="true">↗</span></a></h3>
              <p className="education-description">{item.description}</p>
            </div>
            <time>{item.period}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
