import { useEffect, useRef, useState } from 'react';

export default function FloatingAssistant(){
  const [visible,setVisible]=useState(false);
  const [waving,setWaving]=useState(false);
  const [dancing,setDancing]=useState(false);
  const waveTimerRef=useRef(null);
  const waveFrameRef=useRef(null);

  useEffect(()=>{
    const hero=document.getElementById('home');
    if(!hero)return;
    const observer=new IntersectionObserver(([entry])=>setVisible(!entry.isIntersecting),{threshold:.08});
    observer.observe(hero);
    return()=>observer.disconnect();
  },[]);

  const wave=()=>{
    clearTimeout(waveTimerRef.current);
    cancelAnimationFrame(waveFrameRef.current);
    setWaving(false);
    waveFrameRef.current=requestAnimationFrame(()=>setWaving(true));
    waveTimerRef.current=setTimeout(()=>setWaving(false),1500);
  };

  useEffect(()=>{
    if(!visible)return;
    wave();
    const interval=setInterval(wave,6500);
    return()=>{
      clearInterval(interval);
      clearTimeout(waveTimerRef.current);
      cancelAnimationFrame(waveFrameRef.current);
    };
  },[visible]);

  useEffect(()=>{
    if(!visible)return;
    let danceTimer;
    let stopTimer;
    const scheduleDance=()=>{
      danceTimer=setTimeout(()=>{
        setWaving(false);
        setDancing(true);
        stopTimer=setTimeout(()=>{
          setDancing(false);
          scheduleDance();
        },10000);
      },10000);
    };
    scheduleDance();
    return()=>{
      clearTimeout(danceTimer);
      clearTimeout(stopTimer);
      setDancing(false);
    };
  },[visible]);

  return <button
    className={`floating-assistant ${visible?'is-visible':''} ${waving?'is-waving':''} ${dancing?'is-dancing':''}`}
    type="button"
    onClick={wave}
    aria-label="Nadeesha AI assistant, online. Wave hello"
  >
    <span className="assistant-robot" aria-hidden="true">
      <i className="assistant-antenna"/>
      <i className="assistant-head"><b/><b/></i>
      <i className="assistant-body"/>
      <i className="assistant-resting-arm"/>
      <i className="assistant-hand"><b/><b/><b/></i>
      <i className="assistant-legs"><b/><b/></i>
    </span>
  </button>;
}
