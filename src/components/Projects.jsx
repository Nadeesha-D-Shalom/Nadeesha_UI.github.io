import { useEffect, useMemo, useRef, useState } from 'react';
import NetworkBackdrop from './NetworkBackdrop';

const projects = [
  { name: 'HR & ERP Management System', category: 'Enterprise', description: 'Production-oriented platform unifying HR, attendance, inventory, assets, BOM, shipments, and reporting.', tech: ['React', 'Spring Boot', 'SQL Server', 'JWT'], status: 'Production Ready', github: 'https://github.com/Nadeesha-D-Shalom/Ceymoslanka_HR-ERP_System', featured: true, metrics: ['12 modules', '25+ features'] },
  { name: 'UrbanX-AI', category: 'AI', description: 'Smart-city digital twin for infrastructure monitoring, road-damage detection, predictive maintenance, and risk analysis.', tech: ['React', 'ASP.NET Core', 'Python', 'Computer Vision'], status: 'In Progress', featured: true, metrics: ['Digital twin', 'Predictive AI'] },
  { name: 'Hospital Management Mobile Application', category: 'Mobile', description: 'Olympus Lanka Hospital platform with secure patient and administrator access, OTP recovery, doctor management, appointment workflows, complaints, reports, and responsive dashboards.', tech: ['React Native (Expo)', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'AWS'], status: 'Feb — May 2026', github: 'https://github.com/Nadeesha-D-Shalom/Hospital_Management_Mobile_Application', featured: true, metrics: ['SLIIT WMT 2026', 'AWS backend'] },
  { name: 'Student LMS with AI', category: 'AI', description: 'Learning platform with an AI tutor, recommendations, analytics, and role-based academic workflows.', tech: ['Go', 'React', 'Python', 'Ollama'], github: 'https://github.com/Nadeesha-D-Shalom/Student_LMS_with_AI-ML', status: 'Repository' },
  { name: 'TeaWeb Export Platform', category: 'Full Stack', description: 'Commercial tea-export platform with product operations and mood-based recommendations.', tech: ['React', 'PHP', 'MySQL'], live: 'https://ceaymoslanka.com', status: 'Live' },
  { name: 'MrVilz Website', category: 'Full Stack', description: 'High-performance MERN portfolio with dynamic project content, secure APIs, responsive UX, contact workflows, and SEO-focused architecture.', tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'], live: 'https://www.mrvilz.com/', status: 'Apr — May 2026' },
  { name: 'Mini Hackathon 2026', category: 'Leadership', description: 'Official event website delivered through project planning, team coordination, and technical leadership.', tech: ['React', 'TypeScript', 'Tailwind CSS'], github: 'https://github.com/ms-club-sliit/minihackathon-2026', status: 'Delivered' },
  { name: 'University Timetable Management', category: 'Enterprise', description: 'Constraint-aware lecture scheduling with classroom, capacity, availability, and conflict management.', tech: ['Go', 'React', 'SQL Server'], status: 'In Development' },
  { name: 'SkyLinkAir', category: 'Full Stack', description: 'Airline reservation platform for flights, bookings, pricing, authentication, and administration.', tech: ['Spring Boot', 'React', 'MySQL'], github: 'https://github.com/Nadeesha-D-Shalom/Airline_Reservation_System', status: 'Repository' },
  { name: 'CASPER50 Rescue Boat', category: 'IoT', description: 'Autonomous emergency-response boat with long-range communication, navigation, and live sensing.', tech: ['ESP32', 'LoRa', 'GPS', 'Arduino'], status: 'Prototype' },
  { name: 'Diabetes Prediction', category: 'AI', description: 'Healthcare risk classifier built with preprocessing, feature engineering, and evaluated ML metrics.', tech: ['Python', 'Scikit-learn', 'Pandas'], status: '83.45% accuracy' },
  { name: 'SMS Spam Classifier', category: 'AI', description: 'NLP classifier using text preprocessing, TF-IDF vectors, and Multinomial Naive Bayes.', tech: ['Python', 'NLTK', 'Scikit-learn'], github: 'https://github.com/Nadeesha-D-Shalom/Spam-sms-classifier', status: 'Repository' },
  { name: 'Vehicle Rental Platform', category: 'Web', description: 'Booking and fleet-management system with packages, ratings, availability, and administration.', tech: ['Java', 'JSP', 'Servlets', 'Bootstrap'], github: 'https://github.com/Nadeesha-D-Shalom/VehicleRentalSystem', status: 'Repository' },
  { name: 'Photography Booking Platform', category: 'Web', description: 'Service marketplace for photography, videography, drone bookings, packages, and ratings.', tech: ['Java', 'JSP', 'Servlets'], github: 'https://github.com/Nadeesha-D-Shalom/VideoandPhotographyWeb', status: 'Repository' },
  { name: 'Smart Watering System', category: 'IoT', description: 'Automated irrigation with soil monitoring and mobile control for efficient water use.', tech: ['Arduino', 'C++', 'IoT'], github: 'https://github.com/NadeeshaShalom8219/watering-system-project', status: 'Prototype' },
  { name: 'Auto Rover', category: 'IoT', description: 'Bluetooth-controlled rover with ultrasonic obstacle detection and autonomous movement.', tech: ['Arduino', 'C++', 'Bluetooth'], github: 'https://github.com/NadeeshaShalom8219/AutoRover', status: 'Prototype' },
  { name: 'Android IoT Monitor', category: 'Mobile', description: 'Mobile interface for monitoring environmental IoT data and controlling connected devices.', tech: ['Android', 'Java', 'IoT'], status: 'Private' },
  { name: 'Full-Stack Android App', category: 'Mobile', description: 'Connected mobile application backed by REST services and persistent relational storage.', tech: ['Kotlin', 'Java', 'MySQL', 'REST APIs'], status: 'Private' },
  { name: 'YC Startup Scraper', category: 'Research', description: 'Automation utility that collects and structures startup data for ecosystem analysis.', tech: ['Python', 'Automation'], github: 'https://github.com/Nadeesha-D-Shalom/yc_scraper', status: '500+ records' },
  { name: 'Nadeesha Portfolio', category: 'Web', description: 'Responsive engineering portfolio with an immersive image reveal and polished motion system.', tech: ['React', 'Vite', 'CSS'], github: 'https://github.com/Nadeesha-D-Shalom', status: 'Current' },
];

const filters = ['All', 'Enterprise', 'AI', 'Full Stack', 'Mobile', 'IoT', 'Web', 'Leadership', 'Research'];

function ProjectLinks({ project }) {
  if (!project.github && !project.live) return <span className="project-availability">{project.status}</span>;
  return <div className="project-links">
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live ↗</a>}
    {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
  </div>;
}

export default function Projects() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef(null);
  const featured = projects.filter(project => project.featured);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter(project => !project.featured)
      .filter(project => filter === 'All' || project.category === filter)
      .filter(project => !term || [project.name, project.category, project.description, ...project.tech].join(' ').toLowerCase().includes(term));
  }, [query, filter]);
  const visible = expanded ? filtered : filtered.slice(0, 5);
  const toggleArchive = () => {
    if (expanded) {
      setQuery('');
      setFilter('All');
    }
    setExpanded(value => !value);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: .1, rootMargin: '-3% 0px -8%' });
    section.querySelectorAll('[data-project-reveal]').forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <section className="projects-section" id="projects" ref={sectionRef} aria-labelledby="projects-title">
    <NetworkBackdrop />
    <header className="projects-heading" data-project-reveal>
      <span>03 / SOFTWARE ARCHIVE</span>
      <h2 id="projects-title">Systems built for <em>real impact.</em></h2>
      <p>Enterprise software · Artificial intelligence · Full-stack products · Mobile · IoT</p>
    </header>

    <div className="featured-projects" aria-label="Featured projects">
      {featured.map((project, index) => <article key={project.name} data-project-reveal style={{ '--project-delay': `${index * 90}ms` }}>
        <div className="featured-index"><span>0{index + 1} / FEATURED</span><time>{project.status}</time></div>
        <div>
          <span className="project-category">{project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <ul>{project.tech.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <footer>
          <div>{project.metrics.map(metric => <span key={metric}>{metric}</span>)}</div>
          <ProjectLinks project={project} />
        </footer>
      </article>)}
    </div>

    <div className="project-explorer" data-project-reveal>
      <header>
        <div>
          <span>{expanded ? 'PROJECT ARCHIVE' : 'SELECTED PROJECTS'}</span>
          <strong>{expanded ? `${String(filtered.length).padStart(2, '0')} entries` : 'A focused selection of recent work'}</strong>
        </div>
        {expanded && <label>
          <span className="sr-only">Search projects</span>
          <input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Search projects or technology" />
        </label>}
      </header>
      {expanded && <div className="project-filters" aria-label="Filter projects">
        {filters.map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}
      </div>}
      <div className="project-rows" aria-live="polite">
        {visible.map((project, index) => <article className="project-archive-row" key={`${expanded}-${filter}-${project.name}`} style={{'--row-delay':`${Math.min(index,16)*55}ms`}}>
          <small>{String(index + 1).padStart(2, '0')}</small>
          <div className="project-row-main"><span>{project.category}</span><h3>{project.name}</h3><p>{project.description}</p></div>
          <ul>{project.tech.map(item => <li key={item}>{item}</li>)}</ul>
          <ProjectLinks project={project} />
        </article>)}
        {!visible.length && <p className="project-empty">No projects match this search.</p>}
      </div>
      <button className="project-expand" type="button" onClick={toggleArchive} aria-expanded={expanded}>
        <span>{expanded ? 'Show selected projects' : 'Explore project archive'}</span>
        <small>{expanded ? 'Collapse archive' : `View ${Math.max(0, filtered.length - 5)} more projects`}</small>
        <i aria-hidden="true">{expanded ? '↑' : '↓'}</i>
      </button>
    </div>

    <footer className="project-stats" data-project-reveal>
      <div><strong>20+</strong><span>Projects</span></div>
      <div><strong>15+</strong><span>Technologies</span></div>
      <div><strong>8</strong><span>Domains</span></div>
      <p>Enterprise · AI · Cloud · IoT · Mobile · Research · Leadership</p>
    </footer>
  </section>;
}
