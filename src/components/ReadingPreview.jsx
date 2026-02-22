import Stars from "./Stars";

// Convert markdown emphasis to HTML tags for rendering reviews
function replaceMarkdownEmpahasis(text) {
  return text.
    replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>').
    replace(/__([^_]+?)__/g, '<i>$1</i>').
    replace(/\*([^*]+?)\*/g, '<strong>$1</strong>').
    replace(/_([^_]+?)_/g, '<i>$1</i>');
}

export default function ReadingPreview({ reading, post }) {
  return (
    <div className={`post-preview post-read-preview`}>
      <h4>
        {new Date(reading.read_date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h4>
      <h3>
        {post && (
          <a href={`/${post.collection}/${post.slug}`}>
            {post.data.shortTitle ? post.data.shortTitle : post.data.title} ✍️
          </a>
        )}
        {!post && reading.title} {reading.rating && (
          <span className="rating">
            <Stars rating={reading.rating} />
          </span>
        )}
        {reading.recommendation && (
          <span className="recommendation">
            {reading.recommendation > 8 && '👍'}
          </span>
        )}
      </h3>
      <span className="authors">{reading.author}</span>
      <span>
        {reading.tags &&
          reading.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag.toUpperCase()}
            </span>
          ))}
      </span>
      {reading.review && reading.review !== '' && (
        <div className="review">
          <p dangerouslySetInnerHTML={{ __html: replaceMarkdownEmpahasis(reading.review) }} />
        </div>
      )}
    </div>
  );
}
