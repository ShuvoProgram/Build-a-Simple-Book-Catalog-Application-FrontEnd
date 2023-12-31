/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from '@/components/BookCard';
import FilterList from '@/components/FilterList';
import { SkeletonData } from '@/components/ui/skeletonData';
import { useGetBooksQuery, useGetFilterQuery } from '@/redux/features/books/booksApi';
import { IBookData } from '@/types/globalTypes';
export default function Books() {
    const { data, isLoading } = useGetBooksQuery(undefined, {
      refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });

    const {data: filter} = useGetFilterQuery();
     
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
    <div className="container mx-auto py-8">
      <FilterList filter={filter}/>
      <h1 className="text-2xl font-bold mb-4">Book Collection</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.length === 0? (
        <div>No books available.</div>
        ) : data?.data?.map((book: IBookData) => (
          <BookCard key={book._id} book={book}/>
        ))
      }
      </div>
    </div>
  )
}
