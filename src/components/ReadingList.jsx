import readings from "./readings.json";
import ReadingPreview from "./ReadingPreview";
import { useEffect, useMemo, useState } from "react";
import Stars from "./Stars";


export default function ReadingList({ posts }) {
  // Precalculate some information for filters
  const sortedBooks = useMemo(() => {
    return readings.books.sort((a, b) => new Date(b.read_date) - new Date(a.read_date))
  }, []);
  const activeYears = useMemo(() => {
    const years = [...new Set(sortedBooks.map(book => new Date(book.read_date).getFullYear()))];
    years.sort((a, b) => b - a);
    return years;
  }, []);

  const minYear = Math.min(...activeYears);
  const maxYear = Math.max(...activeYears);

  // We let the user filter the books based on the read year and the rating.
  // Select the N most recent years
  const [minYearSelected, setMinYearSelected] = useState(maxYear - minYear);
  // Select a minimum star rating
  const [minStarsSelected, setMinStarsSelected] = useState(0);
  // Use CSS classes to filter the books instead of filtering them in JavaScript,
  // to keep the animation and avoid re-rendering the whole list on every filter change.
  const [filterClassNames, setFilterClassNames] = useState([]);

  // Recalculate the CSS classes used to filter books after every filter change
  useEffect(() => {
    // Implementation: Filtering books in JavaScript would cause the whole list to re-render,
    // causing performance issues on React reconcilation code.
    // Instead, we use CSS classes to hide/show books based on their year and rating.
    // This way, we only need to update the CSS classes on the container when the filters change,
    // and the browser will handle showing/hiding the books with a smooth animation.
    const newFilterClassNames = [];
    let filterYearEnabled = false;
    let filterRatingEnabled = false;
    for (const year of activeYears) {
      if (year < minYearSelected) {
        newFilterClassNames.push(`filter-year-${year}`);
        filterYearEnabled = true;
      }
    }
    if (minStarsSelected > 1) {
      newFilterClassNames.push(`filter-stars-1`);
      filterRatingEnabled = true;
    }
    if (minStarsSelected > 2) {
      newFilterClassNames.push(`filter-stars-2`);
      filterRatingEnabled = true;
    }
    if (minStarsSelected > 3) {
      newFilterClassNames.push(`filter-stars-3`);
      filterRatingEnabled = true;
    }
    if (minStarsSelected > 4) {
      newFilterClassNames.push(`filter-stars-4`);
      filterRatingEnabled = true;
    }
    if (minStarsSelected > 5) {
      newFilterClassNames.push(`filter-stars-5`);
      filterRatingEnabled = true;
    }
    if (filterYearEnabled) {
      newFilterClassNames.push('filter-year-enabled');
    }
    if (filterRatingEnabled) {
      newFilterClassNames.push('filter-stars-enabled');
    }
    setFilterClassNames(newFilterClassNames);
  }, [minYearSelected, minStarsSelected]);

  return (
    <div className="post-list-container list-view">

      {/* Support filtering books over a period or based on their rating */}
      <div className="post-list-filters">
        <div id="filter-years">
          <label><i className="fas fa-calendar-alt"></i></label>
          <input
            type="range"
            min={0}
            max={maxYear - minYear}
            value={minYearSelected}
            onChange={e => setMinYearSelected(Number(e.target.value))}
          />
          <label>{maxYear - minYearSelected}–Present</label>
        </div>
        <div id="filter-ratings">
          <label><Stars rating={1} /></label>
          <input
            type="range"
            min={1}
            max={5}
            value={minStarsSelected}
            onChange={e => setMinStarsSelected(Number(e.target.value))}
          />
          <label><Stars rating={10} /></label>
        </div>
      </div>

      <div className={`post-list-content ${filterClassNames.join(' ')}`}>
        <BookList books={sortedBooks} posts={posts} />
      </div>
    </div>
  );
}

function BookList({ books, posts }) {
  return (
    <ul className="post-list">
      {books.map((book) => {
        // Check if a post exist for this book by comparing the isbn with the isbn in the post data.
        const availablePost = posts.find(post => sameISBN(book.isbn, post.data.bookIsbn));
        const filterClassNames = [`item-year-${book.publication_year}`];
        const stars = book.rating ? Math.round(book.rating / 2) : 0;
        filterClassNames.push(`item-stars-${stars}`)
        return (
          <li key={book.isbn || book.title} className={`list-item ${filterClassNames.join(' ')}`}>
            <ReadingPreview reading={book} post={availablePost} />
          </li>
        )
      })}
    </ul>
  );
}

// Compare two ISBNs to determine if they refer to the same book.
function sameISBN(isbn1, isbn2) {
  if (!isbn1 || !isbn2) return false;
  isbn1 = isbn1.replace(/-/g, '');
  isbn2 = isbn2.replace(/-/g, '');
  if (isbn1.length === 10 && isbn2.length === 13) {
    return isbn1 === isbn2.slice(-10);
  }
  if (isbn1.length === 13 && isbn2.length === 10) {
    return isbn1.slice(-10) === isbn2;
  }
  return isbn1 === isbn2;
}
