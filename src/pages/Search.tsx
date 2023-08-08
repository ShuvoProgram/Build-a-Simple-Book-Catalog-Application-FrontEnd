/* eslint-disable @typescript-eslint/no-unused-vars */
// import BookCard from '@/components/BookCard';
import { useDebounce } from 'use-debounce';
import ErrorMessage from '@/components/ErrorMessage';
import SearchForm from '@/components/searchForm';
import { SkeletonData } from '@/components/ui/skeletonData';
import { useLazySearchBooksQuery } from '@/redux/features/books/booksApi';
// import { IBookData } from '@/types/globalTypes';
import { useEffect, useState } from 'react'

export default function Search() {
     const [searchTerm, setSearchTerm] = useState('');
      const [searchBooks, {data, error, isLoading}] = useLazySearchBooksQuery();

      const [debouncedQuery] = useDebounce(searchTerm, 500)

      useEffect(() => {
        if(debouncedQuery.length){
            searchBooks({query: debouncedQuery})
        }
      }, [debouncedQuery, searchBooks])

      if(isLoading){
        return <SkeletonData/>
      }
      if(error) {
        return <ErrorMessage error={error}/>
      }
  return (
    <>
    <h1>Search Books</h1>
    <SearchForm query={searchTerm} setQuery={setSearchTerm}/>

    {
        data && searchTerm.length ? (
            <>
            {/* {data?.data.length === 0? (
        <div>No books available.</div>
        ) : data?.data?.map((book: IBookData) => (
          <BookCard book={book}/>
        ))
      } */}
      {
        console.log(data)
      }
            </>

        ) : (
            <p>No Books Found</p>
        )
    }
    </>
  )
}
