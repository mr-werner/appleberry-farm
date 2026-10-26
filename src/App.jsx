import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Baby, Camera, Car, ChevronDown, Clock, Egg, Facebook, Gift, Heart, Instagram, Mail, MapPin, Menu,
  Navigation, Phone, PawPrint, ShoppingBasket, Store, Tractor, Truck, X,
} from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import { SEASON } from "./season.js";
import signPhoto from "./assets/farm-sign.jpg";
import branchWide from "./assets/apples-branch-wide.jpg";
import orchardTree from "./assets/orchard-tree.jpg";
import caramelApples from "./assets/caramel-apples.jpg";
import twoApples from "./assets/two-apples.jpg";
import scarecrowLane from "./assets/scarecrow-lane.jpg";
import pumpkinDisplay from "./assets/pumpkin-display.jpg";
import honeyPhoto from "./assets/raw-honey.jpg";
import cornPhoto from "./assets/sweet-corn.jpg";
import peppersPhoto from "./assets/peppers.jpg";
import squashPhoto from "./assets/squash.jpg";
import basketsPhoto from "./assets/hanging-baskets.jpg";
import youngApples from "./assets/young-apples.jpg";
import familyPhoto from "./assets/mason-family.jpg";

// ------------------------------------------------------------------ Content (facts from appleberryfarm.com; season info lives in src/season.js)
const COMPANY = "Appleberry Farm";
const ABBR = "abf";
const END_DATE = "2026-11-30T23:59:59-06:00";
const ORIGINAL = "https://www.appleberryfarm.com/";
const PHONE = "641-752-8443";
const PHONE_HREF = "tel:+16417528443";
const EMAIL = "Appleberryfarm2@yahoo.com";
const ADDRESS_1 = "2402 W Main St";
const ADDRESS_2 = "Marshalltown, IA 50158";
const MAPS_LINK = "https://www.google.com/maps/dir/?api=1&destination=2402+W+Main+St,+Marshalltown,+IA+50158";
const MAP_EMBED = "https://maps.google.com/maps?q=2402%20W%20Main%20St%2C%20Marshalltown%2C%20IA%2050158&z=14&output=embed";
const FACEBOOK = "https://www.facebook.com/appleberryfarmiowa/";
const INSTAGRAM = "https://www.instagram.com/appleberryfarms/";
const GOOGLE_REVIEWS = "https://www.google.com/search?q=Appleberry+Farm+Marshalltown+Iowa";

const NAV = [
  ["This week", "#notes"],
  ["Things to do", "#todo"],
  ["Apple Wagon", "#wagon"],
  ["Apples", "#apples"],
  ["Farm market", "#market"],
  ["Visit", "#visit"],
];

const THINGS_TO_DO = [
  { icon: ShoppingBasket, title: "Pick your own apples", text: "Apple picking daily during apple season, with picked apples in the cooler too." },
  { icon: Tractor, title: "Hayrides", text: "On weekends or by appointment during apple season." },
  { icon: PawPrint, title: "Visit the animals", text: "Take a stroll, say hello, and get a little animal therapy." },
  { icon: Store, title: "Gift shop", text: "Fall and holiday decorations, gifts, treats and gift certificates." },
  { icon: Baby, title: "Playground & sandbox", text: "Room for the kids to play while you shop." },
  { icon: Camera, title: "Photo ops", text: "Beautiful scenery and new photo spots for the family." },
  { icon: Truck, title: "The Apple Wagon", text: "Our food truck, open on weekends and other occasions." },
  { icon: Car, title: "Carside service", text: "Call ahead or on arrival and we'll bring your order to your car." },
];

const WAGON_MENU = ["Cider donuts", "Apple egg rolls", "Chicken strips", "Cheese curds", "Fried pickles", "Corn dogs", "Curly fries", "Pop and water"];
const STORE_TREATS = ["Caramel apples", "Apple crisp", "Pie", "Apple cider slushies", "Raspberry lemonade slushies"];

const VARIETIES = ["Blushing Golden", "Braeburn", "Candy Crisp", "Chieftain", "Cortland", "Enterprise", "Fireside", "Freedom", "Fuji", "Gala", "Gold Rush", "Golden Delicious", "Granny Smith", "Honey Gold", "Honeycrisp", "Jonafree", "Jonagold", "Jonathan", "Macoun", "McIntosh", "Red Delicious", "Red Jonagold", "Regent", "September Wonder", "Sweet Sixteen", "Wealthy"];

const MARKET = [
  { photo: honeyPhoto, alt: "Jars of Pure Iowa Raw Honey from Ebert Honey Co.", title: "Pantry", items: ["Ebert, Rinehart & Dolezal local honey", "Pure maple syrup", "Jams, jellies, mustards, pickles & salsas", "Door County coffee"] },
  { photo: peppersPhoto, alt: "Green peppers and cucumbers in rustic bins", title: "Fresh produce", items: ["VanManen sweet corn", "Tomatoes, cucumbers & onions", "Sweet and hot peppers", "Summer & winter squash, pie pumpkins, herbs"] },
  { photo: basketsPhoto, alt: "Hanging baskets of flowers at the farm", title: "Garden", items: ["Hanging baskets & potted plants", "Flowers, bedding plants & trees", "Fall mums", "Pumpkins, squash & gourds"] },
  { photo: youngApples, alt: "Young apples ripening on the tree", title: "Farm fresh", items: ["Chicken & duck eggs", "Chicks, ducklings & occasional bunnies in spring", "Fresh apple cider, frozen through the off season", "Homemade pies, crisps & baked goods to order"] },
];

// ------------------------------------------------------------------ Season helpers
function chicagoNow() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "long", hour: "numeric", minute: "numeric", hour12: false, year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(new Date())
    .reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {});
  return { weekday: parts.weekday, hour: Number(parts.hour) % 24 + Number(parts.minute) / 60, iso: `${parts.year}-${parts.month}-${parts.day}` };
}

function fmtHour(h) {
  const hr = Math.floor(h);
  const suffix = hr >= 12 ? "pm" : "am";
  return `${hr % 12 || 12}${suffix}`;
}

function fmtDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function useSeasonStatus() {
  const [now, setNow] = useState(chicagoNow);
  useEffect(() => {
    const t = setInterval(() => setNow(chicagoNow()), 60000);
    return () => clearInterval(t);
  }, []);
  return useMemo(() => {
    const inSeason = now.iso <= SEASON.openThrough;
    const today = SEASON.hours.find((h) => h.day === now.weekday);
    const openNow = inSeason && today && today.open != null && now.hour >= today.open && now.hour < today.close;
    let label;
    if (!inSeason) label = SEASON.offSeason.title;
    else if (openNow) label = `Open now · until ${fmtHour(today.close)}`;
    else if (today && today.open != null && now.hour < today.open) label = `Opens today at ${fmtHour(today.open)}`;
    else label = "Closed for the day";
    return { inSeason, openNow, label, weekday: now.weekday };
  }, [now]);
}

// ------------------------------------------------------------------ Pieces
function AppleMark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 18c-6-5-20-4-22 10-2 13 7 28 15 28 3 0 4-1.5 7-1.5S36 56 39 56c8 0 17-15 15-28-2-14-16-15-22-10z" fill="var(--apple)" />
      <path d="M32 19c0-6 2-10 5-13" stroke="var(--bark)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M35 13c4-7 13-8 17-6-3 6-10 9-17 6z" fill="var(--leaf)" />
      <ellipse cx="22" cy="28" rx="4" ry="6" fill="#fff" opacity=".35" />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="wordmark">
      <AppleMark />
      <span className="wordmark-text"><small>The</small><strong>Appleberry</strong><small>Farm</small></span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="gingham-strip">
        <div className="wrap strip-inner">
          <span>Always free admission</span>
          <span className="strip-mid">{SEASON.openThroughLabel}</span>
          <a href={PHONE_HREF}><Phone size={14} /> {PHONE}</a>
        </div>
      </div>
      <div className="header-main">
        <div className="wrap header-inner">
          <a href="#top" aria-label="Appleberry Farm home"><Wordmark /></a>
          <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          </nav>
          <a className="header-call" href={PHONE_HREF}><Phone size={17} /><span>Call the farm</span></a>
          <button className="menu-btn" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      <div className="awning" aria-hidden="true" />
    </header>
  );
}

function SeasonBoard() {
  const status = useSeasonStatus();
  return (
    <aside className="board" aria-label="Today at the farm">
      <div className="board-head">
        <span className="board-kicker">Today at the farm</span>
        <span className={`status ${status.openNow ? "is-open" : ""}`}><i />{status.label}</span>
      </div>
      {status.inSeason ? (
        <>
          <h2 className="board-title">{SEASON.hoursTitle}</h2>
          <ul className="board-hours">
            {SEASON.hours.map((h) => (
              <li key={h.day} className={h.day === status.weekday ? "today" : ""}>
                <span>{h.day}</span>
                <span className="dots" aria-hidden="true" />
                <span>{h.open == null ? "Closed" : `${fmtHour(h.open)}–${fmtHour(h.close)}`}</span>
              </li>
            ))}
          </ul>
          <p className="board-through">{SEASON.openThroughLabel}!</p>
          {SEASON.inTheCooler.length > 0 && (
            <p className="board-cooler"><strong>In the cooler:</strong> {SEASON.inTheCooler.join(", ")}</p>
          )}
        </>
      ) : (
        <>
          <h2 className="board-title">{SEASON.offSeason.title}</h2>
          <p className="board-through">{SEASON.offSeason.text}</p>
        </>
      )}
      <a href={PHONE_HREF} className="board-call"><Phone size={17} /> {PHONE}</a>
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hand">Marshalltown, Iowa · Owned by the Mason family</p>
          <h1>Pick apples, visit the animals, <em>grab a cider donut.</em></h1>
          <p className="lede">Appleberry Farm is a U-pick apple orchard with hayrides, farm animals, pumpkins, a gift shop and the Apple Wagon food truck, all in a relaxing, country atmosphere. Admission is always free.</p>
          <div className="hero-ctas">
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-red"><Navigation size={18} /> Get directions</a>
            <a href="#notes" className="btn btn-outline">What's ripe this week <ArrowRight size={18} /></a>
          </div>
          <p className="hero-address"><MapPin size={17} /> {ADDRESS_1}, {ADDRESS_2}</p>
        </div>
        <SeasonBoard />
      </div>
      <div className="polaroids" aria-label="Photos from the farm">
        <figure className="pol p1"><img src={signPhoto} alt="The Appleberry Farm sign at the orchard" width="354" height="240" /><figcaption>Find the sign!</figcaption></figure>
        <figure className="pol p2"><img src={orchardTree} alt="Apple tree heavy with red apples" width="400" height="300" /><figcaption>U-pick rows</figcaption></figure>
        <figure className="pol p3"><img src={caramelApples} alt="Caramel apples with and without nuts" width="400" height="269" /><figcaption>Caramel apples daily</figcaption></figure>
        <figure className="pol p4"><img src={scarecrowLane} alt="Scarecrow on a barrel with a sign that reads I've got a hunch you'll be back" width="300" height="224" /><figcaption>You'll be back</figcaption></figure>
        <figure className="pol p5"><img src={twoApples} alt="Two red apples on the branch" width="400" height="266" /><figcaption>Fall 2026</figcaption></figure>
      </div>
    </section>
  );
}

function Notes() {
  const [latest, ...rest] = SEASON.notes;
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="notes" id="notes">
      <div className="wrap">
        <div className="section-head">
          <p className="hand">Notes from the orchard</p>
          <h2>This week at <em>Appleberry</em></h2>
        </div>
        <div className="notes-grid">
          <article className="note note-main">
            <span className="pin" aria-hidden="true" />
            <time dateTime={latest.date}>{fmtDate(latest.date)}</time>
            <h3>{latest.title}</h3>
            <p>{latest.text}</p>
          </article>
          <div className="note-stack">
            {(showAll ? rest : rest.slice(0, 2)).map((n) => (
              <article className="note" key={n.date}>
                <time dateTime={n.date}>{fmtDate(n.date)}</time>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </article>
            ))}
            {rest.length > 2 && (
              <button type="button" className="more" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
                {showAll ? "Show fewer notes" : "Earlier notes"} <ChevronDown size={18} className={showAll ? "rot" : ""} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ThingsToDo() {
  return (
    <section className="todo" id="todo">
      <div className="wrap">
        <div className="section-head center">
          <p className="hand">Come for the apples, stay for the afternoon</p>
          <h2>Things to do <em>on the farm</em></h2>
        </div>
        <div className="todo-grid">
          {THINGS_TO_DO.map(({ icon: Icon, title, text }) => (
            <article className="todo-card" key={title}>
              <span className="todo-icon"><Icon size={26} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="banner-photo">
          <img src={branchWide} alt="Red apples on a branch against a blue sky" loading="lazy" width="1019" height="682" />
          <p>All in a relaxing, <em>country atmosphere.</em></p>
        </div>
      </div>
    </section>
  );
}

function AppleWagon() {
  return (
    <section className="wagon" id="wagon">
      <div className="wrap wagon-grid">
        <div className="wagon-copy">
          <p className="hand">Open weekends &amp; other occasions</p>
          <h2>The Apple <em>Wagon</em></h2>
          <p>Our food truck is open on weekends and on other occasions. Food and concessions are limited during the week, but there are always treats inside the store.</p>
          <div className="store-treats">
            <h3>Inside the store</h3>
            <ul>{STORE_TREATS.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <div className="menu-board">
          <div className="menu-roof" aria-hidden="true" />
          <h3>Menu</h3>
          <ul>{WAGON_MENU.map((m) => <li key={m}><span>{m}</span></li>)}</ul>
          <p className="hand small">Cider donuts &amp; caramel apples daily in season</p>
        </div>
      </div>
    </section>
  );
}

function Apples() {
  return (
    <section className="apples" id="apples">
      <div className="wrap apples-grid">
        <div>
          <p className="hand">26 varieties in the orchard</p>
          <h2>From Blushing Golden <em>to Wealthy</em></h2>
          <p className="lede-dark">These are the varieties grown at Appleberry Farm. What's ready to pick changes week to week, so check the latest farm note or give us a call.</p>
          <figure className="crate-photo"><img src={pumpkinDisplay} alt="Pumpkins and corn stalks decorating the farm in fall" loading="lazy" width="400" height="301" /></figure>
        </div>
        <div>
        <ul className="crate">
          {VARIETIES.map((v) => (
            <li key={v} className={SEASON.inTheCooler.includes(v) ? "now" : ""}>
              <AppleMark size={22} />{v}
            </li>
          ))}
        </ul>
        {SEASON.inTheCooler.length > 0 && <p className="crate-key"><span className="key-dot" /> Highlighted: in the cooler now ({SEASON.name})</p>}
        </div>
      </div>
    </section>
  );
}

function Market() {
  return (
    <section className="market" id="market">
      <div className="wrap">
        <div className="section-head center">
          <p className="hand">The gift shop is open year round</p>
          <h2>Farm market <em>&amp; gift shop</em></h2>
        </div>
        <div className="market-grid">
          {MARKET.map((m) => (
            <article className="market-card" key={m.title}>
              <img src={m.photo} alt={m.alt} loading="lazy" />
              <div>
                <h3>{m.title}</h3>
                <ul>{m.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="market-strip">
          <img src={cornPhoto} alt="An ear of sweet corn" loading="lazy" width="400" height="535" />
          <img src={squashPhoto} alt="Zucchini and yellow squash in a bin" loading="lazy" width="285" height="212" />
          <div className="gift-card"><Gift size={30} /><strong>Gift certificates</strong><span>Available in the shop. Call ahead to order pies and baked goods.</span></div>
        </div>
      </div>
    </section>
  );
}

function Family() {
  return (
    <section className="family" id="family">
      <div className="wrap family-grid">
        <figure className="family-photo">
          <img src={familyPhoto} alt="The Mason family with their dog in front of a red barn" loading="lazy" width="1100" height="733" />
        </figure>
        <div>
          <p className="hand">Meet the owners</p>
          <h2>The <em>Mason</em> family</h2>
          <p>Appleberry Farm is owned by the Mason family. As always, you're welcome to come out to just relax, let the kids play, or have some animal therapy.</p>
          <div className="family-links">
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer"><Facebook size={18} /> appleberryfarmiowa</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Instagram size={18} /> appleberryfarms</a>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer"><Heart size={18} /> See our reviews on Google</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", item: "", pickup: "", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Please call the farm instead.");
      setStatus("sent");
      setMessage(data.demo ? `Thanks! This is a concept preview, so nothing was sent. Please call ${PHONE}.` : "Thanks! We'll call to confirm your order.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }
  return (
    <section className="visit" id="visit">
      <div className="wrap visit-grid">
        <div className="visit-info">
          <p className="hand">Come see us</p>
          <h2>Plan your <em>visit</em></h2>
          <ul className="visit-list">
            <li><MapPin size={20} /><span><strong>{ADDRESS_1}</strong><br />{ADDRESS_2}</span></li>
            <li><Phone size={20} /><a href={PHONE_HREF}>{PHONE}</a></li>
            <li><Mail size={20} /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><Clock size={20} /><span>{SEASON.openThroughLabel}. Hours are on the board <a href="#top">up top</a>.</span></li>
            <li><Egg size={20} /><span>Pies, crisps and baked goods can be ordered ahead year round.</span></li>
          </ul>
          <div className="map">
            <iframe title="Map to Appleberry Farm" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-red"><Navigation size={18} /> Directions</a>
        </div>
        <form className="order" onSubmit={submit}>
          <span className="tag-hole" aria-hidden="true" />
          <h3>Order a pie or ask a question</h3>
          <p>Leave your details and the farm will call you back.</p>
          <div className="two">
            <label>Name *<input required value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></label>
            <label>Phone *<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
          </div>
          <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
          <div className="two">
            <label>What would you like?
              <select value={form.item} onChange={(e) => update("item", e.target.value)}>
                <option value="">Choose…</option>
                <option>Homemade pie</option>
                <option>Apple crisp</option>
                <option>Other baked goods</option>
                <option>Apples or cider</option>
                <option>Hayride by appointment</option>
                <option>Just a question</option>
              </select>
            </label>
            <label>Pickup date<input type="date" value={form.pickup} onChange={(e) => update("pickup", e.target.value)} /></label>
          </div>
          <label>Details<textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} /></label>
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(e) => update("website", e.target.value)} />
          <button className="btn btn-red" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send to the farm"} <ArrowRight size={18} /></button>
          {message && <p className={`form-msg ${status}`} role="status">{message}</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="gingham-band" aria-hidden="true" />
      <div className="wrap footer-grid">
        <div>
          <Wordmark />
          <p>U-pick apples, cider donuts, hayrides, animals and a gift shop in Marshalltown, Iowa. Always free admission.</p>
        </div>
        <div>
          <h4>Visit</h4>
          <span>{ADDRESS_1}</span>
          <span>{ADDRESS_2}</span>
          <a href={PHONE_HREF}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div>
          <h4>Follow along</h4>
          <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">Google reviews</a>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {COMPANY}. Concept redesign by Blueprint WebStudio · Independent concept, not for official use. Current site: <a href={ORIGINAL}>appleberryfarm.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Notes />
        <ThingsToDo />
        <AppleWagon />
        <Apples />
        <Market />
        <Family />
        <Visit />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
