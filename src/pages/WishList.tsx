import BookCard from "@/components/BookCard";
import { SkeletonData } from "@/components/ui/skeletonData";
import { useGetWishlistBookQuery } from "@/redux/features/books/booksApi";
import { useAppSelector } from "@/redux/hook";
import { IBookData } from "@/types/globalTypes";

export default function WishList() {
    const { user } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useGetWishlistBookQuery(user.email, 
      {
      refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });

  return (
    <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-4">WishList</h1>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.length === 0? (
        <div>No books available.</div>
        ) : data?.map((book: IBookData) => (
          <BookCard key={book._id} book={book}/>
        ))
      }
      </div>
      )
    }
    </div>
  )
}
