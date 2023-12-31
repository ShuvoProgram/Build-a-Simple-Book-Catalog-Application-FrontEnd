import AlertDialogBox from '@/components/AlertDialogBox';
import BookReview from '@/components/BookReview';
import { SkeletonData } from '@/components/ui/skeletonData';
import { useDeleteBookMutation, useSingleBookQuery } from '@/redux/features/books/booksApi';
import { useAppSelector } from '@/redux/hook';
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function BooksDetails() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
    const {id} = useParams();

    const [deleteBook, { isError, isSuccess}] = useDeleteBookMutation();

    const {data: book, isLoading, refetch} = useSingleBookQuery(id);

     if (isSuccess) {
       navigate('/')
    }

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

  //   const renderMessage = () => {
  //   if (isError) {
  //     return <div className="text-2xl text-red-600">Failed To Delete</div>;
  //   }

  //   return null;
  // };

  return (
    <div>
    {
      isError ? (<div className="text-2xl text-red-600">Failed To Delete</div>) : <></>
    }
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
        <div className='h-64 overflow-hidden'>
        <img src={book?.data?.image} alt={book?.data?.title} className="object-cover object-center h-full w-full" />
      </div>
        <h1 className="text-2xl font-semibold mb-4">{book?.data?.title}</h1>
        <div className="mb-4">
          <span className="font-semibold">Genre:</span> {book?.data?.genre}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Author:</span> {book?.data?.author}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Publication Date:</span> {book?.data?.publicationDate}
        </div>
        <div className="flex justify-between">
          <Link to={`/edit-books/${book?.data?._id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Edit
                </Link>
           <AlertDialogBox id={book?.data?._id} deleteBook={deleteBook} refetch={refetch}/>
        </div>
      </div>
    </div>
      {
        !user.email ? (
          <div>Login in first then review</div>
        ) : (
          <BookReview id={id!}/>
          )
        }
    </div>
  )
}
