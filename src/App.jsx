import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleUserRound,
  Gamepad2,
  Gift,
  Home,
  Leaf,
  Mail,
  Minus,
  Pause,
  Phone,
  Play,
  Plus,
  ScanLine,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

const root = `${import.meta.env.BASE_URL}assets/`;
const img = (name) =>
  `${root}${name === "school-2026.png" ? "school-guardian.png" : name}`;
const money = (value) => `฿${value.toLocaleString("en-US")}`;
const tabs = [
  ["home", "Home", Home],
  ["shop", "Shop", ShoppingBag],
  ["game", "Game", Gamepad2],
  ["points", "Points", Trophy],
  ["profile", "Profile", UserRound],
];
const products = [
  {
    id: "starter",
    name: "Guardian Starter Blind Box",
    short: "1 mystery Guardian Clip + 2 refill pad",
    price: 329,
    image: img("box-2026.png"),
  },
  {
    id: "refill",
    name: "Guardian Refill Pack",
    short: "5 individually sealed refill pads",
    price: 189,
    image: img("refill-2026.png"),
  },
];

function Logo() {
  return (
    <img
      className="app-logo"
      src={img("brand-2026.png")}
      alt="MOMONO - Your Tiny Guardian, Everywhere"
    />
  );
}
function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="App navigation">
      {tabs.map(([id, label, Icon]) => (
        <button
          key={id}
          className={active === id ? "active" : ""}
          onClick={() => onChange(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
function Welcome({ onStart }) {
  return (
    <main className="welcome-screen">
      <span className="float-leaf leaf-a">◆</span>
      <span className="float-leaf leaf-b">◆</span>
      <Logo />
      <p className="protection-pill">BIO-BASED PROTECTION AGAINST MOSQUITOES</p>
      <img
        className="welcome-guardian"
        src={img("brand-2026.png")}
        alt="MOMONO guardian waving among leaves"
      />
      <h1>
        A safer, greener
        <br />
        tomorrow for the ones
        <br />
        you love.
      </h1>
      <button className="orange-cta" onClick={onStart}>
        Get Started <ArrowRight />
      </button>
      <div className="pager">
        <i />
        <i />
        <i />
      </div>
    </main>
  );
}
function TopBar({ points, cartCount, onCart }) {
  return (
    <header className="app-topbar">
      <Logo />
      <div className="top-actions">
        <span className="points-chip">
          <Leaf />
          <b>{points}</b>
          <small>points</small>
        </span>
        <button
          className="round-button"
          onClick={onCart}
          aria-label={`Open bag with ${cartCount} items`}
        >
          <ShoppingBag />
          {cartCount > 0 && <i>{cartCount}</i>}
        </button>
      </div>
    </header>
  );
}

function HomePage({
  setTab,
  hintCost,
  redeemedHints,
  hintLimitReached,
  onUseHint,
}) {
  return (
    <div className="page home-page">
      <section className="home-hero">
        <div>
          <h1>
            Welcome to MOMONO!
          </h1>
          <p>
            Little steps.
            <br />
            Big protection.
          </p>
          <div className="active-card">
            <ShieldCheck />
            <span>
              <b>Guardian Active</b>
              <small>5 days left</small>
            </span>
          </div>
        </div>
        <div
          className="home-guardian-scene"
          role="img"
          aria-label="Children and MOMONO Guardians protected while playing outdoors"
          style={{ backgroundImage: `url(${img("home-playground.png")})` }}
        />
      </section>
      <section className="quick-grid">
        <button
          onClick={() => alert("Demo QR scanner: connect a Starter Blind Box.")}
        >
          <ScanLine />
          <b>Scan QR</b>
          <span>Link a box</span>
          <ArrowRight />
        </button>
        <button onClick={() => setTab("game")}>
          <Gamepad2 />
          <b>Play Game</b>
          <span>Learn & earn</span>
          <ArrowRight />
        </button>
        <button onClick={() => setTab("shop")}>
          <ShoppingBag />
          <b>Buy Refills</b>
          <span>Keep protecting</span>
          <ArrowRight />
        </button>
      </section>
      <section className="home-cards">
        <article>
          <div className="card-title">
            <h2>My Guardians</h2>
          </div>
          <div className="guardian-collection" aria-label="Five collected Guardians including the Secret Guardian">
            {["school-new", "rain-new", "dream-new", "birthday-new", "secret-new"].map((guardian) => (
              <span key={guardian}>
                <img
                  className="full-guardian"
                  src={img(`${guardian}.png`)}
                  alt={`${guardian.replace("-new", "")} Guardian`}
                />
                <Check />
              </span>
            ))}
          </div>
          <p>
            Collect all 5 to unlock the <b>Secret Guardian!</b>
          </p>
        </article>
        <article className="hint-card">
          <div className="card-title">
            <h2>Daily Hint</h2>
            <Leaf />
          </div>
          <Sparkles />
          {redeemedHints.length === 0 ? (
            <p>Reveal one Guardian that will not be inside your next blind box.</p>
          ) : (
            <div className="redeemed-hints" aria-live="polite">
              <b>Not in your next blind box:</b>
              <ol>
                {redeemedHints.map((guardian, index) => (
                  <li key={`${guardian}-${index}`}>
                    <Check /> {guardian}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <span className="hint-cost">
            {hintLimitReached ? <Check /> : <Leaf />}
            {hintLimitReached
              ? "2 of 2 hints redeemed"
              : `${hintCost.toLocaleString()} points`}
          </span>
          <button onClick={onUseHint} disabled={hintLimitReached}>
            {hintLimitReached ? "All Hints Revealed" : "Reveal Hint"}
          </button>
        </article>
      </section>
    </div>
  );
}

function ShopPage({ addToCart }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="page shop-page">
      <section className="product-pair">
        {products.map((product) => (
          <article key={product.id}>
            <h2>
              <Leaf />
              {product.name}
            </h2>
            <p>{product.short}</p>
            <img src={product.image} alt={product.name} />
            <footer>
              <strong>{money(product.price)}</strong>
              <button onClick={() => addToCart(product, 1)}>
                Add to bag <ShoppingBag />
              </button>
            </footer>
          </article>
        ))}
      </section>
      <section className="trust-row">
        <span>
          <ShieldCheck />
          Controlled diffusion
        </span>
        <span>
          <Leaf />
          5-7 days per pad
        </span>
        <span>
          <Gift />
          Refill, reuse, return
        </span>
      </section>
    </div>
  );
}

function GamePage({ points, onEarn }) {
  const [playing, setPlaying] = useState(true);
  const [caught, setCaught] = useState(0);
  const bugs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${12 + ((i * 17) % 73)}%`,
        top: `${18 + ((i * 23) % 55)}%`,
      })),
    [],
  );
  return (
    <div className="page game-page">
      <div className="game-heading">
        <div>
          <h1>
            Catch the <em>Mosquitoes!</em>
          </h1>
          <p>Help MOMONO keep the garden safe.</p>
        </div>
      </div>
      <section className={`game-field ${playing ? "playing" : "paused"}`}>
        <img
          className="game-art"
          src={img("game-screen-2026.png")}
          alt="MOMONO Guardian in a bright garden"
        />
        <div className="score-board">
          <strong>{points.toLocaleString()}</strong>
          <span>points</span>
        </div>
        <button
          className="pause"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause game" : "Resume game"}
        >
          {playing ? <Pause /> : <Play />}
        </button>
        {bugs.map((bug) => (
          <button
            className="mosquito"
            key={`${bug.id}-${caught}`}
            style={{ left: bug.left, top: bug.top }}
            disabled={!playing}
            onClick={() => {
              setCaught((c) => c + 1);
              onEarn(50);
            }}
          >
            🦟
          </button>
        ))}
        <div className="game-message">Catch More, Breathe Happier!</div>
      </section>
      <p className="game-tip">
        <Sparkles />
        Tap a mosquito to earn 50 demo Guardian Points. Caught: {caught}
      </p>
    </div>
  );
}

function PointsPage({ points, redeem }) {
  return (
    <div className="page points-page">
      <div className="rewards-heading">
        <h1>My Rewards</h1>
        <p>Collect points and redeem rewards.</p>
      </div>
      <section className="balance">
        <Leaf />
        <div>
          <span>Your Points Balance</span>
          <strong>{points.toLocaleString()}</strong> points
        </div>
      </section>
      <section className="journey">
        <h2>Your Guardian Journey</h2>
        <p>Collect more points and unlock greater rewards!</p>
        <div className="levels">
          {[
            [500, "Sprout"],
            [1000, "Leaf"],
            [2000, "Branch"],
            [3000, "Forest"],
          ].map(([value, label]) => (
            <div key={value} className={points >= value ? "unlocked" : ""}>
              <i>{points >= value ? <Check /> : "🔒"}</i>
              <b>{value.toLocaleString()}</b>
              <span>
                {label}
                <br />
                Guardian
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="reward-card">
        <img src={img("refill-2026.png")} alt="Guardian Refill Pack" />
        <div>
          <span>REWARD</span>
          <h2>฿50 OFF</h2>
          <h3>Refill Pack</h3>
          <p>Use 500 points to unlock this demo reward.</p>
          <button onClick={redeem} disabled={points < 500}>
            Redeem <Leaf />
          </button>
        </div>
      </section>
    </div>
  );
}

function ProfilePage({ points, orders, setTab }) {
  return (
    <div className="page profile-page">
      <div className="profile-title">
        <h1>
          <Leaf />
          My Guardian
          <Leaf />
        </h1>
        <button>
          <Settings />
        </button>
      </div>
      <section className="profile-card">
        <img src={img("profile-guardian.png")} alt="School Guardian" />
        <div>
          <h2>MOMONO Friend</h2>
          <p>Tiny steps, big protection.</p>
          <span>
            <Leaf />
            <b>Member since</b>
            <small>September 2026</small>
          </span>
          <span>
            <ShieldCheck />
            <b>Guardian level</b>
            <small>Level {points >= 1000 ? 2 : 1}</small>
          </span>
        </div>
      </section>
      <section className="profile-links">
        <button>
          <Gift />
          <span>
            <b>My Orders</b>
            <small>
              {orders} demo {orders === 1 ? "order" : "orders"}
            </small>
          </span>
          <ChevronRight />
        </button>
        <button onClick={() => setTab("points")}>
          <Trophy />
          <span>
            <b>My Points</b>
            <small>{points.toLocaleString()} points available</small>
          </span>
          <ChevronRight />
        </button>
        <button>
          <CircleUserRound />
          <span>
            <b>Help & Support</b>
            <small>Find answers to your questions</small>
          </span>
          <ChevronRight />
        </button>
        <button>
          <Settings />
          <span>
            <b>Settings</b>
            <small>Manage demo preferences</small>
          </span>
          <ChevronRight />
        </button>
      </section>
      <section className="contact-card" aria-labelledby="momono-contact-title">
        <div className="contact-card-heading">
          <span><Leaf /></span>
          <div>
            <small>Stay connected</small>
            <h2 id="momono-contact-title">MOMONO Contact</h2>
          </div>
        </div>
        <div className="contact-grid">
          <a href="https://www.facebook.com/MomonoThailand" target="_blank" rel="noreferrer">
            <i className="contact-symbol" aria-hidden="true">f</i>
            <span><small>Facebook</small><b>Momono Thailand</b></span>
          </a>
          <a href="tel:+66627790805">
            <i><Phone /></i>
            <span><small>Phone</small><b>+66 62 779 0805</b></span>
          </a>
          <a href="mailto:momonoguard@gmail.com">
            <i><Mail /></i>
            <span><small>Email</small><b>momonoguard@gmail.com</b></span>
          </a>
          <a href="https://www.tiktok.com/@momono.th" target="_blank" rel="noreferrer">
            <i className="contact-symbol contact-note" aria-hidden="true">♪</i>
            <span><small>TikTok</small><b>@momono.th</b></span>
          </a>
        </div>
      </section>
    </div>
  );
}

function Bag({ cart, onClose, update, onOrder }) {
  const [checkout, setCheckout] = useState(false);
  const [done, setDone] = useState(false);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div className="modal-layer">
      <button
        className="modal-backdrop"
        onClick={onClose}
        aria-label="Close bag"
      />
      <aside
        className="bag-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        {done ? (
          <div className="bag-success">
            <i>
              <Check />
            </i>
            <h2>Demo order complete!</h2>
            <p>
              No payment was charged, no order was shipped, and no personal
              information was stored.
            </p>
            <button className="green-cta" onClick={onClose}>
              Continue exploring
            </button>
          </div>
        ) : (
          <>
            <h2>{checkout ? "Demo checkout" : "Your bag"}</h2>
            {!checkout ? (
              <>
                {cart.length === 0 ? (
                  <div className="empty">
                    <ShoppingBag />
                    <p>Your bag is ready for a tiny adventure.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div className="bag-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <span>
                        <b>{item.name}</b>
                        <small>{item.short}</small>
                        <div className="quantity">
                          <button onClick={() => update(item.id, -1)}>
                            <Minus />
                          </button>
                          <b>{item.quantity}</b>
                          <button onClick={() => update(item.id, 1)}>
                            <Plus />
                          </button>
                        </div>
                      </span>
                      <strong>{money(item.price * item.quantity)}</strong>
                    </div>
                  ))
                )}
                {cart.length > 0 && (
                  <footer>
                    <span>
                      Subtotal <b>{money(subtotal)}</b>
                    </span>
                    <small>Demo checkout. No money will be charged.</small>
                    <button
                      className="orange-cta"
                      onClick={() => setCheckout(true)}
                    >
                      Checkout <ArrowRight />
                    </button>
                  </footer>
                )}
              </>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onOrder();
                  setDone(true);
                }}
              >
                <p className="demo-note">
                  This is a simulated transaction. Nothing is sent to a server.
                </p>
                <label>
                  Name
                  <input required placeholder="Alex Green" />
                </label>
                <label>
                  Email
                  <input required type="email" placeholder="alex@example.com" />
                </label>
                <label>
                  Delivery address
                  <textarea
                    required
                    placeholder="123 Garden Lane, Bangkok 10110"
                  />
                </label>
                <div className="order-total">
                  <span>Demo total</span>
                  <b>{money(subtotal + (subtotal >= 799 ? 0 : 40))}</b>
                </div>
                <button className="green-cta">
                  Place demo order <ArrowRight />
                </button>
              </form>
            )}
          </>
        )}
      </aside>
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("home");
  const [points, setPoints] = useState(320);
  const [cart, setCart] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [orders, setOrders] = useState(0);
  const [hintUses, setHintUses] = useState(0);
  const [redeemedHints, setRedeemedHints] = useState([]);
  const hintCost = 100 * 2 ** hintUses;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(id);
  }, [toast]);
  const navigate = (id) => {
    setTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const addToCart = (product, quantity) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...items, { ...product, quantity }];
    });
    setToast(`${product.name} added to your bag`);
  };
  const update = (id, change) =>
    setCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  const earn = (value) => {
    setPoints((p) => p + value);
    setToast(`+${value} Guardian Points`);
  };
  const useHint = () => {
    if (hintUses >= 2) {
      setToast("You have redeemed both hints for this blind box");
      return;
    }
    if (points < hintCost) {
      setToast(`You need ${hintCost - points} more points for this hint`);
      return;
    }
    const guardians = [
      "School Guardian",
      "Rain Guardian",
      "Dream Guardian",
      "Birthday Guardian",
      "Secret Guardian",
    ];
    setPoints((value) => value - hintCost);
    setRedeemedHints((hints) => [
      ...hints,
      guardians[hintUses % guardians.length],
    ]);
    setHintUses((value) => value + 1);
    setToast(`Hint revealed for ${hintCost} points`);
  };
  const redeem = () => {
    if (points < 500) return;
    setPoints((p) => p - 500);
    setToast("฿50 refill reward unlocked!");
  };
  if (!started) return <Welcome onStart={() => setStarted(true)} />;
  return (
    <div className="app">
      <TopBar
        points={points}
        cartCount={cartCount}
        onCart={() => setBagOpen(true)}
      />
      <main className="app-content">
        {tab === "home" && (
          <HomePage
            setTab={navigate}
            hintCost={hintCost}
            redeemedHints={redeemedHints}
            hintLimitReached={hintUses >= 2}
            onUseHint={useHint}
          />
        )}{" "}
        {tab === "shop" && <ShopPage addToCart={addToCart} />}{" "}
        {tab === "game" && <GamePage points={points} onEarn={earn} />}{" "}
        {tab === "points" && <PointsPage points={points} redeem={redeem} />}{" "}
        {tab === "profile" && (
          <ProfilePage points={points} orders={orders} setTab={navigate} />
        )}
      </main>
      <BottomNav active={tab} onChange={navigate} />
      {bagOpen && (
        <Bag
          cart={cart}
          update={update}
          onClose={() => setBagOpen(false)}
          onOrder={() => {
            setOrders((n) => n + 1);
            setCart([]);
          }}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check />
          {toast}
        </div>
      )}
    </div>
  );
}
