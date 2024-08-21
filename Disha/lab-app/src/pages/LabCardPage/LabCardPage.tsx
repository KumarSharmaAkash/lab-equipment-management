import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/reduxStorage";
import { setDisplayLabCardId } from "../../redux/slices/modalSlice";
import Section from "../../components/Section";
import { collabApps, collabContent, collabText } from "../../constants";
import { check, circuit } from "../../assets";
import Button from "../../components/Button";
import { LeftCurve, RightCurve } from "../../components/design/Collaboration";

export const LabCardPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleDisplayModal = () => {
        dispatch(setDisplayLabCardId(true));
    }

    return (
        <Section crosses className="pt-[14rem]  mt-1 bg-gray-100   ">
        <div className="container lg:flex">
          <div className="max-w-[30rem]">
            <h2 className="h2 mb-4 md:mb-8 text-gray-900">
            Create Your Student ID Account to access the lab equipments
            </h2>
  
            <ul className="max-w-[22rem] mb-10 md:mb-14 text-gray-900">
              {collabContent.map((item) => (
                <li className="mb-3 py-3" key={item.id}>
                  <div className="flex items-center">
                    <img src={check} width={24} height={24} alt="check" />
                    <h6 className="body-2 ml-5">{item.title}</h6>
                  </div>
                  
                </li>
              ))}
            </ul>
  
            <Button white className="mt-10 ml-4 "  onClick={handleDisplayModal}>get your lab card</Button>
          </div>
  
          <div className="lg:ml-auto xl:w-[38rem] mt-4">
            <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
              {collabText}
            </p>
  
            <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
              <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
                <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                  <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                    <img
                      src={circuit}
                      width={48}
                      height={48}
                      alt="circuit"
                    />
                  </div>
                </div>
              </div>
  
              <ul>
                {collabApps.map((app, index) => (
                  <li
                    key={app.id}
                    className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                      index * 45
                    }`}
                  >
                    <div
                      className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                        index * 45
                      }`}
                    >
                      <img
                        className="m-auto"
                        width={app.width}
                        height={app.height}
                        alt={app.title}
                        src={app.icon}
                      />
                    </div>
                  </li>
                ))}
              </ul>
  
               <LeftCurve/>
              <RightCurve /> 
            </div>
          </div>
        </div>
      </Section>
    );
}
