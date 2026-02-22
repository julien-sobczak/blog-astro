export default function BlogPostPreview({ post }) {
  return (
    <div className={`post-preview post-${post.collection}-preview`}>
      <h4>
        {new Date(post.data.date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h4>
      <h3>
        <a href={`/${post.collection}/${post.slug}`}>
          {post.data.shortTitle ? post.data.shortTitle : post.data.title}
        </a>
        {post.data.stars && (
          <span className="rating">
            {[...Array(post.data.stars)].map((_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </span>
        )}
      </h3>
      {post.collection === "read" && (
        <span className="authors">{post.data.bookAuthors}</span>
      )}
      <span>
        {post.data.tags &&
          post.data.tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="tag"
            >
              {tag.toUpperCase()}
            </a>
          ))}
      </span>
    </div>
  );
}
