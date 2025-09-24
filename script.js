// ...existing code ...
import { CountUp } from 'countup';

// Year
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Terminal typing simulation

(async function typeSequence() {
  for (const s of steps) {
    await new Promise(r => setTimeout(r, s.delay));
    await typeTo(document.querySelector(s.el), s.text);
  }
})();
function typeTo(el, text) {
  return new Promise(resolve => {
    let i = 0;
    const t = setInterval(() => {
      el.textContent = text.slice(0, i++);
      if (i > text.length) { clearInterval(t); resolve(); }
    }, 18);
  });
}

// Linux-style boot screen
const bootLines = ['username: v7l3nt1m','password: ••••••••','access granted'];
const bootEl = document.getElementById('bootLog');
(async function boot(){
  for (const line of bootLines){ bootEl.textContent += (bootEl.textContent?'\n':'')+line; await new Promise(r=>setTimeout(r,250)); }
  setTimeout(()=>{ document.body.classList.add('app-ready'); const about=document.getElementById('about'); if(about){ document.querySelector('main').prepend(about); } },550);
})();

// CountUp when in view
const countEl = document.getElementById('vulnCount');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const c = new CountUp('vulnCount', 16, { duration: 1, separator: ',', suffix: '' });
      if (!c.error) c.start();
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });
observer.observe(countEl);

// Smooth internal nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
// ...existing code ...