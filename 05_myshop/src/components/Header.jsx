import { Link } from "react-router-dom";

// Note: this preview swaps <Link> for plain <a> tags so it can render
// outside a Router. In your actual project, restore react-router-dom's
// <Link to="..."> in place of <a href="..."> — the classNames/markup
// structure is otherwise unchanged, so it's a drop-in swap.

export default function Header({ cart = { total: 0 } }) {
  const cartCount = cart.total;

  return (
    <header className="ptt-header">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=EB+Garamond:wght@400;500&display=swap');

        .ptt-header {
          --paper: #f2e8d0;
          --paper-deep: #e8dab6;
          --ink: #2b2118;
          --ink-soft: #6b5f4d;
          --oxblood: #7c2f2f;
          --gold: #b0812f;

          position: relative;
          background:
            radial-gradient(var(--paper-deep) 0.6px, transparent 0.6px) 0 0 / 14px 14px,
            var(--paper);
          font-family: 'EB Garamond', serif;
          color: var(--ink);
        }

        .ptt-header__frame {
          margin: 14px;
          border: 2px solid var(--ink);
          outline: 1px solid var(--gold);
          outline-offset: -6px;
        }

        .ptt-header__corner {
          position: absolute;
          width: 26px;
          height: 26px;
          stroke: var(--gold);
          fill: none;
          z-index: 2;
        }
        .ptt-header__corner--tl { top: 12px; left: 12px; }
        .ptt-header__corner--tr { top: 12px; right: 12px; transform: scaleX(-1); }
        .ptt-header__corner--bl { bottom: 12px; left: 12px; transform: scaleY(-1); }
        .ptt-header__corner--br { bottom: 12px; right: 12px; transform: scale(-1, -1); }

        .ptt-header__bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 34px;
          border-bottom: 1px solid var(--ink);
        }

        .ptt-header__nav {
          display: flex;
          align-items: center;
          gap: 26px;
        }

        .ptt-header__nav a {
          position: relative;
          color: var(--ink-soft);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .ptt-header__nav a::after {
          content: "";
          position: absolute;
          left: 50%;
          right: 50%;
          bottom: -5px;
          height: 1px;
          background: var(--oxblood);
          transition: left 0.25s ease, right 0.25s ease;
        }

        .ptt-header__nav a:hover,
        .ptt-header__nav a:focus-visible {
          color: var(--oxblood);
        }

        .ptt-header__nav a:hover::after,
        .ptt-header__nav a:focus-visible::after {
          left: 0;
          right: 0;
        }

        .ptt-header__nav a:focus-visible {
          outline: 1px solid var(--oxblood);
          outline-offset: 4px;
        }

        .ptt-header__cart {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 7px 14px 7px 12px;
          background: var(--oxblood);
          color: var(--paper);
          text-decoration: none;
          border: 1px solid var(--ink);
          box-shadow: 3px 3px 0 var(--ink);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .ptt-header__cart:hover,
        .ptt-header__cart:focus-visible {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--ink);
          outline: none;
        }

        .ptt-header__cart-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .ptt-header__cart-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          border-radius: 50%;
          background: var(--gold);
          color: var(--ink);
          font-family: 'EB Garamond', serif;
          font-size: 12px;
          font-weight: 500;
        }

        .ptt-header__hero {
          min-height: 30vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 24px;
        }

        .ptt-header__eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--oxblood);
          margin: 0 0 26px;
        }

        .ptt-header__eyebrow svg {
          width: 16px;
          height: 16px;
          stroke: var(--gold);
          fill: none;
        }

        .ptt-header__logo {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          text-decoration: none;
          color: var(--ink);
          font-size: clamp(52px, 9vw, 108px);
          line-height: 0.98;
          letter-spacing: -0.01em;
        }

        .ptt-header__logo span {
          display: block;
          font-size: 0.32em;
          font-weight: 400;
          font-style: italic;
          font-family: 'EB Garamond', serif;
          letter-spacing: 0.05em;
          color: var(--oxblood);
          margin: 10px 0 4px;
        }

        .ptt-header__divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 30px;
        }

        .ptt-header__divider .line {
          width: 64px;
          height: 1px;
          background: var(--ink);
          opacity: 0.5;
        }

        .ptt-header__divider svg {
          width: 14px;
          height: 14px;
          stroke: var(--oxblood);
          fill: none;
        }

        @media (max-width: 720px) {
          .ptt-header__bar {
            padding: 16px 20px;
            flex-wrap: wrap;
            row-gap: 12px;
          }
          .ptt-header__nav {
            gap: 18px;
            order: 3;
            width: 100%;
            justify-content: center;
          }
          .ptt-header__hero {
            min-height: 44vh;
            padding: 40px 20px;
          }
          .ptt-header__cart-label {
            display: none;
          }
        }
      `}</style>

      <div className="ptt-header__frame">
        <svg
          className="ptt-header__corner ptt-header__corner--tl"
          viewBox="0 0 26 26"
        >
          <path d="M1 25V6a5 5 0 0 1 5-5h19" strokeWidth="1.4" />
        </svg>
        <svg
          className="ptt-header__corner ptt-header__corner--tr"
          viewBox="0 0 26 26"
        >
          <path d="M1 25V6a5 5 0 0 1 5-5h19" strokeWidth="1.4" />
        </svg>
        <svg
          className="ptt-header__corner ptt-header__corner--bl"
          viewBox="0 0 26 26"
        >
          <path d="M1 25V6a5 5 0 0 1 5-5h19" strokeWidth="1.4" />
        </svg>
        <svg
          className="ptt-header__corner ptt-header__corner--br"
          viewBox="0 0 26 26"
        >
          <path d="M1 25V6a5 5 0 0 1 5-5h19" strokeWidth="1.4" />
        </svg>

        <div className="ptt-header__bar">
          <nav className="ptt-header__nav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/favorites">Favorites</a>
          </nav>

          <a href="/cart" className="ptt-header__cart" aria-label="カート">
            <span className="site-header__cart-icon" aria-hidden="true">
              🛒
            </span>
            <span className="ptt-header__cart-badge">{cartCount}</span>
          </a>
        </div>

        <div className="ptt-header__hero">
          <p className="ptt-header__eyebrow">
            <svg viewBox="0 0 24 24" strokeWidth="1.4">
              <path d="M4 12h16M4 12l5-5M4 12l5 5" />
            </svg>
            A Curated Bookshop
            <svg viewBox="0 0 24 24" strokeWidth="1.4">
              <path d="M20 12H4M20 12l-5-5M20 12l-5 5" />
            </svg>
          </p>

          <a href="/" className="ptt-header__logo">
            Paper &amp; Thoughts
          </a>

          <div className="ptt-header__divider">
            <span className="line" />
            <svg viewBox="0 0 24 24" strokeWidth="1.4">
              <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5-6.5-4.5L5.5 21 8 13.5 2 9h7.5z" />
            </svg>
            <span className="line" />
          </div>
        </div>
      </div>
    </header>
  );
}
