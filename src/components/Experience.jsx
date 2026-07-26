import { useEffect, useRef } from 'react';
import NetworkBackdrop from './NetworkBackdrop';
import msClubLogo from '../../assets/img/msclub.png';
import fcscLogo from '../../assets/img/fcsc.png';
import schoolLogo from '../../assets/img/debarawewa-cc.png';

const supportingRoles=[
  {
    organization:'Faculty of Computing Student Community',
    role:'Subcommittee Member',
    period:'Apr 2025 — Jan 2026',
    description:'Supported student events, community outreach, and communication between the faculty and student body.',
    logo:fcscLogo,
  },
  {
    organization:'Debarawewa Central College',
    role:'Deputy Head Prefect',
    period:'Feb 2018 — Dec 2018',
    description:'Led student coordination, discipline, and school activities while collaborating with teachers, prefects, and peers.',
    logo:schoolLogo,
  },
];

export default function Experience(){
  const sectionRef=useRef(null);

  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.12,rootMargin:'-3% 0px -8%'});
    section.querySelectorAll('[data-experience-reveal]').forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);

  return <section className="experience-section" id="experience" ref={sectionRef} aria-labelledby="experience-title">
    <NetworkBackdrop/>
    <header className="experience-heading" data-experience-reveal>
      <span>05 / EXPERIENCE</span>
      <h2 id="experience-title">Leadership through <em>contribution.</em></h2>
      <p>Community roles that strengthened collaboration, project coordination, communication, and responsible leadership.</p>
    </header>

    <article className="primary-experience" data-experience-reveal>
      <header>
        <div className="experience-logo"><img src={msClubLogo} alt="MS Club of SLIIT logo"/></div>
        <div>
          <span>PRIMARY EXPERIENCE</span>
          <h3><a href="https://www.linkedin.com/company/49142926/" target="_blank" rel="noreferrer">MS Club of SLIIT ↗</a></h3>
          <p><strong>Full-time · 4 mos</strong><span>Sri Lanka</span></p>
        </div>
      </header>
      <div className="role-progression">
        <article>
          <i/>
          <div><small>CURRENT ROLE</small><span>Member</span><time>Jul 2026 — Present · 1 mo</time>
          <p>Contributing to technical initiatives, club activities, and collaborative community programs.</p></div>
        </article>
        <article>
          <i/>
          <div><small>PREVIOUS ROLE</small><span>Alpha Member</span><time>Apr 2026 — Jul 2026 · 4 mos</time>
          <p>Supported team coordination, project planning, event delivery, and software project management.</p></div>
        </article>
      </div>
      <footer><strong>Core skills</strong><span>Team Leadership</span><span>Software Project Management</span><span>Collaboration</span><span>Event Delivery</span></footer>
    </article>

    <div className="supporting-experience">
      {supportingRoles.map((item,index)=><article key={item.organization} data-experience-reveal style={{'--experience-delay':`${index*90}ms`}}>
        <div className="experience-logo"><img src={item.logo} alt={`${item.organization} logo`}/></div>
        <small>0{index+2}</small>
        <div>
          <span>{item.role}</span>
          <h3>{item.organization}</h3>
          <time>{item.period}</time>
          <p>{item.description}</p>
        </div>
      </article>)}
    </div>
  </section>;
}
