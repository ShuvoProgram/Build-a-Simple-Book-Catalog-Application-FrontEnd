import { IFilter } from "@/redux/features/books/booksSlice";
import { FC } from "react";
import { Link } from "react-router-dom";
import '../css/filterList.css';

interface Props {
  filter: IFilter[] | undefined;
}

const FilterList: FC<Props> = ({ filter }) => (
  <ul className='categories-list'>
    {filter?.map(f => (
      <li key={f.id}>
        <Link to={`/products/categories/${f.name}`}>{f.name}</Link>
      </li>
    ))}
  </ul>
);

export default FilterList;