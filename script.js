/* =====================================================
   EDIT BAGIAN INI SAJA UNTUK MENYESUAIKAN HALAMAN
   ===================================================== */
const CONFIG = {
  namaPenerima: "Ela",     // orang yang kamu ajak
  namaPengirim: "Pandu",     // nama kamu
  tagline: "Aku sudah lama menyimpan ini, dan hari ini aku ingin jujur padamu.",

  alasan: [
    { judul: "Senyummu",     teks: "Satu senyum darimu cukup untuk memperbaiki hari yang buruk." },
    { judul: "Tawamu",       teks: "Suara paling menenangkan yang pernah kudengar." },
    { judul: "Kebaikanmu",   teks: "Caramu memperlakukan orang lain membuatku kagum setiap hari." },
    { judul: "Perhatianmu",  teks: "Hal-hal kecil yang kamu ingat, diam-diam membuatku luluh." },
    { judul: "Caramu hadir", teks: "Di dekatmu, aku merasa tenang dan jadi diri sendiri." },
    { judul: "Kamu",         teks: "Apa adanya kamu, itu sudah lebih dari cukup bagiku." }
  ],

  kutipan: "Di antara semua orang yang kutemui, kamu yang selalu kucari.",

  // Isi dengan nama file foto, contoh: ["foto1.jpg","foto2.jpg"]
  foto: [],
  jumlahKotakKosong: 4,   // jumlah kotak berhati jika foto masih kosong

  surat: [
    "Halo, {penerima}.",
    "Aku tidak pandai merangkai kata, tapi aku ingin kamu tahu: sejak mengenalmu, hari-hariku terasa lebih hangat. Kamu orang pertama yang ingin kuceritakan segalanya.",
    "Aku tidak ingin hanya menjadi teman yang diam-diam menyimpan rasa. Aku ingin lebih dari itu, dan aku ingin jujur sekarang."
  ],
  penutup: "Dengan sepenuh hati",

  pertanyaan: "Maukah kamu jadi kekasihku?",
  subPertanyaan: "Aku akan menunggu jawabanmu dengan jantung berdebar.",
  tombolYa: "Iya, aku mau",
  tombolTidak: ["Tidak", "Yakin?", "Coba pikir lagi", "Sekali lagi?", "Tolong…", "Aku tunggu ya"],
  balasanYa: "Terima kasih, {penerima}. Aku janji akan menjagamu dan membuatmu bahagia. ♥",

  // Opsional: nomor WhatsApp pengirim (format 62..., tanpa + atau spasi). Kosongkan jika tidak perlu.
  whatsapp: "6281288504358",
  pesanWhatsapp: "Aku mau jadi kekasihmu ♥",

  musik: ""   // opsional, contoh: "lagu.mp3" (satu folder dengan file ini)
};

/* ================== KODE DI BAWAH INI ================== */
const $ = id => document.getElementById(id);
const kurangGerak = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isi = t => t.replace(/\{penerima\}/g, CONFIG.namaPenerima).replace(/\{pengirim\}/g, CONFIG.namaPengirim);

/* Isi teks */
$('n1').textContent = CONFIG.namaPenerima;
$('n2').textContent = CONFIG.namaPengirim;
$('sNama').textContent = CONFIG.namaPenerima;
$('tagline').textContent = CONFIG.tagline;
$('kutip').textContent = "“" + CONFIG.kutipan + "”";
$('pertanyaan').textContent = CONFIG.pertanyaan;
$('subTanya').textContent = CONFIG.subPertanyaan;
$('ya').textContent = CONFIG.tombolYa;
$('tidak').textContent = CONFIG.tombolTidak[0];
$('footer').textContent = "Dibuat dengan cinta oleh " + CONFIG.namaPengirim + " untuk " + CONFIG.namaPenerima + " ♥";
document.title = "Untuk " + CONFIG.namaPenerima + " ♥";

/* Kartu alasan (balik saat diketuk) */
CONFIG.alasan.forEach(a => {
  const k = document.createElement('button');
  k.className = 'kartu reveal'; k.type = 'button'; k.setAttribute('aria-pressed','false');
  const d = document.createElement('span'); d.className = 'dalam';
  const m = document.createElement('span'); m.className = 'muka';
  const h = document.createElement('span'); h.className = 'h'; h.textContent = '♥';
  const b = document.createElement('b'); b.textContent = a.judul; m.append(h, b);
  const bl = document.createElement('span'); bl.className = 'belakang'; bl.textContent = a.teks;
  d.append(m, bl); k.appendChild(d);
  k.addEventListener('click', () => {
    const balik = k.classList.toggle('balik');
    k.setAttribute('aria-pressed', balik);
    if (balik) { const r = k.getBoundingClientRect(); ledakan(r.left + r.width/2, r.top + r.height/2, 12); }
  });
  $('alasanGrid').appendChild(k);
});

/* Galeri + foto besar */
(CONFIG.foto.length ? CONFIG.foto : Array(CONFIG.jumlahKotakKosong).fill(null)).forEach(src => {
  const f = document.createElement('div'); f.className = 'foto reveal';
  if (src) { f.style.backgroundImage = `url("${src}")`; f.setAttribute('role','img'); f.setAttribute('aria-label','Foto kenangan'); }
  else f.textContent = "♥";
  f.addEventListener('click', () => {
    $('fotoBesar').style.backgroundImage = src ? `url("${src}")` : 'none';
    $('fotoBesar').textContent = src ? '' : '♥';
    $('kotakFoto').classList.add('buka');
  });
  $('galeriGrid').appendChild(f);
});
$('kotakFoto').addEventListener('click', () => $('kotakFoto').classList.remove('buka'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('kotakFoto').classList.remove('buka'); });

/* Surat */
CONFIG.surat.forEach(s => { const p = document.createElement('p'); p.textContent = isi(s); $('isiSurat').appendChild(p); });
const ttd = document.createElement('p'); ttd.className = 'ttd'; ttd.textContent = CONFIG.penutup + ", " + CONFIG.namaPengirim;
$('isiSurat').appendChild(ttd);
$('amplop').addEventListener('click', () => {
  const buka = $('amplop').classList.toggle('buka');
  $('kertas').classList.toggle('buka', buka);
  $('amplop').setAttribute('aria-expanded', buka);
  if (buka) { const r = $('amplop').getBoundingClientRect(); ledakan(r.left + r.width/2, r.top + r.height/2, 22, true); }
});

/* Pertanyaan: "Tidak" menghindar, "Iya" makin besar */
let coba = 0;
function hindar(){
  coba++;
  const x = (Math.random() - .5) * Math.min(innerWidth - 140, 360);
  const y = (Math.random() - .5) * 150;
  $('tidak').style.transform = `translate(${x}px,${y}px) rotate(${(Math.random()-.5)*20}deg)`;
  $('ya').style.transform = `scale(${Math.min(1 + coba * .18, 2)})`;
  $('tidak').textContent = CONFIG.tombolTidak[Math.min(coba, CONFIG.tombolTidak.length - 1)];

  // Jika tombol "Tidak" diklik terus sampai habis kata-katanya, langsung arahkan ke WA dengan pesan penolakan/ragu
  if (coba >= CONFIG.tombolTidak.length - 1 && CONFIG.whatsapp) {
    const pesanTidak = "Hmm, aku mau pikir-pikir dulu ya... 😅";
    $('tidak').onclick = () => {
      window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(pesanTidak), "_blank");
    };
  }
}

$('tidak').addEventListener('pointerenter', hindar);
$('tidak').addEventListener('click', hindar);

// Ketika tombol "Iya" diklik
$('ya').addEventListener('click', () => {
  $('teksBalasan').textContent = isi(CONFIG.balasanYa);
  
  if (CONFIG.whatsapp) {
    // Mengarahkan tombol "Kabari lewat WhatsApp" atau langsung membuka WhatsApp
    $('wa').href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.pesanWhatsapp);
    $('wa').hidden = false;
    
    // Opsional: Jika ingin begitu tombol "Iya" diklik, dalam beberapa detik langsung otomatis membuka WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.pesanWhatsapp)}`, '_blank');
    }, 1500);
  }
  
  $('balasan').classList.add('tampil');
  $('tidak').style.transform = 'scale(0)';
  $('tidak').style.pointerEvents = 'none';
  const r = $('ya').getBoundingClientRect();
  ledakan(r.left + r.width/2, r.top + r.height/2, 50, true);
  setTimeout(() => ledakan(innerWidth*.25, innerHeight*.5, 30, true), 350);
  setTimeout(() => ledakan(innerWidth*.75, innerHeight*.5, 30, true), 650);
});

/* Ledakan hati (juga dipakai di setiap klik) */
const simbolHati = ["♥","❤","♡","✦"];
function ledakan(x, y, n = 8, besar = false){
  if (kurangGerak) return;
  for (let i = 0; i < n; i++){
    const e = document.createElement('span');
    e.textContent = simbolHati[Math.floor(Math.random()*simbolHati.length)];
    Object.assign(e.style, { position:'fixed', left:x+'px', top:y+'px', zIndex:200, pointerEvents:'none',
      color: Math.random() > .35 ? '#ff6b81' : '#f5dc9a', fontSize:(10 + Math.random()*(besar?26:14))+'px' });
    document.body.appendChild(e);
    const sudut = Math.random()*Math.PI*2, jarak = (besar ? 90 : 45) + Math.random()*(besar ? 220 : 70);
    const dx = Math.cos(sudut)*jarak, dy = Math.sin(sudut)*jarak - (besar ? 60 : 20);
    e.animate([
      { transform:'translate(-50%,-50%) scale(.3) rotate(0)', opacity:1 },
      { transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1) rotate(${(Math.random()-.5)*180}deg)`, opacity:1, offset:.6 },
      { transform:`translate(calc(-50% + ${dx*1.1}px),calc(-50% + ${dy + 70}px)) scale(.7) rotate(${(Math.random()-.5)*240}deg)`, opacity:0 }
    ], { duration: 1100 + Math.random()*900, easing:'cubic-bezier(.22,.8,.24,1)' }).onfinish = () => e.remove();
  }
}
document.addEventListener('click', e => { if ($('sampul').classList.contains('selesai')) ledakan(e.clientX, e.clientY, 7); });

/* Riak di semua tombol */
document.querySelectorAll('.tombol').forEach(b => b.addEventListener('click', e => {
  const r = b.getBoundingClientRect(), s = document.createElement('span'), d = Math.max(r.width, r.height);
  s.className = 'ripple';
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d/2}px;top:${e.clientY - r.top - d/2}px`;
  b.appendChild(s); setTimeout(() => s.remove(), 800);
}));

/* Scroll halus + muncul saat di-scroll */
$('turun').addEventListener('click', () => $('alasan').scrollIntoView({ behavior:'smooth' }));
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting){ en.target.classList.add('tampil'); io.unobserve(en.target); } }), { threshold:.15 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.08 + 's'; io.observe(el); });

/* Hati melayang di latar */
function hatiLatar(){
  const el = document.createElement('span'); el.className = 'melayang';
  el.textContent = simbolHati[Math.floor(Math.random()*3)];
  el.style.left = Math.random()*100 + 'vw'; el.style.fontSize = (14 + Math.random()*26) + 'px';
  const dur = 7 + Math.random()*6; el.style.animationDuration = dur + 's';
  $('hati').appendChild(el); setTimeout(() => el.remove(), (dur + 1) * 1000);
}
setInterval(hatiLatar, 1800);

/* Debu emas di hero */
(function(){
  if (kurangGerak) return;
  const cv = $('debu'), cx = cv.getContext('2d'); let W, H, P = [];
  function ukur(){ W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; }
  ukur(); addEventListener('resize', ukur);
  for (let i = 0; i < 70; i++) P.push({ x:Math.random()*2000, y:Math.random()*1200, r:Math.random()*1.8+.4, vy:-(Math.random()*.3+.05), vx:(Math.random()-.5)*.2, t:Math.random()*6.28, s:Math.random()*.03+.008 });
  (function loop(){
    cx.clearRect(0, 0, W, H);
    P.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.t += p.s;
      if (p.y < -5){ p.y = H + 5; p.x = Math.random()*W; }
      if (p.x > W) p.x = 0; if (p.x < 0) p.x = W;
      cx.fillStyle = `rgba(245,220,154,${.15 + .6*Math.abs(Math.sin(p.t))})`;
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
    });
    requestAnimationFrame(loop);
  })();
})();

/* Musik (opsional) */
let audio = null;
if (CONFIG.musik){
  audio = new Audio(CONFIG.musik); audio.loop = true; audio.volume = .6;
  $('musik').classList.add('ada');
  $('musik').addEventListener('click', () => {
    if (audio.paused){ audio.play(); $('musik').classList.add('main'); } else { audio.pause(); $('musik').classList.remove('main'); }
  });
}

/* Buka sampul */
$('segel').addEventListener('click', e => {
  const r = e.currentTarget.getBoundingClientRect();
  $('sampul').classList.add('buka');
  ledakan(r.left + r.width/2, r.top + r.height/2, 40, true);
  if (audio) audio.play().then(() => $('musik').classList.add('main')).catch(() => {});
  setTimeout(() => { document.body.classList.remove('terkunci'); document.body.classList.add('terbuka'); }, 700);
  setTimeout(() => $('sampul').classList.add('selesai'), 2000);
});
