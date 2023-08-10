/* eslint-disable @typescript-eslint/no-unused-vars */
import { useWishlistBookMutation } from '@/redux/features/books/booksApi';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { useAppSelector } from '@/redux/hook';

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
  const { user } = useAppSelector((state) => state.user);
  const [wishlistBook] = useWishlistBookMutation();

  const handleWishlist = async () => {
    const wishlistBookObject = {
      postId: book._id,
      user: user.email,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publicationDate: book.publicationDate,
    };
    if(user.email){
      try {
      const result = await wishlistBook(wishlistBookObject)
      if(result.data.acknowledged) {
          toast({
            description: `Added Wishlist`
          })

        } else {
          toast({
            description: `You have already`
          })
        }
      return result;
    } catch (error) {
      console.error('Error occurred:', error);
    }
    } else {
      toast({
        description: "Please login to first"
      })
    }
    
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* <img src={book.image} alt={book.title} className="w-full h-40 object-cover" /> */}
      <Link to={`/books-details/${book._id}`} className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 font-semibold mb-2">
          Author: {book.author}
        </p>
        <p className="text-gray-700 font-semibold mb-2">Genre: {book.genre}</p>
        <p className="text-gray-700 font-semibold">
          Publication Date: {book.publicationDate}
        </p>
      </Link>
      <div className="px-6 py-4 flex justify-between">
        <Button variant={'outline'}
          className="text-blue-500 font-semibold hover:text-blue-600"
          onClick={handleWishlist}
        >
          Wishlist
        </Button>
        <a
          href="#"
          className="text-green-500 font-semibold hover:text-green-600"
        >
          Read
        </a>
      </div>
    </div>
  );
};

export default BookCard;
