/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alertDialog"
import { Button } from "./ui/button";

interface Props {
  id: string,
  deleteBook: (id: any) => void
  refetch: () => void
}

export default function AlertDialogBox({ id, deleteBook, refetch }: Props) {
  const handleDelete = async () => {
    try {
      const result = await deleteBook(id);
      refetch(); // Refresh the book list after successful deletion
      return result;
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  return (
    <AlertDialog>
  <AlertDialogTrigger>
    <Button variant={"destructive"}>Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your data from servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
