import  { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

interface GeneratingProps {
  className?: string;
}

const Generating: FC<GeneratingProps> = ({ className }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  const handleEnterkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
      searchRef.current.value = '';
    }
  }
  const handleSearchIconClicked = () => {
    if (searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
      searchRef.current.value = '';
    }

  }
  return (
    <div
      className={` z-1 flex items-center h-[3.5rem] px-6    rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      
      
      <input
       className="flex z-1 items-center h-[3.5rem] flex px-6 bg-n-8/80 rounded-[1.7rem] w-full "
        placeholder="Search Component"
        onKeyDown={handleEnterkey}
        ref={searchRef}
        
      />
    <div className='bg-n-8/80 rounded-[1.7rem] hidden lg:block hover:bg-green-500' >
    <FiSearch 
      onClick={handleSearchIconClicked}
      style={{
        fontSize:"50",
        padding:"14",
        
        
      }}
      />
    </div>
     
    </div> 
   
  );
};

export default Generating;
