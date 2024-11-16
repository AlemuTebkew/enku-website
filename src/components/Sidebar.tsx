import React, { SetStateAction, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Category, SubCategory, SubSubCategory } from '@/models/category';
import Link from 'next/link';
import { Separator } from './ui/separator';


type SidebarProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    categories: Category[];
}

const Sidebar = ({ isOpen, setIsOpen,categories }: SidebarProps) => {
  const [value, setValue] = useState(0);

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
      <nav>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingX: ".5rem" }}>
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
          </Tabs>
        </Box>
        <div className='h-screen overflow-y-auto pr-2' style={{ maxHeight: 'calc(100vh - 120px)'}}>
            <Accordion type="multiple" className='px-4'>
              {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger><Link onClick={() => setIsOpen(false)} className='hover:text-primaryT' href={`/products?category=${category.name}&&categoryId=${category.id}`}><p>{category.name}</p></Link></AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="multiple">
                      {category.subCategories.map((subCategory: SubCategory) => (
                        <AccordionItem key={subCategory.id} value={subCategory.id}>
                          <AccordionTrigger><Link onClick={() => setIsOpen(false)} className='hover:text-primaryT' href={`/products?category=${category.name}&&categoryId=${category.id}&&subCategory=${subCategory.name}`}><p className='font-normal'>{subCategory.name}</p></Link></AccordionTrigger>
                          <AccordionContent>
                            <ul className='flex flex-col gap-0'>
                                <Separator/>
                                {subCategory.subSubCategories.map((subSubCategory: SubSubCategory, index) => (
                                  <div key={index} className='w-full flex flex-col gap-0'>
                                    <li key={subSubCategory.id}><Link onClick={() => setIsOpen(false)} className='hover:text-primaryT px-2' href={`/products?category=${category.name}&&categoryId=${category.id}&&subCategory=${subCategory.name}&&subSubCategory=${subSubCategory.name}`}><p className='font-normal p-2'>{subSubCategory.name}</p></Link></li>
                                    <Separator/>
                                  </div>
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
        </div>
      </Box>
      </nav>
    </div>
  );
};

export default Sidebar;
