import { ChangeEventHandler, FC } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import '../css/search.css';

interface ISearchFormProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ query, setQuery }) => {
 
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };
  return <form className='search-form'>
    <div className='form-field with-icon'>
      <input
        type='text'
        name='query'
        value={query}
        placeholder='Search'
        onChange={handleInputChange} />
      <HiOutlineSearch size="25" />
    </div>
  </form>;
};

export default SearchForm;