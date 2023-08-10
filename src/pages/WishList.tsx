import { SkeletonData } from "@/components/ui/skeletonData";
import { useGetWishlistBookQuery } from "@/redux/features/books/booksApi";
import { useAppSelector } from "@/redux/hook";
import { IBookData } from "@/types/globalTypes";
import { Link } from "react-router-dom";

export default function WishList() {
    const { user } = useAppSelector((state) => state.user);
    const { data, isLoading } = useGetWishlistBookQuery(user, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });


  return (
    <>
    {
        isLoading ? (
            <div className="flex items-center space-x-4">
      <SkeletonData className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonData className="h-4 w-[250px]" />
        <SkeletonData className="h-4 w-[200px]" />
      </div>
    </div>
        ) : (<>
            <h1 className="text-2xl font-bold mb-4">Book Collection</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.length === 0? (
        <div>No books available.</div>
        ) : data?.data?.map((book: IBookData) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* <img src={book.image} alt={book.title} className="w-full h-40 object-cover" /> */}
      <Link to={`/books-details/${book._id}`} className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 font-semibold mb-2">
          Author: {book.author}
        </p>
        <p className="text-gray-700 font-semibold mb-2">Genre: {book.genre}</p>
        <p className="text-gray-700 font-semibold">
          Publication Date: {book.publicationDate}
        </p>
      </Link>
      <div className="px-6 py-4 flex justify-end">
        <a
          href="#"
          className="text-green-500 font-semibold hover:text-green-600"
        >
          Read
        </a>
      </div>
    </div>
        ))
      }
      </div>
        </>
        )
    }
    </>
  )
}
