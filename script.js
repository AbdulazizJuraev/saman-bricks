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

// Uy g'ishtdan pastdan yuqoriga qurilib chiqadi
(function(){
  const box=document.getElementById("house"); if(!box) return;
  const svg=box.querySelector("svg"), NS="http://www.w3.org/2000/svg";
  const el=(t,a,p)=>{const n=document.createElementNS(NS,t);for(const k in a)n.setAttribute(k,a[k]);(p||svg).appendChild(n);return n;};
  const reds=["#b5462b","#c0553a","#a93f26","#cc5a3c","#9c3822"];
  const door={x1:172,x2:228,y1:250}, wins=[[96,140],[260,304]], wy=[232,270];
  const R=9,H=16,P=18,X0=71,Y0=340;
  const inDoor=(x,y,w)=>{const cx=x+w/2,cy=y+H/2;return (cx>door.x1&&cx<door.x2&&cy>door.y1)||wins.some(([a,b])=>cx>a&&cx<b&&cy>wy[0]&&cy<wy[1]);};
  el("rect",{x:40,y:340,width:320,height:8,rx:3,fill:"#5a4a40"});
  const bricks=[];
  for(let r=0;r<R;r++){
    const y=Y0-(r+1)*P, odd=r%2, list=[];
    if(odd){list.push([X0,19.5]);for(let i=0;i<5;i++)list.push([X0+21.5+i*43,41]);list.push([X0+21.5+5*43,19.5]);}
    else for(let i=0;i<6;i++)list.push([X0+i*43,41]);
    list.forEach(([x,w],i)=>{ if(inDoor(x,y,w))return;
      const b=el("rect",{x,y,width:w,height:H,rx:2,fill:reds[(r*3+i*2)%reds.length],class:"b"});
      b.style.animationDelay=(r*0.5+i*0.06)+"s"; bricks.push(b);});
  }
  const t0=R*0.5+0.6;
  const part=(n,d)=>{n.setAttribute("class","part");n.style.animationDelay=d+"s";return n;};
  part(el("rect",{x:268,y:78,width:24,height:70,fill:"#8f3420"}),t0);
  part(el("polygon",{points:"48,184 200,66 352,184 352,196 48,196",fill:"#4a3a32"}),t0);
  part(el("polygon",{points:"58,180 200,72 342,180",fill:"#b5462b"}),t0+.15);
  part(el("rect",{x:door.x1,y:door.y1,width:56,height:90,rx:3,fill:"#d9a441"}),t0+.6);
  part(el("circle",{cx:218,cy:296,r:3,fill:"#5a3a12"}),t0+.7);
  wins.forEach(([a,b],i)=>{part(el("rect",{x:a,y:wy[0],width:b-a,height:wy[1]-wy[0],rx:3,fill:"#8fc6e8",stroke:"#f6f1ea","stroke-width":4}),t0+.8+i*.15);});
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)box.classList.add("soft");
  const run=()=>{box.classList.remove("go");void box.offsetWidth;box.classList.add("go");};
  run(); setInterval(run,(t0+2.6+5)*1000);
})();
