import React, { SetStateAction } from 'react';
// import { FaTimes } from 'react-icons/fa';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type SidebarProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-primary shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className='flex justify-end p-4'>
        <button onClick={()=>setIsOpen(false)}>
          <CloseOutlinedIcon className='text-background' />
        </button>
      </div>
      <nav className='px-4'>
        <ul className='flex flex-col gap-4'>
          <li className='text-background'>Home</li>
          <li className='text-background'>Makeup</li>
          <li className='text-background'>Skin</li>
          <li className='text-background'>Hair</li>
          <li className='text-background'>Appliances</li>
          <li className='text-background'>Bath & Body</li>
          <li className='text-background'>Natural</li>
          <li className='text-background'>Mom & Baby</li>
          <li className='text-background'>Health & Wellness</li>
          <li className='text-background'>Men</li>
          <li className='text-background'>Fragrance</li>
          <li className='text-background'>Lingerie & Accessories</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
