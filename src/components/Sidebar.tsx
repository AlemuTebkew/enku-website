import React, { SetStateAction, useState, useRef } from 'react';
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
import { Brand } from '@/models/brand';
import SearchBar from './SearchBar';
import { Separator } from './ui/separator';


type SidebarProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    categories: Category[];
    brands: Brand[];
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Sidebar = ({ isOpen, setIsOpen,categories, brands }: SidebarProps) => {
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = (searchQuery: string) => {
    setSearchTerm(searchQuery);
    setSelectedLetter(null); // Reset selected letter when searching
  };

  const handleLetterClick = (letter: string) => {
    const element = scrollRefs.current[letter];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const groupedBrands = brands.reduce((acc: { [key: string]: Brand[] }, brand) => {
    const firstLetter = brand.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  const filteredBrands = Object.keys(groupedBrands).reduce((acc: { [key: string]: Brand[] }, letter) => {
    if (groupedBrands[letter].some(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
      acc[letter] = groupedBrands[letter].filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return acc;
  }, {});


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
        <div className='h-screen overflow-y-auto pr-2' style={{ maxHeight: 'calc(100vh - 120px)'}}>
          {
            value === 0? (
            <Accordion type="multiple" className='px-4'>
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger><Link target='_blank' className='hover:text-primaryT' href={`/products?category=${category.name}`}><p>{category.name}</p></Link></AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="multiple">
                      {category.subCategories.map((subCategory) => (
                        <AccordionItem key={subCategory.id} value={subCategory.id}>
                          <AccordionTrigger><Link target='_blank' className='hover:text-primaryT' href={`/products?category=${category.name}&&subCategory=${subCategory.name}`}><p className='font-normal'>{subCategory.name}</p></Link></AccordionTrigger>
                          <AccordionContent>
                            <ul className='flex flex-col gap-0'>
                                <Separator/>
                                {subCategory.subSubCategories.map((subSubCategory, index) => (
                                  <div key={index} className='w-full flex flex-col gap-0'>
                                    <li key={subSubCategory.id}><Link target='_blank' className='hover:text-primaryT px-2' href={`/products?category=${category.name}&&subCategory=${subCategory.name}&&subSubCategory=${subSubCategory.name}`}><p className='font-normal p-2'>{subSubCategory.name}</p></Link></li>
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
            ): (
              <div className='flex flex-col gap-4'>
                <div className='pt-4 px-4'>
                  <SearchBar 
                  search={handleSearch}
                  />
                </div>
                <Separator/>
                
                <div className='flex justify-between mb-8 px-4'>
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                  {alphabet.map(letter => (
                    <div key={letter} ref={el => { scrollRefs.current[letter] = el; }}>
                      <h3 className="font-bold text-lg">{letter}</h3>
                      <ul>
                        {filteredBrands[letter]?.map((brand) => (
                          <li key={brand.id}>
                            <Link target='_blank' className='hover:text-primaryT' href={`/products?brand=${brand.name}`}>
                              <p className='font-normal'>{brand.name}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                  <div className="flex flex-col mb-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 0px)' }}>
                  {alphabet.map(letter => (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      className={`p-2 ${scrollRefs.current[letter] ? 'text-primaryT font-bold' : 'text-secondaryT'}`}
                    >
                      {letter}
                    </button>
                  ))}
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Box>
      </nav>
    </div>
  );
};

export default Sidebar;
