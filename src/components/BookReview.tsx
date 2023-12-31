import { useGetReviewQuery, usePostReviewMutation } from "@/redux/features/review/reviewApi";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { FiSend } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface IProps {
  id: string;
}

export default function BookReview({id}: IProps){
    const [inputValue, setInputValue] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const {data} = useGetReviewQuery(id, {
        refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
    })

    const [postReview] = usePostReviewMutation();


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data: { comment: inputValue },
    };
    postReview(options);
    setInputValue('');
  }

  const handleRatingChange = (newRating: number, event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRating(newRating);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

   return (
    <div className="max-w-7xl mx-auto mt-5">
     <form onSubmit={handleSubmit}>
                <div className='flex justify-between gap-3'>
                    <div className="w-1/2">
                        <div className="flex items-center text-2xl">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    className={`bg-transparent rounded-full h-8 w-8 ${rating >= value ? "text-yellow-500" : "text-gray-500"
                                        }`}
                                        onClick={(event) => handleRatingChange(value, event)}
                                >
                                    <svg
                                        className="h-8 w-8"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2">

                    </div>
                </div>
                <div className=" relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">Name</label>
                    <input type="text"
                        
                        id="name" name="name" className="w-full bg-white border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">Review</label>
                    <textarea
                        id="message" name="message" className="w-full bg-white border border-gray-300 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        onChange={handleChange}
          value={inputValue}
                        ></textarea>
                </div>
                <button type="submit"
                    
                    className="w-full rounded-lg flex items-center justify-center bg-transparent hover:bg-blue-300 text-blue-300 hover:text-black border border-blue-300 hover:border-transparent py-2 px-6 focus:outline-none text-lg"><FiSend className='text-xl mr-2' />Post Review</button>
            </form>
      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}