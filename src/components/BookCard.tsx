/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAddToReadingListMutation, useWishlistBookMutation } from '@/redux/features/books/booksApi';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { BiBookReader } from "react-icons/bi";
import { toast } from './ui/use-toast';
import { useAppSelector } from '@/redux/hook';

interface Book {
    image: string;
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
  const { user } = useAppSelector((state) => state.auth);
  const [wishlistBook] = useWishlistBookMutation();
  const [addToReadingList] = useAddToReadingListMutation();

  const handleWishlist = async () => {
    const wishlistBookObject = {
      postId: book._id,
      user: user?.email,
      title: book.title,
      image: book?.image,
      author: book.author,
      genre: book.genre,
      publicationDate: book.publicationDate,
    };
    if(user?.email){
      try {
      const result = await wishlistBook(wishlistBookObject)
      if(result) {
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

  const handleAddToReadingList = async () => {

    const readingBookObject = {
      postId: book._id,
      user: user?.email,
      title: book.title,
      image: book?.image,
      author: book.author,
      genre: book.genre,
      publicationDate: book.publicationDate,
    };

    if(user?.email){
      try {
      const result = await addToReadingList(readingBookObject)
      if(!result) {
          toast({
            description: `Added Reading List`
          })

        } else {
          toast({
            description: `You have already Read`
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
  }

  return (
    <div className="p-4 sm:mb-0 mb-6 max-w-sm relative rounded overflow-hidden border border-gray-200 shadow-lg">
      <div className='h-64 overflow-hidden'>
        <img src={book.image} alt={book.title} className="object-cover object-center h-full w-full" />
      </div>
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
      <div className="absolute top-5 right-5">
                <AiOutlineHeart
                    onClick={handleWishlist}
                    className="text-blue-500 text-3xl bg-white border border-gray-200 shadow-sm mb-2 p-1 rounded font-semibold hover:text-blue-600 cursor-pointer" />
                <BiBookReader
                    onClick={handleAddToReadingList}
                    className='text-[#37be4e] text-3xl bg-white border border-gray-200 shadow-sm mb-2 p-1 rounded cursor-pointer' />
            </div>
    </div>
  );
};

export default BookCard;
