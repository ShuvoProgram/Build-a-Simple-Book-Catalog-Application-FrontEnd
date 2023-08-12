/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from '@/components/BookCard';
import SearchForm from '@/components/searchForm';
import { SkeletonData } from '@/components/ui/skeletonData';
import { useGetBooksQuery, useLazySearchBooksQuery } from '@/redux/features/books/booksApi';
import { IBookData } from '@/types/globalTypes';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react'
import ErrorMessage from '@/components/ErrorMessage';


export default function Search() {
 
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
        pollingInterval: 30000
  });

  const [searchBooks, {data: book, error}] = useLazySearchBooksQuery();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPublicationDate, setSelectedPublicationDate] = useState('');
  const [filteredGenres, setFilteredGenres] = useState<IBookData[]>(data || []);
  const [filteredPublicationDates, setFilteredPublicationDates] = useState<string[]>([]);
  const [selectedFilterType, setSelectedFilterType] = useState('manual');
 
     const [searchTerm, setSearchTerm] = useState('');

     const genres: string[] = data?.data?.map((book: IBookData) => book.genre) || [];

     const extractYearFromDate = (date: string) => {
    return new Date(date).getFullYear().toString();
  };

  const [debouncedQuery] = useDebounce(searchTerm, 500)

   useEffect(() => {
        if(debouncedQuery?.length){
            searchBooks(debouncedQuery)
        }
      }, [debouncedQuery, searchBooks])

      if(isLoading){
        return <SkeletonData/>
      }
      if(error) {
        return <ErrorMessage error={error}/>
      }

  useEffect(() => {
    const filteredBooks = selectedGenre
      ? data?.data?.filter((book: IBookData) => book.genre === selectedGenre) || []
      : data?.data || [];

    setFilteredGenres(filteredBooks);

    const publicationYears: string[] = Array.from(
      new Set(filteredBooks.map((book: IBookData) => extractYearFromDate(book.publicationDate)))
    );

    setFilteredPublicationDates(publicationYears);
  }, [selectedGenre, data]);

  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilterType(event.target.value);
    setSelectedGenre('');
    setSelectedPublicationDate('');
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
    setSelectedPublicationDate('');
  };

  const handlePublicationDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPublicationDate(event.target.value);
  };

  const filteredBooks =
    selectedFilterType === 'manual'
      ? selectedGenre
        ? filteredGenres.filter((book: IBookData) => book.genre === selectedGenre)
        : filteredGenres
      : selectedPublicationDate
        ? filteredGenres.filter((book: IBookData) => extractYearFromDate(book.publicationDate) === selectedPublicationDate)
        : filteredGenres;
      
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

if(error) {
        return <ErrorMessage error={error}/>
      }
      
      
  return (
    <div className='wrapper'>
    <h1>Search Books</h1>
    <SearchForm query={searchTerm} setQuery={setSearchTerm}/>
    <div>
        <div className="flex items-center px-4">
                <p className="uppercase text-sm font-semibold mr-2 text-white">
                  Filter By:
                </p>
                <select
                  name=""
                  value={selectedFilterType}
                  onChange={handleFilterTypeChange}
                  className="text-gray-700 outline-none m-1 text-sm p-1 bg-gray-100 rounded-md"
                >
                  <option value="manual">Genre</option>
                  <option value="publication-year">Publication Year</option>
                </select>
                {selectedFilterType === 'manual' ? (
                  <select
                    name=""
                    defaultValue="All Genres"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="w-28 text-gray-700 outline-none m-1 text-sm p-1 bg-gray-100 rounded-md"
                  >
                    <option value="">All Genres</option>
                    {genres.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    )
                    )}
                  </select>
                ) : (
                  <select
                    name=""
                    defaultValue="All Publication Years"
                    value={selectedPublicationDate}
                    onChange={handlePublicationDateChange}
                    className="w-28 text-gray-700 outline-none m-1 text-sm p-1 bg-gray-100 rounded-md"
                  >
                    <option value="">All Years</option>
                    {filteredPublicationDates.map((date: string, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                )}
              </div>
      </div>
    <div>
    {book && searchTerm.length ?
    (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {book?.length === 0 ? (
                <div>No books available.</div>
            ) : (
                book?.map((book: IBookData) => (
                    <BookCard key={book._id} book={book} />
                ))
            )}
        </div>
    ) 
    : (
        data && filteredBooks.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book: IBookData) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        ) : (
            <p>No Books Found</p>
        )
    )}
</div>

    </div>
  )
}
