export default function BookLoader() {
  return (
    <div className="demo">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=EB+Garamond:ital@1&display=swap');

        .demo {
          min-height: 100vh;
          background: #f2e8d0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
        }

        .book-loader {
          position: relative;
          width: 64px;
          height: 46px;
          perspective: 240px;
        }

        /* static left page (the spine side, never moves) */
        .book-loader__base {
          position: absolute;
          inset: 0;
          background: #faf3e2;
          border: 1px solid #2b2118;
        }

        /* the spine itself */
        .book-loader__spine {
          position: absolute;
          top: -2px;
          bottom: -2px;
          left: 50%;
          width: 2px;
          background: #7c2f2f;
          transform: translateX(-50%);
          z-index: 5;
        }

        /* three pages, right half, flipping over the spine one after another */
        .book-loader__page {
          position: absolute;
          top: 0;
          right: 0;
          width: 32px;
          height: 100%;
          background: #faf3e2;
          border: 1px solid #b0812f;
          border-left: none;
          transform-origin: left center;
          backface-visibility: hidden;
          animation: page-flip 1.6s ease-in-out infinite;
        }

        .book-loader__page:nth-child(3) { animation-delay: 0s; }
        .book-loader__page:nth-child(4) { animation-delay: 0.4s; }
        .book-loader__page:nth-child(5) { animation-delay: 0.8s; }

        @keyframes page-flip {
          0%   { transform: rotateY(0deg); }
          50%  { transform: rotateY(-160deg); }
          100% { transform: rotateY(-180deg); opacity: 0; }
        }

        .book-loader__label {
          font-family: "EB Garamond", Georgia, serif;
          font-style: italic;
          font-size: 13px;
          letter-spacing: 0.1em;
          color: #7a6c55;
        }
      `}</style>

      <div className="book-loader">
        <div className="book-loader__base" />
        <div className="book-loader__spine" />
        <div className="book-loader__page" />
        <div className="book-loader__page" />
        <div className="book-loader__page" />
      </div>
      <p className="book-loader__label">読み込み中…</p>
    </div>
  );
}
