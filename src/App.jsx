import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Leaf,
  Menu,
  Minus,
  Plus,
  Recycle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const products = [
  {
    id: "starter",
    name: "Guardian Starter Blind Box",
    subtitle: "1 clip + 2 refill pads",
    price: 399,
    category: "blind box",
    image: asset("starter-box.png"),
    badge: "BEST START",
    color: "#e8ad43",
  },
  {
    id: "refill-five",
    name: "Guardian Refill Pack",
    subtitle: "5 individually sealed pads",
    price: 115,
    category: "refills",
    image: asset("refill-five.png"),
    badge: "5 PADS",
    color: "#8ca648",
  },
];

const guardians = [
  { id: "school", name: "School Guardian", note: "Core character", image: asset("school-guardian.png"), color: "#78983f" },
  { id: "rain", name: "Rain Guardian", note: "Core character", image: asset("rain-guardian.png"), color: "#eabf3a" },
  { id: "birthday", name: "Birthday Guardian", note: "Core character", image: asset("birthday-guardian.png"), color: "#e97e9a" },
  { id: "dream", name: "Dream Guardian", note: "Core character", image: asset("dream-guardian.png"), color: "#8b73b7" },
  { id: "secret", name: "Secret Guardian", note: "Rare surprise", image: asset("secret-guardian.png"), color: "#33415d" },
];

const formatPrice = (price) => `฿${price.toLocaleString("en-US")}`;

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState([]);
  const [toast, setToast] = useState("");
  const [blindBoxOpen, setBlindBoxOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen || mobileOpen || blindBoxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, searchOpen, mobileOpen, blindBoxOpen]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) => `${product.name} ${product.subtitle}`.toLowerCase().includes(normalized));
  }, [query]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...items, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} joined your adventure!`);
  };

  const updateQuantity = (id, amount) => {
    setCart((items) => items
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  };

  const scrollToShop = () => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="app-shell">
      <div className="announcement">
        <span>Free Thailand delivery over ฿799</span>
        <span className="announcement-center"><Sparkles size={14} /> Tiny guardian. Big adventures. <Sparkles size={14} /></span>
        <span>Every pad protects for up to 3 days</span>
      </div>

      <header className="navbar">
        <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu /></button>
        <a className="brand" href="#top" aria-label="MOMONO home">
          <img src={asset("momono-logo.png")} alt="MOMONO" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#guardians">Guardians</a>
          <a href="#how-it-works">How it works</a>
          <a href="#our-story">Our story</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}><Search /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
            <ShoppingBag />
            <span className="cart-label">Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <img className="hero-image" src={asset("momono-world.png")} alt="Children and MOMONO guardian characters playing outdoors" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <div className="eyebrow light"><span /> Meet the guardian club</div>
            <h1>Small clip.<br />Big adventures.</h1>
            <p>Bio-based mosquito protection, reimagined as a tiny friend kids will love to take everywhere.</p>
            <div className="hero-actions">
              <button className="primary-button orange" onClick={scrollToShop}>Shop the collection <ArrowRight size={19} /></button>
              <a className="text-link light-link" href="#how-it-works">See how it works <ChevronRight size={18} /></a>
            </div>
          </div>
          <div className="hero-facts">
            <div><Leaf /><span><strong>Bio-based</strong> gentle formula</span></div>
            <div><ShieldCheck /><span><strong>Up to 3 days</strong> per pad</span></div>
            <div><Recycle /><span><strong>Refillable</strong> less waste</span></div>
          </div>
        </section>

        <section className="marquee" aria-label="MOMONO highlights">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, group) => (
              <div className="marquee-group" key={group} aria-hidden={group === 1}>
                <span>DEET FREE</span><i>✦</i><span>COLLECT THEM ALL</span><i>✦</i><span>CLIP & GO</span><i>✦</i><span>PLANT POWERED</span><i>✦</i>
              </div>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow"><span /> The MOMONO essentials</div>
              <h2>Shop MOMONO</h2>
            </div>
            <p>Start with one surprise guardian, then keep the protection going with individually sealed refill pads.</p>
          </div>

          <div className="shop-note">
            <Sparkles size={16} />
            <span>The five guardian characters are found only inside the Starter Blind Box—not sold separately.</span>
          </div>

          <div className="product-grid two-product-grid">
            {products.map((product) => (
              <article
                className={`product-card ${product.id === "starter" ? "reveal-product" : ""}`}
                key={product.id}
                style={{ "--accent": product.color }}
                onClick={() => product.id === "starter" && setBlindBoxOpen(true)}
              >
                <div className="product-image-wrap">
                  <span className="product-badge">{product.badge}</span>
                  <button
                    className={`heart-button ${liked.includes(product.id) ? "liked" : ""}`}
                    onClick={(event) => { event.stopPropagation(); setLiked((ids) => ids.includes(product.id) ? ids.filter((id) => id !== product.id) : [...ids, product.id]); }}
                    aria-label={`Save ${product.name}`}
                  >
                    <Heart fill={liked.includes(product.id) ? "currentColor" : "none"} />
                  </button>
                  <img src={product.image} alt={product.name} />
                  <button className="quick-add" onClick={(event) => { event.stopPropagation(); addToCart(product); }}>Quick add <Plus size={18} /></button>
                </div>
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.subtitle}</p>
                    {product.id === "starter" && <span className="reveal-hint">Click to reveal all 5 possible guardians <ArrowRight size={13} /></span>}
                  </div>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-visual">
            <img src={asset("starter-box.png")} alt="MOMONO starter blind box, clip and refill pad" />
            <span className="orbit orbit-one">3 DAYS</span>
            <span className="orbit orbit-two">DEET FREE</span>
          </div>
          <div className="how-content">
            <div className="eyebrow light"><span /> Simple by design</div>
            <h2>Protection in<br />three tiny steps.</h2>
            <div className="steps">
              <div className="step"><span>01</span><div><h3>Open your guardian</h3><p>Twist open the round shield on the front.</p></div></div>
              <div className="step"><span>02</span><div><h3>Pop in a fresh pad</h3><p>One individually sealed pad gives up to three days of gentle protection.</p></div></div>
              <div className="step"><span>03</span><div><h3>Clip, go, explore</h3><p>Attach it to a shirt, backpack, stroller, or pet accessory.</p></div></div>
            </div>
            <button className="primary-button cream" onClick={() => addToCart(products[0])}>Get the starter box <ArrowRight size={19} /></button>
          </div>
        </section>

        <section className="benefits-section" id="our-story">
          <div className="section-heading centered">
            <div className="eyebrow"><span /> Why MOMONO?</div>
            <h2>Made for little ones.<br />Thoughtful in every detail.</h2>
          </div>
          <div className="benefit-grid">
            {[
              { image: asset("benefit-bio.png"), title: "Bio-based active protection", copy: "Catnip oil and lemon eucalyptus oil meet in a gentle, plant-forward formula." },
              { image: asset("benefit-guardians.png"), title: "Five stories to collect", copy: "School, Rain, Birthday, Dream—and a rare Secret Guardian waiting to be found." },
              { image: asset("benefit-refill.png"), title: "Refillable by nature", copy: "Keep the character you love. Replace only the small compressed pad inside." },
            ].map((benefit, index) => (
              <article className="benefit-card" key={benefit.title}>
                <div className="benefit-number">0{index + 1}</div>
                <img src={benefit.image} alt="" />
                <div className="benefit-copy"><h3>{benefit.title}</h3><p>{benefit.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="collector-section" id="guardians">
          <div className="collector-copy">
            <div className="eyebrow light"><span /> Your guardian is waiting</div>
            <h2>One world.<br />Five tiny heroes.</h2>
            <p>Every MOMONO guardian has a different personality, colour, and story—but they all share one mission: helping make outdoor moments feel carefree.</p>
            <button className="primary-button orange" onClick={() => setBlindBoxOpen(true)}>See who’s inside <ArrowRight size={19} /></button>
          </div>
          <div className="guardian-stack" aria-label="The five MOMONO guardians">
            {guardians.map((guardian, index) => (
              <div className="guardian-mini" key={guardian.id} style={{ "--left": `${index * 15}%`, "--rotate": `${(index - 2) * 3}deg`, "--rise": index % 2 ? "70px" : "15px" }}>
                <img src={guardian.image} alt={guardian.name} />
              </div>
            ))}
          </div>
        </section>

        <section className="newsletter-section">
          <div>
            <span className="newsletter-icon"><Sparkles /></span>
            <h2>Join the Guardian Club</h2>
            <p>Fresh drops, tiny stories, and outdoor tips—delivered gently.</p>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); setToast("Welcome to the Guardian Club!"); event.currentTarget.reset(); }}>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" required placeholder="Your email address" />
            <button type="submit">Join now <ArrowRight size={18} /></button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><img src={asset("momono-logo.png")} alt="MOMONO" /><p>Your tiny guardian, everywhere.</p></div>
          <div><h3>Explore</h3><a href="#shop">Shop all</a><a href="#guardians">Guardians</a><a href="#how-it-works">How it works</a></div>
          <div><h3>Help</h3><a href="mailto:momonoguard@gmail.com">Contact us</a><a href="#faq">Shipping & returns</a><a href="#faq">FAQs</a></div>
          <div><h3>Follow the adventure</h3><a href="https://instagram.com/momono.th">Instagram · @momono.th</a><a href="https://www.tiktok.com/@momono.th">TikTok · @momono.th</a><a href="tel:+66627790805">+66 62 779 0805</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 MOMONO by The Nexus</span><span>Made with little ones and the planet in mind.</span></div>
      </footer>

      {mobileOpen && (
        <div className="full-overlay mobile-overlay">
          <button className="overlay-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button>
          <img src={asset("momono-logo.png")} alt="MOMONO" />
          <nav>{[["Shop", "#shop"], ["Guardians", "#guardians"], ["How it works", "#how-it-works"], ["Our story", "#our-story"]].map(([label, link]) => <a key={link} href={link} onClick={() => setMobileOpen(false)}>{label}<ArrowRight /></a>)}</nav>
        </div>
      )}

      {searchOpen && (
        <div className="full-overlay search-overlay">
          <button className="overlay-close" onClick={() => { setSearchOpen(false); setQuery(""); }} aria-label="Close search"><X /></button>
          <div className="search-box"><Search /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guardians and refills" /></div>
          <p className="search-caption">{query ? `${searchResults.length} results` : "Popular right now"}</p>
          <div className="search-results">
            {searchResults.map((product) => (
              <button key={product.id} onClick={() => { product.id === "starter" ? setBlindBoxOpen(true) : addToCart(product); setSearchOpen(false); setQuery(""); }}>
                <img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{formatPrice(product.price)}</small></span><Plus />
              </button>
            ))}
            {searchResults.length === 0 && <div className="empty-state"><Search /><h3>No products found</h3><p>Try “starter”, “blind box”, or “refill”.</p></div>}
          </div>
        </div>
      )}

      {blindBoxOpen && (
        <div className="reveal-layer" role="dialog" aria-modal="true" aria-label="Guardian Starter Blind Box characters">
          <button className="reveal-backdrop" onClick={() => setBlindBoxOpen(false)} aria-label="Close blind box details" />
          <section className="reveal-modal">
            <button className="reveal-close" onClick={() => setBlindBoxOpen(false)} aria-label="Close"><X /></button>
            <div className="reveal-product-panel">
              <div className="eyebrow"><span /> One surprise inside</div>
              <h2>Guardian Starter<br />Blind Box</h2>
              <p className="reveal-intro">Every box contains <strong>one mystery Guardian Clip</strong> plus <strong>two individually sealed refill pads</strong>.</p>
              <img src={asset("starter-box.png")} alt="MOMONO Guardian Starter Blind Box" />
              <div className="reveal-buy-row"><strong>{formatPrice(products[0].price)}</strong><button onClick={() => { addToCart(products[0]); setBlindBoxOpen(false); }}>Add blind box <ShoppingBag size={18} /></button></div>
            </div>
            <div className="reveal-characters-panel">
              <span className="reveal-kicker">WHO WILL YOU GET?</span>
              <h3>Meet all 5 guardians</h3>
              <p>The character inside is a surprise. Collect the core guardians and look out for the rare Secret Guardian.</p>
              <div className="reveal-grid">
                {guardians.map((guardian) => (
                  <article key={guardian.id} style={{ "--guardian-color": guardian.color }}>
                    {guardian.id === "secret" && <span>RARE</span>}
                    <img src={guardian.image} alt={guardian.name} />
                    <div><strong>{guardian.name}</strong><small>{guardian.note}</small></div>
                  </article>
                ))}
              </div>
              <div className="blind-box-rule"><Sparkles size={17} /><span>Guardians are blind-box surprises and cannot be selected or purchased separately.</span></div>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <button className="drawer-backdrop" onClick={() => setCartOpen(false)} aria-label="Close cart" />
          <aside className="cart-drawer">
            <div className="drawer-header"><div><span>YOUR BAG</span><h2>{cartCount} {cartCount === 1 ? "item" : "items"}</h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X /></button></div>
            <div className="shipping-progress"><div><Check size={14} /></div><p>{subtotal >= 799 ? "Your delivery is on us!" : `${formatPrice(799 - subtotal)} away from free delivery`}</p><span><i style={{ width: `${Math.min(100, (subtotal / 799) * 100)}%` }} /></span></div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart"><ShoppingBag /><h3>Your adventure bag is empty</h3><p>Choose a Starter Blind Box or Refill Pack.</p><button className="primary-button green" onClick={() => { setCartOpen(false); scrollToShop(); }}>Shop MOMONO</button></div>
              ) : cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image"><img src={item.image} alt="" /></div>
                  <div className="cart-item-detail"><strong>{item.name}</strong><small>{item.subtitle}</small><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus /></button></div></div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            {cart.length > 0 && <div className="drawer-footer"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Delivery calculated at checkout.</p><button onClick={() => setToast("Checkout is ready for integration.")}>Checkout <ArrowRight /></button></div>}
          </aside>
        </div>
      )}

      {toast && <div className="toast"><Check /> {toast}</div>}
    </div>
  );
}

export default App;
