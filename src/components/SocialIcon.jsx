const paths={
  linkedin:<path d="M5.2 7.2H1.8V18h3.4V7.2ZM3.5 2A2 2 0 1 0 3.5 6a2 2 0 0 0 0-4ZM18.2 11.8c0-3.3-1.8-4.9-4.2-4.9-1.9 0-2.8 1.1-3.3 1.8V7.2H7.3V18h3.4v-5.4c0-1.4.3-2.8 2-2.8 1.7 0 1.8 1.6 1.8 2.9V18H18l.2-6.2Z"/>,
  github:<path d="M10 1.7a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.7c-2.3.5-2.8-1-2.8-1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-1.9-.2-3.8-.9-3.8-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.3 8.3 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4-3.8 4.2.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A8.5 8.5 0 0 0 10 1.7Z"/>,
  instagram:<><rect x="2.2" y="2.2" width="15.6" height="15.6" rx="4.2" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="15.1" cy="4.9" r="1.1"/></>,
  facebook:<path d="M11.7 18v-7h2.4l.4-2.8h-2.8V6.4c0-.8.2-1.4 1.4-1.4h1.5V2.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2H6.1V11h2.5v7h3.1Z"/>,
  email:<path d="M2.2 4.2h15.6v11.6H2.2V4.2Zm1.4 1.4L10 10.2l6.4-4.6M3.6 14.2l4.7-4m8.1 4-4.7-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>,
};
const colors={linkedin:'#0A66C2',github:'#fff',instagram:'#E4405F',facebook:'#1877F2',email:'#EA4335'};

export default function SocialIcon({name}){
  return <svg className="social-icon" viewBox="0 0 20 20" aria-hidden="true" style={{color:colors[name]}}>{paths[name]}</svg>;
}
