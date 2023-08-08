import React from 'react';
import { Link } from 'react-router-dom';

interface Book {
//   image: string;
_id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* <img src={book.image} alt={book.title} className="w-full h-40 object-cover" /> */}
      <Link to={`/books-details/${book._id}`} className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 font-semibold mb-2">Author: {book.author}</p>
        <p className="text-gray-700 font-semibold mb-2">Genre: {book.genre}</p>
        <p className="text-gray-700 font-semibold">Publication Date: {book.publicationDate}</p>
      </Link>
      <div className="px-6 py-4 flex justify-between">
        <a href="#" className="text-blue-500 font-semibold hover:text-blue-600">
          Wishlist
        </a>
        <Link to={`/edit-books/${book._id}`}>Edit</Link>
        <a href="#" className="text-green-500 font-semibold hover:text-green-600">
          Read
        </a>
      </div>
    </div>
  );
};

export default BookCard;
