import { FC } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface ISearchFormProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ query, setQuery }) => (
  <form action='/search' className='search-form'>
    <div className='form-field with-icon'>
      <input
        type='text'
        name='query'
        value={query}
        placeholder='Search'
        onChange={e => setQuery(e.target.value)}
      />
      <HiOutlineSearch size="25" />
    </div>
  </form>
);

export default SearchForm;