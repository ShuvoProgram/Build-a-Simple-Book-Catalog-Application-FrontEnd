import { useGetFilterBooksQuery } from "@/redux/features/books/booksApi";
import { useParams } from "react-router-dom";
import { SkeletonData } from "./ui/skeletonData";
import ErrorMessage from "./ErrorMessage";

type FilterParamsId = {
  filter: string;
};

const ProductDetails = () => {
  const { filter } = useParams() as FilterParamsId;
  const { data, isLoading, error } = useGetFilterBooksQuery({filter});

  if (isLoading) return <SkeletonData />;
  if (error) return <ErrorMessage error={error} />;
  console.log(data)

  return (
    <div className='category-details'>
      <h1>{filter}</h1>
    </div>
  );
};

export default ProductDetails;