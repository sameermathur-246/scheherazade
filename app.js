const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const menu = $('.menu-toggle'), mobileMenu = $('#mobile-menu');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); mobileMenu.hidden = true; document.body.classList.remove('menu-open'); $('main').inert = false; }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); mobileMenu.hidden = !open; document.body.classList.toggle('menu-open', open); $('main').inert = open; });
$$('#mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menu.focus(); } });
$$('[data-filter]').forEach(button => button.addEventListener('click', () => { $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); $$('.archive-card').forEach(card => card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter); }));
const contentDialog = $('#content-dialog');
const panels = {
 collective: `<div class="dialog-copy"><span class="eyebrow">ABOUT SCHEHERAZADE</span><h2>Cultural bridges<br><em>through the arts.</em></h2><p>Scheherazade is a South African music organisation and arts collective dedicated to creating performances, publications and cultural projects that explore the stories, traditions and artistic heritage of people and cultures.</p><p>Working across music, dance, visual art, literature and other creative disciplines, Scheherazade brings together artists from diverse backgrounds to develop collaborative projects that encourage cultural exchange and dialogue.</p><p>Alongside live performances, the organisation develops festivals, multi-disciplinary productions, exhibitions, publications, digital content and educational material, with a focus on education, accessibility and interdisciplinary collaboration.</p><p>Whether presenting an orchestral concert, commissioning new work, documenting forgotten stories or creating spaces for dialogue, the purpose remains the same: to build cultural bridges through the arts.</p></div>`,
 programme: `<div class="dialog-copy"><span class="eyebrow">THE PROGRAMME</span><h2>Our next<br><em>gathering.</em></h2><p>Confirmed performances will appear here with dates and ticket booking details.</p><p>This will be the home for upcoming concerts, festivals and collaborative productions, with the artists, stories and ideas behind each event.</p><button class="btn btn-dark" data-switch="contact">Ask about performances <span aria-hidden="true">↗</span></button></div>`,
 contact: `<div class="dialog-copy"><span class="eyebrow">LET’S CONNECT</span><h2>Begin a<br><em>conversation.</em></h2><p>Tell us what you have in mind.</p><form class="contact-form"><label for="contact-name">Your name<input id="contact-name" name="name" autocomplete="name" required maxlength="120"></label><label for="contact-email">Email address<input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="200"></label><label for="contact-topic">What brings you here?<select id="contact-topic" name="topic"><option>Artistic collaboration</option><option>Performances and tickets</option><option>Press and publications</option><option>A general enquiry</option></select></label><label for="contact-message">Your message<textarea id="contact-message" name="message" required maxlength="5000"></textarea></label><button class="btn btn-dark" type="submit">Copy enquiry <span aria-hidden="true">↗</span></button><p class="contact-note">Prepare your enquiry here. Copy it to share through your preferred channel; this form does not send a message.</p><p class="status" role="status"></p></form></div>`,
 credits: `<div class="dialog-copy"><span class="eyebrow">IMAGES & REFERENCES</span><h2>Visual<br><em>acknowledgements.</em></h2><p>Photography in this design preview comes from the supplied FigJam moodboard, visual references and brand guide. These reference images illustrate the visual direction.</p><p>Final publication requires approved production photography and image permissions. The emblem and brand direction are drawn from the supplied brand guide.</p></div>`
};
function openPanel(key) { closeMenu(); $('#dialog-content').innerHTML = panels[key]; const heading = $('#dialog-content h2'); if (heading) heading.id = 'dialog-title'; if (!contentDialog.open) contentDialog.showModal(); document.body.classList.add('dialog-open'); const switchButton = $('[data-switch]', contentDialog); if (switchButton) switchButton.addEventListener('click', () => openPanel(switchButton.dataset.switch)); const form = $('.contact-form'); if (form) form.addEventListener('submit', async e => { e.preventDefault(); const data = new FormData(form); const enquiry = `Scheherazade enquiry: ${data.get('topic')}\n\nFrom: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`; try { await navigator.clipboard.writeText(enquiry); $('.status', form).textContent = 'Enquiry copied. You can now paste it into your preferred channel.'; } catch { $('.status', form).textContent = 'Clipboard access is unavailable. Select and copy your message from the field above.'; } }); }
$$('[data-open]').forEach(b => b.addEventListener('click', () => openPanel(b.dataset.open)));
$$('dialog').forEach(d => { $('.dialog-close', d).addEventListener('click', () => d.close()); d.addEventListener('close', () => document.body.classList.remove('dialog-open')); d.addEventListener('click', e => { if (e.target === d) { const rect = d.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) d.close(); } }); });
const gallery = [
 {"key": "turning-dancer", "title": "Turning dancer", "category": "FIGJAM VISUAL REFERENCE", "alt": "A dancer turning in golden light"},
 {"key": "bowed-strings", "title": "Bowed strings", "category": "FIGJAM VISUAL REFERENCE", "alt": "A close view of fingers on a string instrument"},
 {"key": "drum-circle", "title": "Drum circle", "category": "FIGJAM VISUAL REFERENCE", "alt": "Hands and drums seen from above"},
 {"key": "fig-ensemble", "title": "Ensemble", "category": "FIGJAM VISUAL REFERENCE", "alt": "A seated ensemble performing together"},
 {"key": "hand-drum", "title": "Hand drum", "category": "FIGJAM VISUAL REFERENCE", "alt": "A musician playing a hand drum"},
 {"key": "tabla", "title": "Tabla", "category": "FIGJAM VISUAL REFERENCE", "alt": "Hands playing tabla drums"},
 {"key": "procession", "title": "Gathering", "category": "FIGJAM VISUAL REFERENCE", "alt": "A gathering seen from overhead"},
 {"key": "hanging-strings", "title": "Hanging string instruments", "category": "FIGJAM VISUAL REFERENCE", "alt": "String instruments suspended in a display"},
 {key:'drum-detail', title:'Drum detail', category:'MUSIC / DETAIL', alt:'A hand resting on a drum skin'},
 {key:'voice-detail', title:'Voice', category:'MUSIC / PERFORMANCE', alt:'A singer at a microphone'},
 {key:'ensemble-detail', title:'Ensemble detail', category:'MUSIC / REHEARSAL', alt:'Musicians in conversation during a rehearsal'},
 {key:'movement-detail', title:'Gesture', category:'DANCE / DETAIL', alt:'A dancer extending an arm under red light'},
 {key:'strings',title:'The stories held in strings',category:'MUSIC / HERITAGE',alt:'A musician holding her tanpura'}, {key:'rhythm',title:'Between rhythm and memory',category:'MUSIC / COLLABORATION',alt:'A drum and harmonium being played together'}, {key:'orchestra',title:'In the company of an orchestra',category:'MUSIC / PERFORMANCE',alt:'An orchestra in warm stage light, seen from the string section'}, {key:'ballet',title:'Movement on stage',category:'DANCE / PERFORMANCE',alt:'Ballet dancers poised across a stage in blue light'}, {key:'movement',title:'A dialogue in movement',category:'MOVEMENT / COLLABORATION',alt:'Contemporary dancers forming a connected group outdoors'} ];
let galleryIndex = 0;
function showPhoto(index) { galleryIndex = (index + gallery.length) % gallery.length; const item = gallery[galleryIndex]; $('#gallery-image').src = `assets/img/${item.key}.webp`; $('#gallery-image').alt = item.alt; $('#gallery-title').textContent = item.title; $('#gallery-category').textContent = item.category; $('#gallery-count').textContent = `${galleryIndex + 1} / ${gallery.length}`; }
$$('[data-gallery]').forEach(b => b.addEventListener('click', () => { showPhoto(gallery.findIndex(i => i.key === b.dataset.gallery)); $('#gallery-dialog').showModal(); document.body.classList.add('dialog-open'); }));
$('#gallery-prev').addEventListener('click', () => showPhoto(galleryIndex - 1)); $('#gallery-next').addEventListener('click', () => showPhoto(galleryIndex + 1));
$('#gallery-dialog').addEventListener('keydown', e => { if (e.key === 'ArrowLeft') showPhoto(galleryIndex - 1); if (e.key === 'ArrowRight') showPhoto(galleryIndex + 1); });

// A short, silent prologue opens into a field of cultural encounters.
const root = document.documentElement;
const opening = $('#opening');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let openingTimer;
function syncTheme(theme) {
 root.dataset.theme = theme;
 $$('[data-set-theme]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setTheme === theme)));
 $('meta[name="theme-color"]').content = theme === 'dark' ? '#10110f' : '#f7f4ed';
 try { localStorage.setItem('scheherazade-theme', theme); } catch {}
}
syncTheme(root.dataset.theme || 'dark');
$$('[data-set-theme]').forEach(b => b.addEventListener('click', () => syncTheme(b.dataset.setTheme)));
function enterCollection() {
 clearTimeout(openingTimer); opening.classList.add('is-leaving'); root.classList.add('collection-open'); document.body.classList.remove('opening-active');
 $('.header').inert = false; $('main').inert = false;
 setTimeout(() => { opening.hidden = true; }, reducedMotion.matches ? 0 : 1000);
}
function playOpening() {
 closeMenu(); window.scrollTo({top:0,behavior:'instant'}); opening.hidden = false; opening.classList.remove('is-leaving'); root.classList.remove('collection-open');
 document.body.classList.add('opening-active'); $('.header').inert = true; $('main').inert = true;
 opening.focus({preventScroll:true}); clearTimeout(openingTimer); openingTimer = setTimeout(enterCollection, 3300);
}
$('#enter-collection').addEventListener('click', enterCollection);
$$('.replay-opening').forEach(b => b.addEventListener('click', playOpening));
if (reducedMotion.matches) { opening.hidden = true; root.classList.add('collection-open'); } else playOpening();
opening.addEventListener('keydown', e => { if (e.key === 'Escape') enterCollection(); if(e.key === 'Tab') { e.preventDefault(); $('#enter-collection').focus(); } });
const galleryHero = $('.gallery-hero');
const floatingWorks = $$('.floating-work', galleryHero);
let pointerFrame;

function movePhotographs(x, y) {
 for (const work of floatingWorks) {
  const depth = Number(work.dataset.depth);
  work.style.setProperty('--drift-x', `${x * depth * 34}px`);
  work.style.setProperty('--drift-y', `${y * depth * 29}px`);
  work.style.setProperty('--tilt-x', `${-y * depth * 24}deg`);
  work.style.setProperty('--tilt-y', `${x * depth * 27}deg`);
 }
}

function resetPhotographs() {
 cancelAnimationFrame(pointerFrame);
 movePhotographs(0, 0);
}

galleryHero.addEventListener('pointermove', event => {
 if (reducedMotion.matches || event.pointerType === 'touch') return;
 cancelAnimationFrame(pointerFrame);
 pointerFrame = requestAnimationFrame(() => {
  const {left, top, width, height} = galleryHero.getBoundingClientRect();
  movePhotographs((event.clientX - left) / width - 0.5, (event.clientY - top) / height - 0.5);
 });
});
galleryHero.addEventListener('pointerleave', resetPhotographs);
reducedMotion.addEventListener('change', event => {
 if (event.matches) {
  enterCollection();
  resetPhotographs();
 }
});

const collectionSection = $('#about');
const collectionPrints = $$('.collection-print', collectionSection);
const collectionDialog = $('#collection-dialog');
const collectionDescriptions = {
 Rhythm: 'Hands play a pair of tabla drums beside a string instrument. The close crop draws attention to the gestures that shape each beat.',
 Movement: 'A dancer turns in golden light. The sweeping fabric traces the movement long after the body leaves the centre of the image.',
 Gathering: 'Musicians sit side by side with their instruments. The image captures the shared attention of an ensemble at work.',
};

function openCollectionDetail(print) {
 const image = $('img', print);
 const title = $('span', print).textContent;
 const detailImage = $('.collection-dialog-image', collectionDialog);
 detailImage.src = image.currentSrc || image.src;
 detailImage.alt = image.alt;
 $('#collection-dialog-title').textContent = title;
 $('#collection-dialog-description').textContent = collectionDescriptions[title];
 collectionDialog.showModal();
 document.body.classList.add('dialog-open');
}

function selectCollectionPrint(index) {
 collectionPrints.forEach((card, cardIndex) => {
  card.setAttribute('aria-pressed', String(cardIndex === index));
 });
}

collectionPrints.forEach((print, index) => {
 print.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' || event.pointerType === 'pen') selectCollectionPrint(index);
 });
 print.addEventListener('click', () => {
  selectCollectionPrint(index);
  openCollectionDetail(print);
 });
 print.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  const direction = event.key === 'ArrowRight' ? 1 : -1;
  const next = (index + direction + collectionPrints.length) % collectionPrints.length;
  collectionPrints[next].focus({preventScroll: true});
  selectCollectionPrint(next);
 });
});

floatingWorks.forEach(work => {
 const liftPrint = () => {
  if (!reducedMotion.matches) work.classList.add('has-lifted');
 };
 work.addEventListener('pointerenter', liftPrint);
 work.addEventListener('focus', liftPrint);
 work.addEventListener('click', liftPrint);
});
