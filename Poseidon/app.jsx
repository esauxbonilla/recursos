/* ===== Legionarios — app ===== */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Icons ---------- */
const I = {
  search:(p)=> <svg viewBox="0 0 24 24" {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  heart:(p)=> <svg viewBox="0 0 24 24" {...p}><path d="M12 20s-7-4.5-9.3-9C1 7.5 3 4.5 6.2 4.5c2 0 3.2 1.2 3.8 2.2.6-1 1.8-2.2 3.8-2.2 3.2 0 5.2 3 3.5 6.5C19 15.5 12 20 12 20z"/></svg>,
  user:(p)=> <svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-5.5 8-5.5S18.5 17 20 21"/></svg>,
  bag:(p)=> <svg viewBox="0 0 24 24" {...p}><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>,
  arrowR:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  arrowL:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>,
  menu:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  close:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  pause:(p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>,
};

/* ---------- Image slot (drop your src here) ---------- */
function Slot({label, src, dark, className=""}){
  return (
    <div className={`slot ${dark?"slot--dark":""} ${className}`}>
      {src ? <img src={src} alt={label}/> : <span className="slot__tag">[ {label} ]</span>}
    </div>
  );
}

/* ---------- Data ----------
   Mete tus imágenes en `img`. Déjalo "" para ver el placeholder. */
const SWATCH = {black:"#1b1a18",stone:"#cfc6b8",olive:"#6b6a4e",red:"#9b1b1b",navy:"#26314a",grey:"#9a958d",sand:"#d8cdb8",bone:"#efeae0",wine:"#5a2230",pink:"#c9647e",white:"#f4f2ee"};

const NEW_IN = [
  {id:"n1", name:"Poseidon Oversize Tee", fit:"Oversized Fit", color:"Vino / Burdeos", price:649, badge:"NEW", img:"refs/11.jpg", sw:["wine","black","grey"]},
  {id:"n2", name:"Mens Sana Oversize Tee", fit:"Oversized Fit", color:"Negro Olimpo", price:649, badge:"NEW", img:"refs/14.jpg", sw:["black","grey","navy"]},
  {id:"n3", name:"Aries — Spear of Olympus", fit:"Oversized Fit", color:"Blanco Hueso", price:679, badge:"NEW", img:"refs/16.jpg", sw:["white","black","sand"]},
  {id:"n4", name:"Olimpo Compression LS", fit:"Muscle Fit", color:"Blanco", price:549, badge:"", img:"refs/15.jpg", sw:["white","black","navy"]},
  {id:"n5", name:"Bodybuilding Acid Crop", fit:"Cropped Fit", color:"Gris Lavado", price:589, badge:"FORHER", img:"refs/12.jpg", sw:["grey","black","wine"]},
  {id:"n6", name:"Rey del Mar Oversize Tee", fit:"Oversized Fit", color:"Negro Abismo", price:649, badge:"NEW", img:"refs/17.jpg", sw:["black","navy","grey"]},
];

const BEST = [
  {id:"b1", name:"Abismo Oversize Tee", fit:"Oversized Fit", color:"Negro / Tridente", price:649, badge:"BESTSELLER", img:"refs/19.jpg", sw:["black","navy","grey"]},
  {id:"b2", name:"The Absolute Zeus Tank", fit:"Muscle Fit", color:"Negro", price:499, badge:"NEW", img:"refs/13.jpg", sw:["black","grey","red"]},
  {id:"b3", name:"The One Butterfly Tee", fit:"Oversized Fit", color:"Negro / Rosa", price:440.30, was:629, badge:"-30%", sale:true, img:"refs/18.jpg", sw:["black","pink","grey"]},
  {id:"b4", name:"Aries — Spear of Olympus", fit:"Oversized Fit", color:"Blanco Hueso", price:679, badge:"FORHIM", img:"refs/16.jpg", sw:["white","black","sand"]},
];

/* ---------- Product card ---------- */
function ProductCard({p, wished, onWish, onAdd}){
  const [sel, setSel] = useState(0);
  return (
    <article className="pcard">
      <div className="pcard__media">
        <Slot label={`PRODUCT — ${p.name}`} src={p.img}/>
        {p.badge && <span className={`pcard__badge ${p.sale?"pcard__badge--sale":""}`}>{p.badge}</span>}
        <button className={`pcard__wish ${wished?"on":""}`} aria-label="Wishlist" onClick={()=>onWish(p.id)}>
          {I.heart()}
        </button>
        <button className="pcard__add" onClick={()=>onAdd(p.id)}>+ Quick Add</button>
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name">{p.name}</h3>
        <div className="pcard__fit">{p.fit}</div>
        <div className="pcard__color">{p.color}</div>
        <div className="pcard__price">
          <span className={p.sale?"now--sale":""}>${p.price.toFixed(2).replace(/\.00$/,"")}</span>
          {p.was && <span className="was">${p.was}</span>}
        </div>
        {p.sw && p.sw.length>1 &&
          <div className="swatches">
            {p.sw.map((s,i)=>(
              <span key={i} className={`swatch ${i===sel?"sel":""}`} style={{background:SWATCH[s]||s}}
                    onClick={()=>setSel(i)} title={s}/>
            ))}
          </div>}
      </div>
    </article>
  );
}

/* ---------- Carousel ---------- */
function Carousel({title, items, wishes, onWish, onAdd}){
  const rail = useRef(null);
  const [edge, setEdge] = useState({l:true,r:false});
  const check = useCallback(()=>{
    const el = rail.current; if(!el) return;
    setEdge({ l: el.scrollLeft<8, r: el.scrollLeft+el.clientWidth >= el.scrollWidth-8 });
  },[]);
  useEffect(()=>{ check(); const el=rail.current; el.addEventListener("scroll",check); window.addEventListener("resize",check);
    return ()=>{el.removeEventListener("scroll",check);window.removeEventListener("resize",check)};},[check]);
  const go = (dir)=>{ const el=rail.current; el.scrollBy({left:dir*Math.min(el.clientWidth*.8,700),behavior:"smooth"}); };
  return (
    <section className="sec wrap">
      <div className="shead">
        <div className="shead__l">
          <h2>{title}</h2>
          <a className="viewall" href="#">Ver Todo</a>
        </div>
        <div className="carrows">
          <button className="carrow" onClick={()=>go(-1)} disabled={edge.l} aria-label="Prev">{I.arrowL()}</button>
          <button className="carrow" onClick={()=>go(1)} disabled={edge.r} aria-label="Next">{I.arrowR()}</button>
        </div>
      </div>
      <div className="crail" ref={rail}>
        {items.map(p=> <ProductCard key={p.id} p={p} wished={wishes.has(p.id)} onWish={onWish} onAdd={onAdd}/>)}
      </div>
    </section>
  );
}

/* ---------- Announcement bar ---------- */
const ANNO = [
  <>Envíos a todo México · <em>Gratis</em> en pedidos +$999 MXN</>,
  <>Únete al Olimpo · <em>12% OFF</em> en tu primera orden</>,
  <><em>New Drop</em>: La Colección Olimpo ya aterrizó</>,
];
function Announce(){
  const [i,setI]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setI(v=>(v+1)%ANNO.length),4200); return ()=>clearInterval(t); },[]);
  return (
    <div className="anno">
      <div className="anno__track"><span className="anno__msg" key={i}>{ANNO[i]}</span></div>
      <div className="anno__dots">{ANNO.map((_,k)=><span key={k} className={`anno__dot ${k===i?"on":""}`}/>)}</div>
    </div>
  );
}

/* ---------- Header ---------- */
function Header({cart, onMenu}){
  return (
    <header className="hdr">
      <div className="wrap">
        <div className="hdr__row">
          <div className="nav-wrap" style={{display:"flex",alignItems:"center"}}>
            <button className="iconbtn burger" onClick={onMenu} aria-label="Menu">{I.menu()}</button>
            <nav className="nav">
              <a href="#">Hombre</a>
              <a href="#">Mujer</a>
              <a href="#">Olimpo</a>
              <a className="accent" href="#">New In</a>
            </nav>
          </div>
          <a className="brand" href="#">POSEIDON</a>
          <div className="tools">
            <button className="iconbtn" aria-label="Search">{I.search()}</button>
            <button className="iconbtn" aria-label="Wishlist">{I.heart()}</button>
            <button className="iconbtn" aria-label="Account">{I.user()}</button>
            <button className="iconbtn" aria-label="Bag">
              {I.bag()}
              {cart>0 && <span className="cartcount">{cart}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero(){
  return (
    <section className="hero">
      <Slot label="HERO — 1920×1080 lifestyle / video" src="refs/10.jpg" dark/>
      <div className="hero__veil"/>
      <div className="wrap hero__inner">
        <div className="hero__kicker">Forjada para la disciplina</div>
        <h1>ENTRENA COMO UN DIOS<br/>VISTE COMO UNO.</h1>
        <p className="hero__sub">Ropa deportiva y streetwear nacida en el gimnasio. Entrena como un dios, viste como una leyenda.</p>
        <div className="hero__cta">
          <a className="btn btn--light" href="#">Comprar New In</a>
          <a className="btn btn--ghost" href="#">Únete al Olimpo</a>
        </div>
      </div>
      <button className="hero__pause" aria-label="Pause">{I.pause()}</button>
    </section>
  );
}

/* ---------- Double banner ---------- */
function Duo(){
  return (
    <section className="sec--tight wrap">
      <div className="duo">
        <div className="duo__cell">
          <Slot label="HOMBRE — campaign" src="refs/14.jpg" dark/>
          <div className="duo__veil"/>
          <div className="duo__body">
            <h3>Para Él</h3>
            <a className="btn btn--light btn--sm" href="#">Comprar Hombre</a>
          </div>
        </div>
        <div className="duo__cell">
          <Slot label="MUJER — campaign" src="refs/18.jpg" dark/>
          <div className="duo__veil"/>
          <div className="duo__body">
            <h3>Poseidon For Her</h3>
            <a className="btn btn--light btn--sm" href="#">Comprar Mujer</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bestsellers grid ---------- */
function Bestsellers({wishes,onWish,onAdd}){
  return (
    <section className="sec wrap">
      <div className="shead">
        <div className="shead__l">
          <h2>Lo Más Vendido</h2>
          <a className="viewall" href="#">Ver Todo</a>
        </div>
      </div>
      <div className="grid4">
        {BEST.map(p=> <ProductCard key={p.id} p={p} wished={wishes.has(p.id)} onWish={onWish} onAdd={onAdd}/>)}
      </div>
    </section>
  );
}

/* ---------- Promise strip ---------- */
function Promise(){
  const items=[
    ["Envíos a Todo México","Gratis en pedidos +$999 MXN"],
    ["Cambios Fáciles","30 días sin complicaciones"],
    ["Calidad de Dioses","Telas premium, probadas en el gym"],
    ["Únete al Olimpo","Recompensas desde el día uno"],
  ];
  return (
    <section className="promise"><div className="wrap"><div className="promise__row">
      {items.map(([h,p],i)=>(
        <div className="promise__cell" key={i}><h4>{h}</h4><p>{p}</p></div>
      ))}
    </div></div></section>
  );
}

/* ---------- Footer ---------- */
function Footer(){
  const cols=[
    ["Tienda",["New In","Hombre","Mujer","Olimpo","Ofertas"]],
    ["Ayuda",["Envíos","Cambios y Devoluciones","Guía de Tallas","Rastrea tu Pedido","Contacto"]],
    ["Poseidon",["Nuestra Historia","Distribuidores","Embajadores","Mayoreo","Eventos"]],
  ];
  return (
    <footer className="foot"><div className="wrap">
      <div className="foot__top">
        <div>
          <div className="foot__brand">POSEIDON</div>
          <p className="muted2">Ropa deportiva y streetwear forjada para la disciplina. Únete al Olimpo y recibe los drops antes que nadie.</p>
          <div className="foot__news">
            <input placeholder="Tu correo electrónico" aria-label="Email"/>
            <button>Unirme</button>
          </div>
        </div>
        {cols.map(([h,links])=>(
          <div key={h}><h5>{h}</h5><ul>{links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul></div>
        ))}
      </div>
      <div className="foot__bar">
        <span>© 2026 Poseidon Clothing · Hecho en México. Todos los derechos reservados.</span>
        <div className="foot__pay">{Array.from({length:5}).map((_,i)=><i key={i}/>)}</div>
      </div>
    </div></footer>
  );
}

/* ---------- Mobile sheet ---------- */
function MobileMenu({open,onClose}){
  return (
    <div className={`msheet ${open?"open":""}`}>
      <div className="msheet__scrim" onClick={onClose}/>
      <div className="msheet__panel">
        <button className="msheet__close" onClick={onClose} aria-label="Close">{I.close()}</button>
        {["Hombre","Mujer","Olimpo","New In","Ofertas"].map(l=><a key={l} href="#" onClick={onClose}>{l}</a>)}
      </div>
    </div>
  );
}

/* ---------- App ---------- */
function App(){
  const [cart,setCart]=useState(0);
  const [wishes,setWishes]=useState(()=>new Set());
  const [menu,setMenu]=useState(false);
  const onWish=(id)=>setWishes(s=>{const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n;});
  const onAdd=()=>setCart(c=>c+1);
  return (
    <>
      <Announce/>
      <Header cart={cart} onMenu={()=>setMenu(true)}/>
      <Hero/>
      <Carousel title="New In · Colección Olimpo" items={NEW_IN} wishes={wishes} onWish={onWish} onAdd={onAdd}/>
      <Duo/>
      <Bestsellers wishes={wishes} onWish={onWish} onAdd={onAdd}/>
      <Promise/>
      <Footer/>
      <MobileMenu open={menu} onClose={()=>setMenu(false)}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
