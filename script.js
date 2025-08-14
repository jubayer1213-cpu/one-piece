const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));
$$('#year').forEach(n=>n.textContent=new Date().getFullYear());

async function getCharacters(){
  const res = await fetch('characters.json', {cache:'no-store'});
  if(!res.ok) throw new Error('Failed to load characters.json');
  return await res.json();
}

function card(c){
  const a = document.createElement('a');
  a.href = `character.html?id=${encodeURIComponent(c.id)}`;
  a.className = 'card-link';
  a.innerHTML = `
    <article class="char-card card">
      <div class="bounty">฿ ${c.bounty.toLocaleString()}</div>
      <img class="poster" src="${c.image}" alt="${c.name}">
      <div class="body">
        <h3>${c.name}</h3>
        <div class="meta">
          <span class="badge">${c.role}</span>
          ${c.devil_fruit ? `<span>🍇 ${c.devil_fruit}</span>` : `<span>🗡️ No Devil Fruit</span>`}
        </div>
      </div>
    </article>`;
  return a;
}

function renderGrid(list){
  const grid = $('#bounties');
  const count = $('#count');
  const search = $('#search');
  const pills = $$('.pill');
  let currentFilter = 'all';

  const apply = () => {
    const q = (search?.value||'').toLowerCase();
    const filtered = list.filter(c => {
      const matchesText = [c.name, c.role, c.devil_fruit||'', ...(c.powers||[])].join(' ').toLowerCase().includes(q);
      const hasFruit = !!c.devil_fruit;
      const hasHaki = (c.haki||[]).length > 0;
      if(currentFilter==='devil-fruit' && !hasFruit) return false;
      if(currentFilter==='haki' && !hasHaki) return false;
      if(currentFilter==='non-fruit' && hasFruit) return false;
      return matchesText;
    });
    grid.innerHTML = '';
    filtered.forEach(c => grid.appendChild(card(c)));
    if(count) count.textContent = `${filtered.length} character(s)`;
  };

  search?.addEventListener('input', apply);
  pills.forEach(p => p.addEventListener('click', () => {
    pills.forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
    currentFilter = p.dataset.filter;
    apply();
  }));

  apply();
}

function getId(){
  const u = new URL(window.location.href);
  return u.searchParams.get('id');
}

function renderProfile(list){
  const wrap = $('#profile');
  if(!wrap) return;
  const id = getId();
  const c = list.find(x => x.id === id) || list[0];
  if(!c){ wrap.innerHTML = '<p>Character not found.</p>'; return; }
  document.title = `${c.name} — One Piece Encyclopedia`;

  wrap.innerHTML = `
    <img class="poster" src="${c.image}" alt="${c.name}">
    <div>
      <h1>${c.name}</h1>
      <div class="kv">
        <span class="chip">${c.role}</span>
        ${c.devil_fruit ? `<span class="chip">Devil Fruit: ${c.devil_fruit}</span>` : `<span class="chip">No Devil Fruit</span>`}
        <span class="chip">Bounty: ฿ ${c.bounty.toLocaleString()}</span>
        <span class="chip">First appearance: ${c.first_appearance}</span>
      </div>

      <div class="section">
        <h3>Powers</h3>
        ${(c.powers||[]).map(p=>`<span class="power">${p}</span>`).join('') || '<p>No special powers listed.</p>'}
      </div>

      ${(c.haki && c.haki.length) ? `
      <div class="section">
        <h3>Haki</h3>
        ${c.haki.map(h=>`<span class="haki">${h}</span>`).join('')}
      </div>` : ''}

      <div class="section">
        <h3>Backstory</h3>
        <p>${c.bio}</p>
      </div>
    </div>
  `;
}

getCharacters().then(list => {
  if(document.body.contains(document.getElementById('bounties'))){
    renderGrid(list);
  }else{
    renderProfile(list);
  }
}).catch(err => {
  console.error(err);
  const tgt = document.getElementById('bounties') || document.getElementById('profile') || document.body;
  tgt.innerHTML = `<p>Failed to load <code>characters.json</code>. Make sure it's in the repo root.</p>`;
});
