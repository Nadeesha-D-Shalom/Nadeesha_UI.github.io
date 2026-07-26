import { useCallback, useEffect, useRef, useState } from 'react';
import helloAnimationUrl from '../../assets/vid/Hello (apple).json?url';

export default function BootSequence({onComplete}) {
  const [stage,setStage]=useState('intelligence');
  const [exiting,setExiting]=useState(false);
  const lottieRef=useRef(null);
  const completedRef=useRef(false);
  const exitTimerRef=useRef(null);

  const finish=useCallback(()=>{
    if(completedRef.current)return;
    completedRef.current=true;
    setExiting(true);
    exitTimerRef.current=setTimeout(onComplete,650);
  },[onComplete]);

  useEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      const timer=setTimeout(finish,450);
      return()=>clearTimeout(timer);
    }
    const timer=setTimeout(()=>setStage('hello'),2200);
    return()=>clearTimeout(timer);
  },[finish]);

  useEffect(()=>{
    if(stage!=='hello'||!lottieRef.current)return;
    const lottie=window.lottie;
    if(!lottie){
      finish();
      return;
    }
    const animation=lottie.loadAnimation({
      container:lottieRef.current,
      renderer:'svg',
      loop:false,
      autoplay:true,
      path:helloAnimationUrl,
    });
    animation.addEventListener('complete',finish);
    const fallback=setTimeout(finish,4500);
    return()=>{
      clearTimeout(fallback);
      animation.removeEventListener('complete',finish);
      animation.destroy();
    };
  },[stage,finish]);

  useEffect(()=>()=>clearTimeout(exitTimerRef.current),[]);

  return <section className={`apple-intro ${stage} ${exiting?'exiting':''}`} aria-label="Portfolio introduction" aria-busy={!exiting}>
    <button onClick={finish}>Skip Intro</button>
    {stage==='hello'
      ?<div className="hello-stage"><div ref={lottieRef} className="hello-animation" aria-label="Hello"/></div>
      :<div className="apple-ai-loader">
        <div className="ai-orb" aria-hidden="true"><i/><i/><i/><i/></div>
        <strong>Initializing Intelligence</strong>
        <span>Preparing your experience</span>
      </div>}
  </section>;
}
