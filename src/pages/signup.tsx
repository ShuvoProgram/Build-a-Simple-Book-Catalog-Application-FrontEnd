import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useRegisterMutation } from '@/redux/features/user/usersApi';
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { IRegister } from '@/redux/features/user/userSlice';
import useActions from '@/redux/action';

export default function Signup() {
  const [inputError, setInputError] = useState('');
  const [inputSuccess, setInputSuccess] = useState('');
  const [register] = useRegisterMutation();

  const {setAuthToken, setUser} = useActions();
  const navigate = useNavigate();

  const isValidForm = (formData: IRegister) => {
    const {email, password, firstName, lastName} = formData;
    if (!email.length || !password.length || !firstName.length || !lastName.length) {
      setInputError('Please fill in all fields');
      return false;
    }
    return true;
  }

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget) as Iterable<[IRegister]>;
    const entries: IRegister = Object.fromEntries(formData);

    if(!isValidForm(entries)) return;

    await register(entries).unwrap().then(data => {
      const {token} = data;
      setAuthToken({token});
      setUser(data);

      setInputError('');
      setInputSuccess('Registration successful');

      setTimeout(() => {
        navigate('/');
      }, 1000)
    }).catch(err => {
      setInputError(err.data.message);
    }) 
  }


  return (
    <div className='reg-login-page'>
      <h2>Register</h2>
      <form action='/register' onSubmit={formSubmitHandler}>
        <div className='form-item'>
          <div className='form-field with-icon'>
            <input type='email' name='email' placeholder='Email:' />
            <AiOutlineMail />
          </div>
        </div>
        <div className='form-item'>
          <div className='form-field with-icon'>
            <input type='text' name='firstName' placeholder='FirstName:' />
            <BsFillPersonFill />
          </div>
        </div>
        <div className='form-item'>
          <div className='form-field with-icon'>
            <input type='text' name='lastName' placeholder='LastName:' />
            <BsFillPersonFill />
          </div>
        </div>
        <div className='form-item'>
          <div className='form-field with-icon'>
            <input type='password' name='password' placeholder='Password:' />
            <MdLockOutline />
          </div>
          <div className='form-error'>{inputError}</div>
          <div className='form-success'>{inputSuccess}</div>
        </div>
        <div className='form-submit'>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
      <div className='change-sign-form'>
        <p>
          If you have an account? <Link to='/login'>Sign In here</Link>
        </p>
        <p>
          Back to <Link to='/'>Home</Link>
        </p>
      </div>
    </div>
  );
}
