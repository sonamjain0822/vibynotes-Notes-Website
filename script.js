// Smooth scroll utility
function scrollToSection(id){
  const section=document.getElementById(id);
  if(section){
    section.scrollIntoView({behavior:'smooth'});
    section.style.transition='background 0.6s';
    const original=section.style.background;
    section.style.background='linear-gradient(90deg,#fff8e6,#fff)';
    setTimeout(()=>{section.style.background=original;},900);
  }
}

// Hero rotating backgrounds
const heroBg = document.getElementById('heroBg');
const heroPhrases = [
  'From my pages to your preparation — every note has a story. 🌸',
  'Handwritten notes help memory and understanding — try active recall! ✨',
  'Turn small daily habits into lasting learning routines. 💪',
  'A tidy space and gentle mood create study focus. ☕'
];
let heroIndex=0;
const heroBackgrounds = [
  `linear-gradient(135deg, rgba(255,234,179,0.85), rgba(255,208,245,0.8)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><g fill="%23ffd1f0" opacity="0.18"><circle cx="90" cy="80" r="40"/><circle cx="170" cy="120" r="30"/><circle cx="420" cy="60" r="50"/></g></svg>')`,
  `linear-gradient(135deg, rgba(204,255,229,0.95), rgba(193,228,255,0.9)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><g fill="%2382cfa8" opacity="0.12"><ellipse cx="80" cy="70" rx="50" ry="24"/><ellipse cx="210" cy="120" rx="60" ry="30"/></g></svg>')`,
  `linear-gradient(120deg, rgba(255,250,240,0.95), rgba(240,250,255,0.95)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0, transparent 20%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.5) 0, transparent 18%)`,
  `linear-gradient(120deg, rgba(241,238,255,0.95), rgba(230,245,255,0.9)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="%23f3f0ff" opacity="0.06"/></svg>')`
];

function rotateHero(){
  document.getElementById('heroContent').innerText = heroPhrases[heroIndex % heroPhrases.length];
  heroBg.style.backgroundImage = heroBackgrounds[heroIndex % heroBackgrounds.length];
  heroIndex++;
}
rotateHero();
setInterval(rotateHero,3500);

// Blog data
const blogs = [
  {id:1,title:'Tiny Notes, Big Recall',cover:'linear-gradient(135deg,#ffd1e6,#ffe6d1)',excerpt:'Short, handwritten summaries help you recall faster. Capture only formulas, keywords and one-sentence explanations.',content:`Handwritten micro-notes act as mental anchors...`},
  {id:2,title:'From Notes to Concepts',cover:'linear-gradient(135deg,#d6fff2,#e3f0ff)',excerpt:'Turn lists into concept maps to understand connections — not only memory but clarity grows.',content:`Notes become powerful when you stop copying and start connecting...`},
  {id:3,title:'Motivation in Margins',cover:'linear-gradient(135deg,#fff1d6,#ffe9f3)',excerpt:'Write short motivational lines in margins — they make revision emotional and memorable.',content:`A small, kind sentence in the margin can change how you approach hard topics...`},
  {id:4,title:'Active Recall Rituals',cover:'linear-gradient(135deg,#e8ffd6,#e6f5ff)',excerpt:'Make a short question bank from your notes and quiz yourself — active recall beats passive reading every time.',content:`Active recall is the single most effective study strategy...`},
  {id:5,title:'Design Notes for Exams',cover:'linear-gradient(135deg,#fce7ff,#eafff5)',excerpt:'Structure your notes like an answer sheet — headings, short points and quick diagrams help in writing exam-perfect answers.',content:`When exam time comes, well-designed notes are priceless...`},
  {id:6,title:'Teach to Remember',cover:'linear-gradient(135deg,#fff0f0,#e8f0ff)',excerpt:'Explain a page aloud to an imaginary friend — teaching converts notes into durable knowledge.',content:`Teaching is the final step in the learning loop...`}
];

// Render blogs
const container = document.getElementById('blogContainer');
blogs.forEach(b => {
  const card = document.createElement('div');
  card.className='blog-card';
  card.innerHTML = `
    <div class="blog-cover" style="background:${b.cover}">${b.title}</div>
    <h3>${b.title}</h3>
    <p class="excerpt">${b.excerpt}</p>
    <div class="read-more">Read Full</div>
  `;
  card.addEventListener('click',()=>openBlog(b.id));
  container.appendChild(card);
});

function openBlog(id){
  const b = blogs.find(x=>x.id===id);
  if(!b) return;
  document.getElementById('popupTitle').innerText = b.title;
  document.getElementById('popupContent').innerText = b.content;
  document.getElementById('popupCover').style.background = b.cover;
  document.getElementById('overlay').style.display='flex';
  document.body.style.overflow='hidden';
}
function closeBlog(){
  document.getElementById('overlay').style.display='none';
  document.body.style.overflow='auto';
}

// Explore Blogs button
document.getElementById('exploreBlogsBtn').addEventListener('click',()=>{
  scrollToSection('blogs');
  setTimeout(()=>{ openBlog(1); },600);
});

// Chat functions
function openChat(){
  const chat = document.getElementById('chatPopup');
  const greeting = document.getElementById('chatGreeting');
  const hour = new Date().getHours();
  let greet = 'Hello!';
  if(hour>=5 && hour<12) greet='Hey! Good Morning 🌞';
  else if(hour>=12 && hour<17) greet='Hey! Good Afternoon 🌤️';
  else greet='Hey! Good Evening 🌙';
  greeting.innerText = greet + ' How can I help you?';
  chat.style.display='block';
}
window.openChat = openChat;

function sendMessage(){
  const msg = document.getElementById('chatMessage').value.trim();
  if(msg){
    document.getElementById('messageSentPopup').style.display='block';
    setTimeout(()=>{ document.getElementById('messageSentPopup').style.display='none'; closeChat(); },1200);
    document.getElementById('chatMessage').value='';
  }
}
function closeChat(){
  document.getElementById('chatPopup').style.display='none';
}
window.sendMessage = sendMessage;

document.getElementById('overlay').addEventListener('click',(e)=>{ if(e.target.id==='overlay') closeBlog(); });
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeBlog(); });
