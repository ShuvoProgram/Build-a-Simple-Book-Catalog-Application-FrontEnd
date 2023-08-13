/* eslint-disable @typescript-eslint/no-unused-vars */
import banner from '@/assets/a_boy_reading_the_bo-removebg-preview.png';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Footer from '@/layouts/Footer';
import { useRecentGetBooksQuery } from '@/redux/features/books/booksApi';
import { SkeletonData } from '@/components/ui/skeletonData';
import { IBookData } from '@/types/globalTypes';
import BookCard from '@/components/BookCard';

export default function Home() {
  const { data, isLoading } = useRecentGetBooksQuery(undefined, {
      refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });

    if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
      <SkeletonData className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonData className="h-4 w-[250px]" />
        <SkeletonData className="h-4 w-[200px]" />
      </div>
    </div>
    )
  }
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl text-blue-600 font-black text-primary mb-2">
            WELCOME TO THE <br /> 
          </h1>
          <p className="text-secondary font-semibold text-6xl">
            BOOK CATALOG
          </p>
          <div className="text-secondary mt-20 text-xl">
            <p>Here are you find amazing books world.</p>
            <p>In depth you explore knowledge deferent side of view.</p>
          </div>
          <Button variant={'outline'} className="mt-5 hover:bg-blue-600 hover:text-white">
            <Link to={`/books`}>Browse All Books</Link>
          </Button>
        </div>
        <div className="relative -right-2">
          <img src={banner} alt="" />
        </div>
      </div>
      <div className="my-4">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl pb-8 font-black text-primary uppercase mt-10">
            RecentLy Book Published
          </h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {data?.data.length === 0? (
        <div>No books available.</div>
        ) : data?.data?.map((book: IBookData) => (
          <BookCard key={book._id} book={book}/>
        ))
      }
      </div>
          <Button className="mt-10" asChild>
            <Link to="/books">Brows all products</Link>
          </Button>
        </div>
        
      </div>
    </>
  );
}
