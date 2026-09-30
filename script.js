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
