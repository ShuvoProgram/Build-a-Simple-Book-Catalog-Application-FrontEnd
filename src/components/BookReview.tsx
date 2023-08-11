import { useGetReviewQuery, usePostReviewMutation } from "@/redux/features/review/reviewApi";
import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FiSend } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface IProps {
  id: string;
}

export default function BookReview({id}: IProps){
    const [inputValue, setInputValue] = useState<string>('');

    const {data} = useGetReviewQuery(id, {
        refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
    })

    const [postReview, {isLoading, isError, isSuccess}] = usePostReviewMutation();

    console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue)
    const options = {
      id: id,
      data: { comment: inputValue },
    };
    postReview(options);
    setInputValue('');
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

   return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          variant={"ghost"}
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
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