import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth, useCheckAuthenticated } from '@/hook/useAuth';
import { logout } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
// import { FormEvent } from 'react';

export default function Navbar() {
  const {isAuthenticated} = useCheckAuthenticated();
  const {isAuthLoaded} = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch the logout action from your userSlice
    navigate('/');
  };

  if(!isAuthLoaded){
    <div>Loading....</div>
  }

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/signup">SignUp</Link>
                </Button>
              </li>

              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
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
                    {!isAuthenticated && (
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
                    {isAuthenticated && (
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

                        <DropdownMenuItem
                          onClick={logoutHandler}
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
