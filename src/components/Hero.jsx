import { useRef,useState } from 'react';
import withoutVR from '../../assets/img/withoutVR.webp';
import withVR from '../../assets/img/withVR.webp';
import HeroContent from './HeroContent';

export default function Hero({active}) {
  const hero=useRef(null);
  const [revealing,setRevealing]=useState(false);
  const [touchReveal,setTouchReveal]=useState(false);
  const move=event=>{
    const box=hero.current.getBoundingClientRect();
    hero.current.style.setProperty('--reveal-x',`${event.clientX-box.left}px`);
    hero.current.style.setProperty('--reveal-y',`${event.clientY-box.top}px`);
  };
  const revealOnTouch=event=>{
    if(event.pointerType==='touch'&&!event.target.closest('a')){
      move(event);
      setTouchReveal(value=>!value);
    }
  };
  return <main ref={hero} id="home" className={`photo-hero ${active?'active':''} ${revealing?'revealing':''} ${touchReveal?'touch-revealing':''}`} onPointerEnter={e=>{if(e.pointerType!=='touch'){setRevealing(true);move(e);}}} onPointerMove={e=>e.pointerType!=='touch'&&move(e)} onPointerLeave={()=>setRevealing(false)} onPointerDown={revealOnTouch}>
    <img className="hero-image vr-image" src={withVR} width="1672" height="941" loading="eager" decoding="async" alt="Nadeesha exploring a virtual environment"/>
    <img className="hero-image normal-image" src={withoutVR} width="1672" height="941" loading="eager" decoding="async" fetchPriority="high" alt="Nadeesha Shalom"/>
    <div className="image-grade" aria-hidden="true"/>
    <HeroContent/>
  </main>;
}
