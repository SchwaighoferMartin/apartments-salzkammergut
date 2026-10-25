// Buchungslink an EINER Stelle – hier austauschen, gilt für alle Seiten
const BOOKING_URL = "https://direct.bookingandmore.com/accommodation/707d7d43-e161-4283-8286-aa543c04a651?lang=de";
document.querySelectorAll(".js-book").forEach(a => { a.href = BOOKING_URL; a.target = "_blank"; a.rel = "noopener"; });
// Galerie mit Großansicht
const data = document.getElementById("gallery-data");
if (data) {
  const pics = JSON.parse(data.textContent);
  let i = 0, lb, img, cap, last;
  const show = n => { i = (n + pics.length) % pics.length; img.src = pics[i].src; img.alt = pics[i].alt; cap.textContent = (i+1) + " / " + pics.length + " · " + pics[i].alt; };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; last && last.focus(); };
  lb = document.createElement("div"); lb.className = "lb"; lb.hidden = true; lb.setAttribute("role","dialog"); lb.setAttribute("aria-modal","true"); lb.setAttribute("aria-label","Fotos");
  lb.innerHTML = '<img alt=""><div class="lb-bar"><button type="button" data-a="prev">‹ Zurück</button><span></span><button type="button" data-a="next">Weiter ›</button><button type="button" data-a="close">Schließen ✕</button></div>';
  document.body.appendChild(lb); img = lb.querySelector("img"); cap = lb.querySelector("span");
  lb.addEventListener("click", e => { const a = e.target.dataset.a; if (a==="prev") show(i-1); else if (a==="next") show(i+1); else if (a==="close" || e.target===lb) close(); });
  document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key==="Escape") close(); if (e.key==="ArrowLeft") show(i-1); if (e.key==="ArrowRight") show(i+1); });
  let x0 = null; lb.addEventListener("touchstart", e => x0 = e.touches[0].clientX, {passive:true});
  lb.addEventListener("touchend", e => { if (x0===null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
  document.querySelectorAll("#gallery button").forEach(b => b.addEventListener("click", () => { last = b; show(+b.dataset.i); lb.hidden = false; document.body.style.overflow = "hidden"; lb.querySelector('[data-a="close"]').focus(); }));
}
