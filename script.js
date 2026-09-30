// Namuna ma'lumotlar — haqiqiy mahsulotlarga almashtiring
const PRODUCTS = [
  {name:"Qizil g'isht M150",cat:"qizil",size:"250×120×65",mark:"M150",weight:"3.5 kg",pallet:400,price:1100,color:"#b5462b",tag:"Xit"},
  {name:"Qizil g'isht M125",cat:"qizil",size:"250×120×65",mark:"M125",weight:"3.4 kg",pallet:400,price:980,color:"#c0553a"},
  {name:"Bo'sh g'isht (8 teshikli)",cat:"bosh",size:"250×120×88",mark:"M125",weight:"2.9 kg",pallet:320,price:1250,color:"#a93f26",hollow:true},
  {name:"Bo'sh g'isht (yirik blok)",cat:"bosh",size:"250×250×138",mark:"M100",weight:"6.2 kg",pallet:150,price:2900,color:"#9c3822",hollow:true,tag:"Tejamkor"},
  {name:"Fasad g'isht (oxra)",cat:"fasad",size:"250×120×65",mark:"M175",weight:"3.5 kg",pallet:400,price:1800,color:"#d59a52",tag:"Fasad"},
  {name:"Fasad g'isht (jigarrang)",cat:"fasad",size:"250×120×65",mark:"M175",weight:"3.5 kg",pallet:400,price:1850,color:"#6b3a2a"},
  {name:"Pechka g'ishti (o'tga chidamli)",cat:"pech",size:"230×114×65",mark:"ША-8",weight:"3.8 kg",pallet:350,price:3200,color:"#d9c39a"},
];
const fmt = n => n.toLocaleString("ru-RU").replace(/ /g," ");
const grid = document.getElementById("grid");
let current = "all";

function render(){
  grid.innerHTML = PRODUCTS.filter(p=>current==="all"||p.cat===current).map(p=>`
    <article class="card">
      <div class="card-body">
        ${p.tag?`<span class="tag">${p.tag}</span>`:""}
        <h3>${p.name}</h3>
        <p class="mark">Marka: <b>${p.mark}</b></p>
        <div class="card-foot">
          <a href="#contact" class="btn btn-outline" data-p="${p.name}" style="padding:9px 16px;width:100%;justify-content:center">Narx so'rash</a>
        </div>
      </div>
    </article>`).join("");
  document.querySelectorAll("[data-p]").forEach(b=>b.addEventListener("click",()=>{
    document.getElementById("cProduct").value=b.dataset.p;
  }));
}
document.querySelectorAll(".chip").forEach(c=>c.addEventListener("click",()=>{
  document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
  c.classList.add("active"); current=c.dataset.f; render();
}));
render();

// Kalkulyator (1 m² devorga g'isht soni)
const wall = {half:51, one:102, one5:153}; // dona/m² (250×120×65, choklar bilan)
function calc(){
  const area = +document.getElementById("area").value||0;
  const t = document.getElementById("thick").value;
  const n = Math.ceil(area*wall[t]*1.05);
  document.getElementById("cnt").textContent = fmt(n)+" dona";
  document.getElementById("pal").textContent = "≈ "+Math.ceil(n/400)+" paddon (5% zaxira bilan)";
}
["area","thick"].forEach(id=>document.getElementById(id).addEventListener("input",calc));
calc();

// Galereya: video kadrlari, bosilganda shu joydan video ochiladi
const modal = document.getElementById("vmodal"), mv = modal.querySelector("video");
document.querySelectorAll(".shot").forEach(s=>s.addEventListener("click",()=>{
  mv.src = "vidio/Saman_Bricks_reklama_1.mp4#t="+s.dataset.t;
  modal.classList.add("open"); mv.play().catch(()=>{});
}));
const closeModal=()=>{modal.classList.remove("open");mv.pause();};
modal.addEventListener("click",e=>{if(e.target===modal||e.target.classList.contains("x"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

// Menyu
const navEl=document.querySelector("nav"),scrim=document.querySelector(".scrim"),burger=document.querySelector(".burger");
const setNav=o=>{navEl.classList.toggle("open",o);scrim.classList.toggle("open",o);burger.textContent=o?"✕":"☰";};
burger.addEventListener("click",()=>setNav(!navEl.classList.contains("open")));
scrim.addEventListener("click",()=>setNav(false));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>setNav(false)));

// Formalar (hozircha demo — haqiqiy backend/Telegram botga ulanadi)
document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{
  e.preventDefault();
  const ok=f.querySelector(".ok"); if(ok) ok.style.display="block"; else alert("Rahmat! Tez orada bog'lanamiz.");
  f.reset();
}));

// Ko'p qavatli binolar g'ishtdan pastdan yuqoriga qurilib chiqadi
(function(){
  const box=document.getElementById("house"); if(!box) return;
  const svg=box.querySelector("svg"), NS="http://www.w3.org/2000/svg";
  svg.setAttribute("viewBox","0 0 520 380");
  const el=(t,a)=>{const n=document.createElementNS(NS,t);for(const k in a)n.setAttribute(k,a[k]);svg.appendChild(n);return n;};
  const H=16,P=18,GY=350,RD=0.28;
  const palettes=[["#b5462b","#c0553a","#a93f26","#cc5a3c"],["#c8683a","#d4773f","#b95a30","#dd8248"],["#8f3420","#9c3822","#7f2d1b","#a8452b"],["#b5462b","#a93f26","#c0553a","#9c3822"]];
  const towers=[{x:8,w:112,f:5,s:0.5},{x:134,w:132,f:8,s:0},{x:280,w:112,f:6,s:0.9},{x:406,w:106,f:4,s:0.3}];
  el("rect",{x:0,y:GY,width:520,height:10,rx:3,fill:"#5a4a40"});
  let end=0;
  const part=(n,d)=>{n.setAttribute("class","part");n.style.animationDelay=d+"s";return n;};
  towers.forEach((t,ti)=>{
    const rows=t.f*2, cols=Math.max(3,Math.round(t.w/26)), pitch=t.w/cols, pal=palettes[ti];
    const nw=Math.max(2,Math.floor((t.w-14)/34)), gap=(t.w-nw*20)/(nw+1);
    const wins=[];
    for(let fl=0;fl<t.f;fl++){const top=GY-(fl+1)*2*P;for(let k=0;k<nw;k++){
      if(fl===0&&k===Math.floor(nw/2))continue;
      wins.push({x:t.x+gap+k*(20+gap),y:top+9,w:20,h:24,fl,lit:((fl*7+k*5+ti*3)%4===0)});}}
    const door={x:t.x+t.w/2-11,y:GY-34,w:22,h:34};
    const hit=(cx,cy)=>wins.some(o=>cx>o.x&&cx<o.x+o.w&&cy>o.y&&cy<o.y+o.h)||(cx>door.x&&cx<door.x+door.w&&cy>door.y);
    for(let r=0;r<rows;r++){
      const y=GY-(r+1)*P,odd=r%2,list=[];
      if(odd){list.push([t.x,pitch/2-2]);for(let c=0;c<cols-1;c++)list.push([t.x+pitch/2+c*pitch,pitch-2]);list.push([t.x+pitch/2+(cols-1)*pitch,pitch/2-2]);}
      else for(let c=0;c<cols;c++)list.push([t.x+c*pitch,pitch-2]);
      list.forEach(([x,w],c)=>{ if(hit(x+w/2,y+H/2))return;
        const b=el("rect",{x,y,width:w,height:H,rx:2,fill:pal[(r*3+c*2)%pal.length],class:"b"});
        b.style.animationDelay=(t.s+r*RD+c*0.04)+"s";});
    }
    wins.forEach(o=>part(el("rect",{x:o.x,y:o.y,width:o.w,height:o.h,rx:2,fill:o.lit?"#f4c95d":"#8fc6e8",stroke:"#f6f1ea","stroke-width":2.5}),t.s+(o.fl*2+2)*RD+0.2));
    part(el("rect",{x:door.x,y:door.y,width:door.w,height:door.h,rx:2,fill:"#d9a441"}),t.s+2*RD+0.2);
    const roofT=t.s+rows*RD+0.35, ry=GY-rows*P;
    part(el("rect",{x:t.x-4,y:ry-8,width:t.w+8,height:8,rx:2,fill:"#4a3a32"}),roofT);
    if(ti===1){part(el("rect",{x:t.x+t.w/2-2,y:ry-52,width:4,height:44,fill:"#4a3a32"}),roofT+.2);part(el("circle",{cx:t.x+t.w/2,cy:ry-54,r:4,fill:"#e0523a"}),roofT+.4);}
    else part(el("rect",{x:t.x+14,y:ry-22,width:28,height:14,rx:2,fill:"#8f3420"}),roofT+.15);
    end=Math.max(end,roofT+.8);
  });
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)box.classList.add("soft");
  const run=()=>{box.classList.remove("go");void box.offsetWidth;box.classList.add("go");};
  run(); setInterval(run,(end+5)*1000);
})();
