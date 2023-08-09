/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/books/booksApi";
import { SkeletonData } from "./ui/skeletonData";
import { IBookData } from "@/types/globalTypes";
import { Link } from "react-router-dom";
import AlertDialogBox from "./AlertDialogBox";

export function TableDemo() {
    const { data, isLoading, refetch } = useGetBooksQuery(undefined, {
      refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });

    const [deleteBook, { isError, isSuccess}] = useDeleteBookMutation();

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
    <>
    {renderMessage()}

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
        {data?.data?.map((book: IBookData) => (
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
            <TableCell>
                <AlertDialogBox id={book._id} deleteBook={deleteBook} refetch={refetch}/>
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
