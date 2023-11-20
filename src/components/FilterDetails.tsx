import { useParams } from "react-router-dom";

type FilterParamsId = {
  filter: string;
};

const ProductDetails = () => {
  const { filter } = useParams() as FilterParamsId;

  return (
    <div className='category-details'>
      <h1>{filter}</h1>
    </div>
  );
};

export default ProductDetails;