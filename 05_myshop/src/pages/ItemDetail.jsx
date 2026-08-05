import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import BookLoader from "../components/BookLoader.jsx";
import ItemCard from "../components/ItemCard.jsx";

const RELATED_LIMIT = 4;

export default function ItemDetail({
  favorites,
  cart,
  handleFavorite,
  handleAddToCart,
}) {
  // URLパラメータを取得
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    getDocs(collection(db, "items")).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const found = data.find((i) => i.id === id);
      setItem(found ?? null);

      if (found) {
        const related = data
          .filter(
            (i) => i.id !== found.id && i.color && i.color === found.color,
          )
          .slice(0, RELATED_LIMIT);
        setRelatedItems(related);
      } else {
        setRelatedItems([]);
      }

      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!item || item.theme !== "newsreel") return;

    let gapTimer;
    let burstTimer;

    const scheduleNext = () => {
      const gap = 8000 + Math.random() * 9000;
      gapTimer = setTimeout(() => {
        setFlash(true);
        const duration = 700 + Math.random() * 700;
        burstTimer = setTimeout(() => {
          setFlash(false);
          scheduleNext();
        }, duration);
      }, gap);
    };

    scheduleNext();
    return () => {
      clearTimeout(gapTimer);
      clearTimeout(burstTimer);
    };
  }, [item]);

  if (loading) {
    return <p className="loading">読み込み中...</p>;
  }

  // アイテムが見つからなかった場合
  if (!item) {
    return (
      <div className="item-detail item-detail--notfound">
        <p>アイテムが見つかりません。</p>
        <Link to="/" className="item-detail__back">
          ← 一覧へ戻る
        </Link>
      </div>
    );
  }

  const handleDetailFavorite = (e) => {
    e.preventDefault();

    if (favorites.has(item.id)) {
      favorites.remove(item.id);
    } else {
      favorites.add(item.id);
    }
  };

  const handleDetailAddToCart = (e) => {
    e.preventDefault();
    cart.add(item.id);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewText.trim()) return;

    setReviews([
      ...reviews,
      {
        id: Date.now(),
        name: reviewName.trim() || "名無し",
        text: reviewText.trim(),
        rating: reviewRating,
      },
    ]);

    setReviewName("");
    setReviewText("");
    setReviewRating(5);
  };

  const isNewsreel = item.theme === "newsreel";
  const isFlashing = isNewsreel && flash;

  return (
    <div className={`item-detail${isFlashing ? " item-detail--flash" : ""}`}>
      <Link to="/" className="item-detail__back">
        ← 一覧へ戻る
      </Link>
      <div className="item-detail__image">
        <div
          className={`item-detail__photo${isFlashing ? " item-detail__photo--flash" : ""}`}
        >
          <img src={item.image} alt={item.name} />
          {isFlashing && (
            <>
              <div className="item-detail__grain" />
              <div className="item-detail__scratch item-detail__scratch--a" />
              <div className="item-detail__scratch item-detail__scratch--b" />
              <div className="item-detail__vignette" />
            </>
          )}
        </div>
        {item.status === "soldout" && (
          <span className="item-detail__badge">soldout</span>
        )}
      </div>
      <div className="item-detail__body">
        <p className="item-detail__category">{item.category}</p>
        <h2 className="item-detail__name">{item.name}</h2>
        <p className="item-detail__price">¥{item.price.toLocaleString()}</p>
        <p className="item-detail__description">{item.description}</p>
        <dl className="item-detail__specs">
          <div className="item-detail__spec">
            <dt>品番</dt>
            <dd>{item.code}</dd>
          </div>
          <div className="item-detail__spec">
            <dt>著者</dt>
            <dd>{item.color}</dd>
          </div>
          <div className="item-detail__spec">
            <dt>出版</dt>
            <dd>{item.size}</dd>
          </div>
        </dl>
        <div className="item-detail__actions">
          <button
            type="button"
            className={
              favorites.has(item.id)
                ? "item-detail__fav is-active"
                : "item-detail__fav"
            }
            onClick={handleDetailFavorite}
          >
            {favorites.has(item.id) ? "♥" : "♡"}
          </button>

          <button
            type="button"
            className="item-detail__cart"
            onClick={handleAddToCart}
            disabled={item.status === "soldout"}
          >
            {item.status === "soldout" ? "在庫なし" : "カートに入れる"}
          </button>
        </div>
      </div>

      <section className="item-detail__reviews">
        <h3 className="item-detail__reviews-title">レビュー</h3>

        <div className="item-detail__reviews-layout">
          <div className="item-detail__review-sample">
            <p className="item-detail__review-sample-title">読者レビュー</p>
            <p className="item-detail__review-stars">★★★★★</p>
            <p className="item-detail__review-sample-text">
              装丁がきれいで、手元に置いておきたくなる一冊でした。内容も読みやすく、贈り物にもよさそうです。
            </p>
            <p className="item-detail__review-sample-author">田中さん</p>
          </div>

          <form
            className="item-detail__review-form"
            onSubmit={handleReviewSubmit}
          >
            <input
              type="text"
              className="item-detail__review-name"
              placeholder="名前"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
            />

            <div className="item-detail__rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= reviewRating
                      ? "item-detail__rating-star is-active"
                      : "item-detail__rating-star"
                  }
                  onClick={() => setReviewRating(star)}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              className="item-detail__review-text"
              placeholder="レビューを書く"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button type="submit" className="item-detail__review-submit">
              投稿する
            </button>
          </form>
        </div>

        <ul className="item-detail__review-list">
          {reviews.map((review) => (
            <li key={review.id} className="item-detail__review">
              <p className="item-detail__review-author">{review.name}</p>
              <p className="item-detail__review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="item-detail__review-body">{review.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {relatedItems.length > 0 && (
        <section className="item-detail__related">
          <h3 className="item-detail__related-title">同じ著者の本</h3>
          <ul className="item-detail__related-list">
            {relatedItems.map((related) => (
              <li key={related.id}>
                <ItemCard item={related} favorites={favorites} cart={cart} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {isFlashing && (
        <div className="item-detail__reel-overlay">
          <div className="item-detail__reel-grain" />
          <div className="item-detail__reel-scratch" />
          <div className="item-detail__reel-vignette" />
        </div>
      )}
    </div>
  );
}
