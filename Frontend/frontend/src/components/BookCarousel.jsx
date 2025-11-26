import React from "react";
import BookCard from "./BookCard.jsx";

function BookCarousel({ books }) {
  if (!books || books.length === 0) return null;

  return (
    <section className="container my-4">
      <h2 className="mb-3">Nouveautés & coups de cœur</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 pb-2">
        {books.map((book) => (
          <div key={book.id} style={{ minWidth: "240px" }}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookCarousel;
