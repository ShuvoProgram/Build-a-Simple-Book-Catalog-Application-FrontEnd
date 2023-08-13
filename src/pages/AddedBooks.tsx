/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from '@/components/ui/use-toast';
import { usePostBooksMutation } from '@/redux/features/books/booksApi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, FormEvent ,useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { HiOutlineCloudUpload } from "react-icons/hi"
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { getImageUrl } from '@/hook/useUploadImage';

export default function AddedBooks() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [productPhoto, setProductPhoto] = useState<string>("");
  const [uploadFiles, setUploadFiles] = useState<string>("");
  const [genre, setGenre] = useState<string>('');
  const [publicationDate, setPublicationDate] = useState<string>('');

    const [postBooks, {isSuccess}] = usePostBooksMutation();
    if(isSuccess) {
      toast({
      description: 'Product Added',
    });
    navigate('/dashboard/books')
    }

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const imageFile = event.target.files?.[0];
      if(imageFile) {
        const imageUrl = await getImageUrl(imageFile);
        setProductPhoto(URL.createObjectURL(imageFile));
        setUploadFiles(imageUrl)
      } 
    }

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookPost = {
      image: uploadFiles || '',
      title: title,
      author: author,
      genre: genre,
      publicationDate: publicationDate,
      email: user.email
    }
    try {
      const result = await postBooks(bookPost);
      return result;
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };



  return (
    <div className="flex justify-center items-center p-4 border border-gray-300 rounded shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col lg:w-2/4 w-3/4	shadow-2xl bg-base-100 rounded-xl p-5">
        <div className="flex flex-col mb-2 overflow-hidden">
            <div className="flex items-center justify-center w-full relative">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
                {productPhoto && (
                  <img
                    src={productPhoto}
                    alt=""
                    className="absolute w-full h-full rounded-lg object-cover opacity-50"
                    aria-disabled
                  />
                )}

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">
                      Click to upload a Product Photo
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Only Image file is allowed
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="opacity-0 absolute z-10 h-full w-full cursor-pointer"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
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
        <div>
          <Label htmlFor="genre" className="block text-gray-700 font-bold">
              Publication Date:
            </Label>
            <Input
            type='date'
            placeholder='Date'
            onChange={(e) => setPublicationDate(e.target.value)}
            />
        </div>

        <button
          type="submit"
          className={`flex items-center w-1/4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer`}
        >
          <FiSend/>
          Add Book
        </button>
      </form>
    </div>
  );
}
