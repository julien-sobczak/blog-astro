export default function Stars({ rating }) {
  /* Rating is 1-10, so we divide by 2 to get a 5-star rating */
  const stars = (rating + 1) / 2; // 1 must give 1 star
  return (
    <span>
      {stars >= 1 && <i className="fas fa-star"></i>}
      {stars >= 2 && <i className="fas fa-star"></i>}
      {stars >= 3 && <i className="fas fa-star"></i>}
      {stars >= 4 && <i className="fas fa-star"></i>}
      {stars >= 5 && <i className="fas fa-star"></i>}
    </span>
  );
}


