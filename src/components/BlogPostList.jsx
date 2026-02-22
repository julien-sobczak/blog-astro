import BlogPostPreview from "./BlogPostPreview";

export default function BlogPostList({ category, posts }) {
  return (
    <div className="post-list-container list-view">
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug} className={`list-item item-stars-${post.data.stars}`}>
            <BlogPostPreview post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
