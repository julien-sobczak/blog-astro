
import { useState } from "react";
import ReadingList from "./ReadingList";
import BlogPostList from "./BlogPostList";

export default function ReadinglistOrBlogPostList({ posts }) {
  const [view, setView] = useState('readingList'); // 'readingList' or 'blogPostList'

  return (
    <div>
      {view === 'readingList' && (
        <h2>
          <span className="manuscript">my</span>Reading<span className="manuscript">s</span> <small>/ or only <a onClick={() => setView('blogPostList')}>my reviews</a></small>
        </h2>
      )}
      {view === 'blogPostList' && (
        <h2>
          <span className="manuscript">my</span>Review<span className="manuscript">s</span> <small>/ or all <a onClick={() => setView('readingList')}>my readings</a></small>
        </h2>
      )}
      <hr className="star-primary" />
      {view === 'readingList' ? <ReadingList posts={posts} /> : <BlogPostList category="read" posts={posts} />}
    </div>
  );
}
