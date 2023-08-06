/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from '@/components/ui/use-toast';
import { usePostBooksMutation } from '@/redux/features/books/booksApi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent ,useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function AddedBooks() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('');

    const [postBooks] = usePostBooksMutation();
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookPost = {
      title: title,
      author: author,
      genre: genre,
      publicationDate: new Date()
    }
    try {
      const result = await postBooks(bookPost);
      toast({
      description: 'Product Added',
    });
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
          Add Book
        </button>
      </form>
    </div>
  );
}
