/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-semi */
import { useState, FormEvent } from 'react';
import { usePatchBookMutation } from '@/redux/features/books/booksApi';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FiSend } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBook() {
   const {id} = useParams();
   const navigate = useNavigate();
const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [patchBook, { isError, isSuccess}] = usePatchBookMutation();

  if(isSuccess){
    toast({
      description: 'Successfully Updated Book'
    });
    navigate('/dashboard/books')
  }
  if(isError){
    toast({
      description: 'Failed Updated Book',
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send form data to the backend for updating the book
    const EditBook = {
        id: id,
      title: title,
      author: author,
      genre: genre,
    }
    console.log(EditBook);
    try {
        const result = await patchBook(EditBook);
        return result;
    } catch (error) {
        console.error('Error occurred:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="block text-gray-700 font-bold">
              Title:
            </Label>
        <Input 
        onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        </div>
        <div>
          <Label htmlFor="author" className="block text-gray-700 font-bold">
              Author:
            </Label>
        <Input 
        onChange={(e) => setAuthor(e.target.value)}
          value={author}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        </div>
        <div>
          <Label htmlFor="genre" className="block text-gray-700 font-bold">
              Genre:
            </Label>
        <Input 
        onChange={(e) => setGenre(e.target.value)}
          value={genre}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        </div>

        <button
          type="submit"
          className={`flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer`}
        >
          <FiSend/>
          Update Book
        </button>
      </form>
    </div>
  );
};
