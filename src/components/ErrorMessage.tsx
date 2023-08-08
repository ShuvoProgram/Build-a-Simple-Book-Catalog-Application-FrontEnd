import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FC } from "react";

interface IErrorProps {
  error: SerializedError | FetchBaseQueryError | undefined;
}

const ErrorMessage: FC<IErrorProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    return (
      <div>
        <p>An error has occurred:</p>
        <p className="text-red-600 text-lg">{errMsg}</p>
      </div>
    );
  }

  return <div className='text-red-600 text-lg'>{error.message}</div>;
};

export default ErrorMessage;
