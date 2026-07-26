import { useEffect, useRef } from 'react';
import NetworkBackdrop from './NetworkBackdrop';

const pillars=[
  {number:'01',title:'Who I Am',items:['Problem Solver','Software Engineer','Technology Explorer','Innovation Driven']},
  {number:'02',title:'What I Build',items:['Enterprise Systems','AI Applications','Scalable Platforms','Modern Web Apps']},
  {number:'03',title:'My Mission',items:['Real-World Impact','Continuous Learning','Engineering Excellence','Meaningful Products']},
];
const expertise=['Backend','Full Stack','AI Systems','Cloud Ready'];
const technologyGroups=[
  {title:'Core Languages',items:['Java','Python','Go','JavaScript','SQL','C','C++','PHP'],essential:['Java','Python','Go','JavaScript']},
  {title:'Frameworks & Backend',items:['Spring Boot','React','Node.js','Gin','REST APIs'],essential:['Spring Boot','React','Node.js']},
  {title:'AI & Machine Learning',items:['Machine Learning','Supervised Learning','Feature Engineering','Data Preprocessing','Model Evaluation','Prompt Engineering','Chatbot Development','Recommendation Systems','Computer Vision','Responsible AI','Scikit-learn','TensorFlow','Pandas','NumPy','Jupyter & Colab'],essential:['Machine Learning','Prompt Engineering','Computer Vision','TensorFlow']},
  {title:'Web Engineering',items:['HTML5','CSS3','Tailwind CSS','Bootstrap','REST Integration'],essential:['HTML5','CSS3']},
  {title:'Data & Storage',items:['MySQL','Microsoft SQL Server','MongoDB'],essential:['MySQL','Microsoft SQL Server']},
  {title:'Tools & Delivery',items:['Git','GitHub','Postman','CI/CD Pipelines'],essential:['Git','GitHub','CI/CD Pipelines']},
  {title:'Cloud & Infrastructure',items:['AWS EC2','AWS S3','Linux Administration','Web Deployment','Server Configuration','cPanel','Domain & Hosting','PM2'],essential:['AWS EC2','AWS S3','Linux Administration']},
  {title:'IoT & Embedded',items:['ESP32 / ESP8266','Arduino IDE','LoRa','GPS Modules','Sensor Integration'],essential:['ESP32 / ESP8266','LoRa']},
];
const philosophy=[
  {number:'01',title:'Discover',description:'Understand the real problem, users, and desired impact.'},
  {number:'02',title:'Architect',description:'Shape a scalable foundation and make deliberate technical decisions.'},
  {number:'03',title:'Engineer',description:'Build clean, secure, and maintainable software with purpose.'},
  {number:'04',title:'Validate',description:'Test reliability, usability, performance, and real-world value.'},
  {number:'05',title:'Evolve',description:'Deliver, learn from outcomes, and continuously improve the system.'},
];

export default function About(){
  const sectionRef=useRef(null);

  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        entry.target.classList.toggle('is-visible',entry.isIntersecting);
      });
    },{threshold:.1,rootMargin:'-4% 0px -8% 0px'});
    section.querySelectorAll('[data-reveal]').forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);

  return <section ref={sectionRef} className="about-section" id="about" aria-labelledby="about-title">
    <NetworkBackdrop/>
    <header className="about-intro" data-reveal>
      <span>01 / ABOUT ME</span>
      <h2 id="about-title">Nadeesha <em>Shalom.</em></h2>
      <p className="about-role">Software Engineering Undergraduate <i/> SLIIT</p>
      <p className="about-summary">I build scalable, intelligent, and production-ready software systems—transforming complex ideas into practical solutions through clean architecture, modern technology, and thoughtful user experiences.</p>
    </header>

    <div className="about-pillars" data-reveal>
      {pillars.map((pillar,index)=><article key={pillar.title} data-reveal style={{'--reveal-delay':`${index*90}ms`}}>
        <small>{pillar.number}</small><h3>{pillar.title}</h3>
        <ul>{pillar.items.map(item=><li key={item}>{item}</li>)}</ul>
      </article>)}
    </div>

    <div className="about-band expertise-band" data-reveal>
      <div className="section-label"><span>ENGINEERING EXPERTISE</span><i/></div>
      <div className="expertise-list">{expertise.map((item,index)=><div key={item} data-reveal style={{'--reveal-delay':`${index*70}ms`}}><i/><span>{item}</span><small>ACTIVE</small></div>)}</div>
    </div>

    <div className="about-band stack-band" data-reveal>
      <div className="section-label"><span>TECHNOLOGY STACK</span><i/></div>
      <p className="stack-note"><i/> Primary engineering toolkit</p>
      <div className="technology-groups">{technologyGroups.map((group,index)=><article key={group.title} data-reveal style={{'--reveal-delay':`${Math.min(index,3)*65}ms`}}>
        <header><small>0{index+1}</small><h3>{group.title}</h3></header>
        <ul>{group.items.map(item=><li className={group.essential.includes(item)?'essential':''} key={item}>{group.essential.includes(item)&&<i/>}{item}</li>)}</ul>
      </article>)}</div>
    </div>

    <div className="about-detail-grid philosophy-section">
      <article className="engineering-philosophy" data-reveal>
        <div className="section-label"><span>ENGINEERING PHILOSOPHY</span><i/></div>
        <header className="philosophy-heading">
          <h3>From meaningful problems to enduring systems.</h3>
          <p>A thoughtful engineering process that balances people, architecture, quality, and continuous improvement.</p>
        </header>
        <div className="philosophy-flow">{philosophy.map((item,index)=><div key={item.title} data-reveal style={{'--reveal-delay':`${index*75}ms`}}>
          <small>{item.number}</small>
          <span>{item.title}</span>
          <p>{item.description}</p>
          {index<philosophy.length-1&&<i aria-hidden="true">→</i>}
        </div>)}</div>
      </article>
    </div>

    <footer className="future-vision" data-reveal>
      <span>FUTURE VISION</span>
      <div><strong>World-Class Software Engineer</strong><i>+</i><strong>Artificial Intelligence</strong><i>+</i><strong>Intelligent Digital Products</strong></div>
      <p>Always learning, collaborating, contributing, and taking on challenges that push both technology and myself forward.</p>
    </footer>
  </section>;
}
