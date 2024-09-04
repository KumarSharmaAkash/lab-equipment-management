import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/reduxStorage';
import { setDisplayLogin } from '../../../../redux/slices/modalSlice';
import { navigationForAdmin } from "../../../../constants";
import { navigationForStudent } from "../../../../constants";
import Button from "../../../../components/Button";
import MenuSvg from "../../../../assets/svg/MenuSvg";
import { HamburgerMenu } from "../../../../components/design/Header";
import { disablePageScroll, enablePageScroll } from "scroll-lock";


export const Navbar: React.FC = () => {

  const pathname = useLocation();
  const authState = useSelector((state: RootState) => state.authentication);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [openNavigation, setOpenNavigation] = useState(false);

  let navigation =[];
  if(authState.loggedInUser?.type==='EMPLOYEE'){
     navigation= navigationForAdmin;
  }else{
     navigation= navigationForStudent;
  
  }

  const navigateToProfile = () => {
    if (authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`);
  }

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  }
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };
 
  return (



    <div
    className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
      openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm "
    }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 lg:bg-blue-900">
      <Button
          className="ml-0 lg:hidden mr-10"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
        <Link to="/" className=" block w-[12rem] xl:mr-8 ">
          <h1>NITLabs</h1>
        </Link>
        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">

            {navigation.map((item) => (

              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}

              >
                { (item.onlyMobile && authState.loggedInUser?.type==='EMPLOYEE'? "Admin": item.title)}
              </a>

            ))}
          </div>
          <HamburgerMenu />

        </nav>
        

        <Button className="hidden lg:flex" white>
          {authState.loggedInUser ? <p onClick={navigateToProfile}>{authState.loggedInUser.firstName}</p> : <p onClick={toggleLogin} >LOGIN</p>}
        </Button>

        

      </div>



    </div>
  )
}

