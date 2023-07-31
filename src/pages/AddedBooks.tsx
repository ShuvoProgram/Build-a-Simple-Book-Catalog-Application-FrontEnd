/* eslint-disable @typescript-eslint/no-unused-vars */
import { postBook } from '@/redux/features/books/booksApi';
import { ChangeEvent,FormEvent ,useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

export default function AddedBooks() {
  const dispatch = useDispatch();
    const [formData, setFormData] = useState({ title: '', author: '', genre: '', publicationDate: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postBook(formData))
    console.log(formData)
  };
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const {name, value} = event.target;
    setFormData((prevData) => ({...prevData, [name]: value}))
    console.log(name, value)
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
            onChange={handleChange} value={formData.title}
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
            onChange={handleChange} value={formData.author}
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
            onChange={handleChange} value={formData.genre}
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
            onChange={handleChange} value={formData.publicationDate}
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
