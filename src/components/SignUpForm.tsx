import * as React from 'react';
import {cn} from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {useForm} from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import {createUser, savePerson} from '@/redux/features/user/userSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hook';
import { toast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';
// import { usePostUserMutation } from '@/redux/features/user/usersApi';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignUpFormInputs {
  email: string;
  password: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

//   const [postUser, {isLoading}] = usePostUserMutation;
const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);


  const onSubmit = async (data: SignUpFormInputs) => {
    dispatch(createUser({ email: data.email, password: data.password })).then((data) => {
      console.log(data.meta.arg)
      const option = {
        email: data.meta.arg.email,
        password: data.meta.arg.password
      }
      try {
        const result = savePerson(option);
        toast({
        description: 'User Successfully Added',
      });
        return result;
      } catch (error) {
        console.error('Error occurred:', error);
      }
    })
  };

  React.useEffect(() => {
    if (user.email && !isLoading) {
      navigate('/');
    }
  }, [user.email, isLoading, navigate]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              id="password"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button variant={'secondary'}>Create Account</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}