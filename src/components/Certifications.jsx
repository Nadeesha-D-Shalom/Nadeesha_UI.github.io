import { useEffect, useMemo, useRef, useState } from 'react';
import NetworkBackdrop from './NetworkBackdrop';
import awsLogo from '../../assets/img/aws.png';

const credentials=[
  {title:'AI/ML Engineer — Stage 2',issuer:'SLIIT CODE',date:'02 Jan 2026',id:'yq3eai4caw',url:'https://code.sliit.org/',area:'AI'},
  {title:'Machine Learning Using Python',issuer:'Simplilearn SkillUp',date:'31 Dec 2025',id:'9661215',url:'https://www.simplilearn.com/skillup',area:'AI'},
  {title:'AI/ML Engineer — Stage 1',issuer:'SLIIT CODE',date:'23 Dec 2025',id:'e0dag2rf3p',url:'https://code.sliit.org/',area:'AI'},
  {title:'Python for Beginners',issuer:'University of Moratuwa',date:'12 Dec 2025',id:'UvAfOj3HMJ',url:'https://open.uom.lk/verify',area:'Development'},
  {title:'Software Development Life Cycle',issuer:'Udemy',date:'06 Sep 2025',id:'UC-558c67b8-da03-4328-b3a5-0871aeeb5e1f',url:'https://ude.my/UC-558c67b8-da03-4328-b3a5-0871aeeb5e1f',area:'Engineering'},
  {title:'Git & GitHub Masterclass',issuer:'Udemy',date:'23 Jul 2025',id:'UC-3f1d6dcc-d9d3-48a0-b421-ebcaef0dd41d',url:'https://ude.my/UC-3f1d6dcc-d9d3-48a0-b421-ebcaef0dd41d',area:'Engineering'},
  {title:'MySQL for Beginners',issuer:'Udemy',date:'23 Jul 2025',id:'UC-ea8d3f3a-8448-482f-8abe-50b1aa05c8c6',url:'https://ude.my/UC-ea8d3f3a-8448-482f-8abe-50b1aa05c8c6',area:'Development'},
  {title:'Java OOP with Exercises',issuer:'Udemy',date:'06 Jun 2025',id:'UC-d67f2681-8791-40fe-8c3d-4387476a0b07',url:'https://ude.my/UC-d67f2681-8791-40fe-8c3d-4387476a0b07',area:'Development'},
  {title:'Java OOP, OOAD & Design Patterns',issuer:'Udemy',date:'23 Apr 2025',id:'UC-12ed977c-54a1-43c6-a7e9-fa97a2e69a2c',url:'https://ude.my/UC-12ed977c-54a1-43c6-a7e9-fa97a2e69a2c',area:'Development'},
  {title:'Java (Basic) Skill Certification',issuer:'HackerRank',date:'05 Apr 2025',id:'98IFC5F0FA57',url:'https://www.hackerrank.com/skills-verification',area:'Development'},
  {title:'Crash Course on Python',issuer:'Google × Coursera',date:'17 Nov 2022',id:'RYBQMULKS7PP',url:'https://coursera.org/verify/RYBQMULKS7PP',area:'Development'},
  {title:'What is Data Science?',issuer:'IBM × Coursera',date:'29 Aug 2022',id:'YB2LW8GEJ7DX',url:'https://coursera.org/verify/YB2LW8GEJ7DX',area:'AI'},
];

const badges=['Introduction to Generative AI','Machine Learning Foundations','Cloud Computing 101','Getting Started with Storage'];
const filters=['All','AI','Development','Engineering'];

export default function Certifications(){
  const [filter,setFilter]=useState('All');
  const [expanded,setExpanded]=useState(false);
  const sectionRef=useRef(null);
  const filtered=useMemo(()=>filter==='All'?credentials:credentials.filter(item=>item.area===filter),[filter]);
  const visible=expanded?filtered:filtered.slice(0,6);

  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.1,rootMargin:'-3% 0px -8%'});
    section.querySelectorAll('[data-certificate-reveal]').forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);

  return <section className="certifications-section" id="certificates" ref={sectionRef} aria-labelledby="certifications-title">
    <NetworkBackdrop/>
    <header className="certifications-heading" data-certificate-reveal>
      <span>04 / CERTIFICATIONS</span>
      <h2 id="certifications-title">Verified learning. <em>Applied knowledge.</em></h2>
      <p>A focused record of professional study across artificial intelligence, software engineering, and modern development.</p>
    </header>

    <div className="certificate-console" data-certificate-reveal>
      <header>
        <div><span>CREDENTIAL INDEX</span><strong>{credentials.length} certificates</strong></div>
        <div className="certificate-filters">{filters.map(item=><button type="button" key={item} className={filter===item?'active':''} onClick={()=>setFilter(item)}>{item}</button>)}</div>
      </header>
      <div className="certificate-list">
        {visible.map((item,index)=><article className="certificate-row" key={`${expanded}-${filter}-${item.id}`} style={{'--certificate-delay':`${index*60}ms`}}>
          <small>{String(index+1).padStart(2,'0')}</small>
          <div><span>{item.area}</span><h3>{item.title}</h3><p>{item.issuer}</p></div>
          <time>{item.date}</time>
          <code>{item.id}</code>
          <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Verify ${item.title}`}>Verify ↗</a>
        </article>)}
      </div>
      {filtered.length>6&&<button className="certificate-expand" type="button" onClick={()=>setExpanded(value=>!value)} aria-expanded={expanded}>
        <span>{expanded?'Show fewer credentials':'Explore all credentials'}</span><small>{expanded?'Collapse list':`${filtered.length-6} more certificates`}</small><i>{expanded?'↑':'↓'}</i>
      </button>}
    </div>

    <div className="aws-badges" data-certificate-reveal>
      <header><span>AWS EDUCATE</span><strong>Cloud learning badges</strong></header>
      <div>{badges.map((badge,index)=><article key={badge}><small>0{index+1}</small><i><img src={awsLogo} alt="" /></i><span>{badge}</span></article>)}</div>
    </div>
  </section>;
}
