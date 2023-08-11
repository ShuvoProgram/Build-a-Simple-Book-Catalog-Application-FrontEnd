import { useGetWishlistBookQuery } from "@/redux/features/books/booksApi";
import { useAppSelector } from "@/redux/hook";

export default function WishList() {
    const { user } = useAppSelector((state) => state.auth);
    const { data, isLoading } = useGetWishlistBookQuery(user, 
      {
      refetchOnMountOrArgChange: true,
        pollingInterval: 30000
    });

    console.log(isLoading);
    console.log(user || '')
    console.log(data);
  return (
    <div>WishList</div>
  )
}
