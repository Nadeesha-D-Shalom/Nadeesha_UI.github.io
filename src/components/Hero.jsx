import { useRef,useState } from 'react';
import withoutVR from '../../assets/img/withoutVR.png';
import withVR from '../../assets/img/withVR.png';
import HeroContent from './HeroContent';

export default function Hero({active}) {
  const hero=useRef(null);
  const [revealing,setRevealing]=useState(false);
  const move=event=>{
    const box=hero.current.getBoundingClientRect();
    hero.current.style.setProperty('--reveal-x',`${event.clientX-box.left}px`);
    hero.current.style.setProperty('--reveal-y',`${event.clientY-box.top}px`);
  };
  return <main ref={hero} id="home" className={`photo-hero ${active?'active':''} ${revealing?'revealing':''}`} onPointerEnter={e=>{setRevealing(true);move(e);}} onPointerMove={move} onPointerLeave={()=>setRevealing(false)}>
    <img className="hero-image vr-image" src={withVR} alt="Nadeesha exploring a virtual environment"/>
    <img className="hero-image normal-image" src={withoutVR} alt="Nadeesha Shalom"/>
    <div className="image-grade" aria-hidden="true"/>
    <HeroContent/>
  </main>;
}
