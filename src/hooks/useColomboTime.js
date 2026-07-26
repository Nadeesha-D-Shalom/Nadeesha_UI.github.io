import { useEffect, useState } from 'react';

export function useColomboTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Colombo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}
