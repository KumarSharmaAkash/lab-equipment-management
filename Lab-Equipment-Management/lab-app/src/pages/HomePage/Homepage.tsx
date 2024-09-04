import { useRef } from 'react';
import { background, curve} from '../../assets';
import Button from '../../components/Button';
import { BackgroundCircles } from '../../components/design/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStorage';
import { useNavigate } from 'react-router-dom';
import { setDisplayLogin } from '../../redux/slices/modalSlice';
import { heroIcons } from "../../constants/index";
import { ScrollParallax } from "react-just-parallax";
import Notification from '../../components/Notification';
import Generating from '../../components/Generating';
import Benefits from '../../components/Benefits';


export default function HomePage(): JSX.Element {
    const navigateToProfile = () => {
        if (authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`);
    }

    const parallaxRef = useRef(null);
    const authState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const toggleLogin = () => {
        dispatch(setDisplayLogin(true));
    }
    return (
        <div
      className="pt-[12rem] -mt-[5.25rem] bg-gray-100"
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h2 mb-6 text-blue-900">
            National Institue of Technology&nbsp;Delhi{` `}
            <span className="inline-block relative">
            Lab Equipment
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-6 lg:mb-8">
          Welcome to the NITLabs ( Lab Equipment Reservation System) – Streamline your research with our user-friendly platform. Easily browse, reserve, and manage lab equipment with real-time availability and automated notifications, enhancing your academic and research productivity.
          </p>
          
          { authState.loggedInUser ?
            <Button white onClick={navigateToProfile}>
                {authState.loggedInUser.firstName}
            </Button>
            :
            <Button white onClick={toggleLogin}>
               LOGIN Here
            </Button>}
            <BackgroundCircles />
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24 ">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={background}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <a href={authState.loggedInUser?.type==='EMPLOYEE'?"/list":"#"}className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <p className="p-5 ml-2" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </p>
                    ))}
                    <a className='p-5 '>Loaned List</a>
                  </a>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="NIT DELHI"
                  />
                </ScrollParallax>
              </div>
            </div>

          
          </div>

          
        </div>
        <BackgroundCircles />
       
      </div>
      <Benefits/>
    </div>
    );
}
