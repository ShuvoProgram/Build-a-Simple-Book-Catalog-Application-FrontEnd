import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/booksApi';
import { useParams } from 'react-router-dom'

export default function BooksDetails() {
    const {id} = useParams();

    const {data: book, isLoading} = useSingleBookQuery(id);
    console.log(isLoading)
    console.log(book)
  return (
    <>
    <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        {/* <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div> */}
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.data?.title}</h1>
          <p className="text-xl">Author: {book?.data?.author}</p>
          <p className="text-xl">Author: {book?.data?.publicationDate}</p>
          <Button>Add to cart</Button>
        </div>
      </div>
    </>
  )
}
