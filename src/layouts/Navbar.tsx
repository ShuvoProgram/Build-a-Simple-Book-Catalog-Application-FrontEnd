/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import logo from '../assets/booklogo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { setUser } from '@/redux/features/user/userSlice';
// import { FormEvent } from 'react';

export default function Navbar() {
 const { user } = useAppSelector((state: { auth: any; }) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // console.log('Logout');
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <Link to={`/`}>
            <img className="h-8" src={logo} alt="log" />
          </Link>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to={`/books`}>Books</Link>
                </Button>
              </li>
              <li>
                <Link to={'/search'}>
                  <HiOutlineSearch size="25" />
                </Link>
              </li>
              {/* <li>
                <Cart />
              </li> */}
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <>
                        <Link to="/add-new-book">
                          <DropdownMenuItem className="cursor-pointer">
                            add-new-book
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/dashboard/books">
                          <DropdownMenuItem className="cursor-pointer">
                            Books Table
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/dashboard/wishlist">
                          <DropdownMenuItem className="cursor-pointer">
                            Wishlist
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/dashboard/reading-list">
                          <DropdownMenuItem className="cursor-pointer">
                            Reading List
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
