
import React from 'react';
import BookCard from './BookCard';

// This is a sample data structure for books
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  category: string;
  description: string;
}

interface BookGridProps {
  books: Book[];
  title?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title }) => {
  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
