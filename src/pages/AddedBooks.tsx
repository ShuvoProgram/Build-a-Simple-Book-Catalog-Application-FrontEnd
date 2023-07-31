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
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            onChange={handleChange} value={inputValue}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700 font-bold">
            Author:
          </label>
          <input
            type="text"
            id="author"
            onChange={handleChange} value={inputValue}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-gray-700 font-bold">
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            onChange={handleChange} value={inputValue}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="publicationDate" className="block text-gray-700 font-bold">
            Publication Date:
          </label>
          <input
            type="text"
            id="publicationDate"
            onChange={handleChange} value={inputValue}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          <FiSend />
          Add Book
        </button>
      </form>
    </div>
  );
}
