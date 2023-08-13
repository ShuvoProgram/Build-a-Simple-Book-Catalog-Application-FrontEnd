import { SkeletonData } from "@/components/ui/skeletonData";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useAddToReadingFinishedMutation, useDeleteReadingMutation, useGetReadingBookQuery } from "@/redux/features/books/booksApi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { CiBookmarkRemove } from "react-icons/ci";
import { useAppSelector } from "@/redux/hook";
import { IBookData } from "@/types/globalTypes";
import { Link } from "react-router-dom";

export default function ReadingList() {
    const { user } = useAppSelector((state) => state.auth);
    const { data, isLoading, refetch } = useGetReadingBookQuery(user.email, 
      {
      refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });

    const [deleteReading, { isError, isSuccess}] = useDeleteReadingMutation();

    const [addToReadingFinished] = useAddToReadingFinishedMutation()

    const handleAddToFinishedReading = async (bookId: string) => {
      const finished = await addToReadingFinished({id: bookId})
      if(finished){
        toast({
          description: "Reading finished"
        })
        refetch()
      } else {
        toast({
          description: "Reading can't finished"
        })
      }
    }

    const handleRemoveFromReadingList = async (bookId: string) => {
      const removeReading = await deleteReading({id: bookId});
      if(removeReading){
        toast({
          description: "Remove Reading"
        })
        refetch()
      } else {
        toast({
          description: "Reading can't remove"
        })
      }
    }


     const renderMessage = () => {
    if (isSuccess) {
      return <div className="text-2xl text-green-600">Delete Successfully</div>;
    }

    if (isError) {
      return <div className="text-2xl text-red-600">Failed To Delete</div>;
    }

    return null;
  };
  return (
    <div className="container mx-auto py-8">
      {renderMessage()}
    <h1 className="text-2xl font-bold mb-4">Reading List</h1>
    {
      isLoading ? (
        <div className="flex items-center space-x-4">
      <SkeletonData className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonData className="h-4 w-[250px]" />
        <SkeletonData className="h-4 w-[200px]" />
      </div>
    </div>
      ) : (
        <>
        {data?.length === 0? (
        <div>No books available.</div>
        ) : (
          <Table>
      <TableCaption>A list of your recent book publish.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Publication Date</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((book: IBookData) => (
          <TableRow key={book._id}>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.publicationDate}</TableCell>
            <TableCell>
                <Link to={`/edit-books/${book._id}`} className="text-blue-500 font-semibold hover:text-blue-600">
                    Edit
                </Link>
            </TableCell>
            <TableCell className="flex items-center">
              <BsFillBookmarkCheckFill onClick={() => handleAddToFinishedReading(book.postId)} className="text-xl text-blue-500 cursor-pointer"/>
                <CiBookmarkRemove onClick={() => handleRemoveFromReadingList(book._id)} className="text-2xl text-red-600 cursor-pointer" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        )
      }
        </>
      )
    }
    </div>
  )
}
