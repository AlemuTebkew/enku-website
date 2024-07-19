import React, { SetStateAction } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// import { FaTimes } from 'react-icons/fa';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Category } from '@/models/category';
import Link from 'next/link';


type SidebarProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    categories: Category[];
}
const Sidebar = ({ isOpen, setIsOpen,categories }: SidebarProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={`fixed top-0 left-0 w-72 h-screen bg-background shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className='flex justify-end p-4'>
        <button onClick={()=>setIsOpen(false)}>
          <CloseOutlinedIcon className='text-secondaryT' />
        </button>
      </div>
      <nav className='px-4'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="Enku Navigation"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#FC2779', // Primary color for the indicator
            },
          }}
          >
            <Tab
             label="Categories"
             sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&.Mui-selected': {
                color: '#FC2779', // Primary color for selected tab
              },
             }}
             />
            <Tab 
            label="Brands"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&.Mui-selected': {
                color: '#FC2779', // Primary color for selected tab
              },
             }}
            />
          </Tabs>
        </Box>
        <Accordion type="single">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger><Link target='_blank' className='hover:text-primaryT' href={`/products?category=${category.name}`}><p>{category.name}</p></Link></AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple">
                  {category.subCategories.map((subCategory) => (
                    <AccordionItem key={subCategory.id} value={subCategory.id}>
                      <AccordionTrigger><Link target='_blank' className='hover:text-primaryT' href={`/products?category=${category.name}&&subCategory=${subCategory.name}`}><p className='font-normal'>{subCategory.name}</p></Link></AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          {subCategory.subSubCategories.map((subSubCategory) => (
                            <li key={subSubCategory.id}><Link target='_blank' className='hover:text-primaryT' href={`/products?category=${category.name}&&subCategory=${subCategory.name}&&subSubCategory=${subSubCategory.name}`}><p className='font-normal'>{subSubCategory.name}</p></Link></li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      </nav>
    </div>
  );
};

export default Sidebar;
