import { usePostBooksMutation } from '@/redux/features/books/booksApi';
import { ChangeEvent,FormEvent ,useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface IPost {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
}

export default function AddedBooks({title, author, genre, publicationDate} : IPost) {
    const [inputValue, setInputValue] = useState<string>('');

  const [postBooks, {isLoading, isError, isSuccess}] = usePostBooksMutation();

  console.log(isLoading)
  console.log(isError)
  console.log(isSuccess)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue)

    const options = {
        title: title,
        author: author,
        genre: genre,
        publicationDate: publicationDate
    }

    postBooks(options);
    setInputValue('');
  };

//   const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setInputValue(e.target.value)
//   }
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input className="min-h-[30px]" type="text" onChange={handleChange} value={inputValue} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={inputValue} onChange={handleChange} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={inputValue} onChange={handleChange} />
      </div>
      <div>
        <label>Publication Date:</label>
        <input type="text" value={inputValue} onChange={handleChange} />
      </div>
      <button type="submit" className="rounded-full h-10 w-10 p-2 text-[25px]">
        <FiSend />
        Submit</button>
    </form>
    </div>
  );
}
