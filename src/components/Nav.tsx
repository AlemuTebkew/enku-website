"use client"
import React, { useEffect, useState, useRef } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import SearchBar from './SearchBar'
import { Divider} from "@mui/material";
import Sidebar from './Sidebar';
import Link from 'next/link'
import { Category } from '../models/category'
import { Brand } from '@/models/brand';
import { Button } from './ui/button';
import CartDrawer from '../features/cart/components/CartDrawer';
import { useAppSelector } from '@/store/app-store-hooks';
import { RootState } from '@/store/app-store';
import { Separator } from './ui/separator';
import { CartItemModel } from '@/models/cart';
import useCart from '@/features/cart/hooks/useCart';
import { useRouter } from 'next/navigation';

interface NavProps {
  categories: Category[];
  brands: Brand[];
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Nav: React.FC<NavProps> = ({ categories, brands }) => {
  const router = useRouter()
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  console.log("token","token"+token)
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { itemCount } = useCart()

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(false);
    } else {
      setStickyMenu(false);
    }
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

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  return (
    <div className={`bg-white z-50 w-full py-4 shadow-lg ${
      stickyMenu ? "bg-white fixed left-0 top-0 !py-4 shadow transition duration-100" : ""
    }`}>
      <div className='w-full hidden lg:block'>
        <div className=' mx-auto max-w-c-1390 flex py-2 w-full justify-between items-center relative lg:px-12 2xl:px-0'>
          <div className='flex items-center gap-10 flex-[.7] relative z-50'>
            <div className='w-32'>
              <svg viewBox="0 0 3081 923" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M386.477 725.219C484.133 725.219 561.77 694.62 619.387 633.422L643.801 666.137C600.507 725.056 535.891 762.979 449.953 779.906C422.935 785.44 394.94 788.207 365.969 788.207C309.654 788.207 258.872 778.441 213.625 758.91C168.378 739.053 129.966 712.361 98.3906 678.832C32.9609 609.496 0.246094 523.884 0.246094 421.996C0.246094 314.574 30.0312 221.964 89.6016 144.164C129.641 91.7552 181.236 54.9714 244.387 33.8125C276.288 23.3958 305.91 18.1875 333.254 18.1875C360.923 18.1875 381.268 19.0013 394.289 20.6289C407.635 22.2565 419.517 24.3724 429.934 26.9766C440.35 29.5807 449.628 32.5104 457.766 35.7656C466.229 38.6953 475.344 41.7878 485.109 45.043C511.802 54.1576 533.286 58.7148 549.562 58.7148C565.839 58.7148 583.579 45.3685 602.785 18.6758H649.66L584.719 277.465H538.332C539.96 252.4 540.773 234.822 540.773 224.73C540.773 203.246 538.169 184.366 532.961 168.09C528.078 151.488 519.615 137.328 507.57 125.609C495.526 113.891 481.203 103.962 464.602 95.8242C431.398 79.5482 394.777 71.4102 354.738 71.4102C315.025 71.4102 280.845 79.3854 252.199 95.3359C223.879 111.286 199.953 133.096 180.422 160.766C143.638 213.826 121.665 285.928 114.504 377.074H429.445L416.262 432.25H113.039C116.294 508.096 141.359 574.503 188.234 631.469C239.992 693.969 306.073 725.219 386.477 725.219ZM718.996 735.473L740.969 732.543C769.94 727.986 787.844 723.428 794.68 718.871C807.049 710.733 813.234 695.596 813.234 673.461V15.2578L854.738 0.609375L1335.21 605.102V147.582C1335.21 116.332 1328.7 95.987 1315.68 86.5469C1305.91 79.3854 1280.85 74.0143 1240.48 70.4336V28.9297H1498.29V70.4336C1481.04 72.3867 1466.72 74.3398 1455.32 76.293C1443.93 77.9206 1434.82 81.1758 1427.98 86.0586C1415.61 94.8477 1409.43 114.867 1409.43 146.117V787.719L1371.34 798.949L887.453 190.062V658.324C887.453 686.319 893.964 705.199 906.984 714.965C916.424 721.801 931.887 726.846 953.371 730.102C974.855 733.031 987.714 734.822 991.945 735.473V776H718.996V735.473ZM1974.86 71.4102V28.9297H2227.3V71.4102C2198.33 74.9909 2173.26 86.8724 2152.1 107.055C2144.94 113.891 2137.45 121.866 2129.64 130.98L1931.4 389.77L2318.61 895.141L2285.4 922.973L1812.75 422.484L2012.94 155.883C2035.73 129.841 2047.12 109.333 2047.12 94.3594C2047.12 79.0599 2023.03 71.4102 1974.86 71.4102ZM1578.86 735.473L1595.95 733.031C1625.57 729.125 1643.31 723.754 1649.17 716.918C1655.36 710.082 1659.26 701.456 1660.89 691.039C1662.52 680.297 1663.33 665.486 1663.33 646.605V157.348C1663.33 120.238 1659.43 98.1029 1651.61 90.9414C1644.13 83.7799 1634.69 79.2227 1623.29 77.2695C1612.23 74.9909 1597.41 73.0378 1578.86 71.4102V28.9297H1846.93V71.4102C1828.05 73.0378 1812.91 74.8281 1801.52 76.7812C1790.45 78.4089 1781.98 81.9896 1776.12 87.5234C1770.27 93.0573 1766.52 101.195 1764.89 111.938C1763.27 122.68 1762.45 137.816 1762.45 157.348V646.605C1762.45 683.064 1765.71 704.874 1772.22 712.035C1779.05 719.197 1787.19 723.917 1796.63 726.195C1806.4 728.148 1819.58 730.264 1836.18 732.543L1857.18 735.473V776H1578.86V735.473ZM2698.49 798.949C2614.83 751.749 2552.17 706.013 2510.5 661.742C2462 610.31 2427.17 546.833 2406.01 471.312C2384.52 394.164 2373.78 291.625 2373.78 163.695C2373.78 126.26 2371.18 103.637 2365.97 95.8242C2357.51 82.4779 2337.16 74.3398 2304.93 71.4102V28.9297H2555.42V71.4102C2522.54 74.6654 2501.06 81.8268 2490.97 92.8945C2481.53 102.986 2476.81 129.516 2476.81 172.484C2476.81 215.453 2477.62 258.259 2479.25 300.902C2480.88 343.22 2484.3 381.306 2489.5 415.16C2495.04 449.014 2502.69 479.451 2512.45 506.469C2522.22 533.161 2535.24 558.552 2551.52 582.641C2580.49 625.284 2629.48 674.112 2698.49 729.125C2765.55 674.438 2813.23 625.609 2841.55 582.641C2870.53 538.37 2889.73 482.868 2899.17 416.137C2906.01 366.332 2909.43 278.93 2909.43 153.93C2909.43 123.331 2905.68 103.962 2898.2 95.8242C2886.15 82.8034 2863.85 74.6654 2831.3 71.4102V28.9297H3080.81V71.4102C3049.56 75.3164 3030.19 82.6406 3022.71 93.3828C3015.87 103.148 3012.45 133.422 3012.45 184.203C3012.45 234.984 3009.85 285.603 3004.64 336.059C2999.76 386.514 2991.95 431.599 2981.2 471.312C2970.46 511.026 2956.63 546.345 2939.7 577.27C2923.1 608.194 2903.24 636.352 2880.13 661.742C2840.42 705.688 2779.87 751.423 2698.49 798.949Z" fill="#FC2779"/>
              </svg>
            </div>
            <NavigationMenu>
              <NavigationMenuList className='flex gap-4'>
                <NavigationMenuItem>
                  <Link href="#" legacyBehavior>
                    <NavigationMenuLink className={`font-medium font-body hover:text-primary hover:bg-background cursor-pointer text-md`}>
                      Categories
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`font-medium font-body hover:text-primary hover:bg-background cursor-pointer text-md`}>Brands</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[60rem] bg-background p-4">
                      <div className='w-full flex flex-col gap-4'>
                        <div className='w-full pt-4 px-4'>
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
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='flex gap-4 items-center flex-1'>
            <SearchBar/>
            {
              token === null || token === 'undefined' && (
                <Button
                onClick={() => router.push('/login')}
                className='w-32 py-[10px] px-4 bg-primary text-background rounded-md font-semibold hover:bg-secondary'
                >
                  Sign in
                </Button>
              )
            }
            <button type="button" id="header-bag-icon" className="">
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24px"
              height="24px"
              viewBox="0 0 23 20">
                  <path className="text-primaryT" fill="#fff" stroke="currentColor" d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"></path>
              </svg>
            </button>
            <button onClick={toggleDrawer} type="button" id="header-bag-icon" className="relative">
              <svg 
              width="24px" 
              height="24px" 
              viewBox="0 0 24 24" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" 
              className="css-7zhfhb"
              >
                <g id="ic-bag" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ic_bag" transform="translate(2.000000, 2.000000)"><path d="M18.5,6.15 L18.5,14.48 C18.5,15.4550796 18.1119716,16.3900771 17.4215488,17.0786238 C16.7311259,17.7671705 15.795076,18.1526569 14.82,18.1500136 L5.18,18.1500136 C4.20492401,18.1526569 3.26887407,17.7671705 2.57845124,17.0786238 C1.8880284,16.3900771 1.5,15.4550796 1.5,14.48 L1.5,6.15 L18.5,6.15 M19,4.65 L1,4.65 C0.44771525,4.65 0,5.09771525 0,5.65 L0,14.48 C0,15.8529036 0.546064795,17.1694311 1.51779176,18.1392821 C2.48951873,19.1091332 3.80709895,19.6526555 5.18,19.65 L14.82,19.65 C16.1929011,19.6526555 17.5104813,19.1091332 18.4822082,18.1392821 C19.4539352,17.1694311 20,15.8529036 20,14.48 L20,5.65 C20,5.09771525 19.5522847,4.65 19,4.65 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path><path d="M6.4,8.86 L6.4,4.19 C6.33821865,2.13719693 7.94748296,0.420648332 10,0.35 L10,0.35 C10.989402,0.378747467 11.9268069,0.799576623 12.6057792,1.51981235 C13.2847514,2.24004808 13.6496079,3.20062335 13.62,4.19 L13.62,8.86" id="Path" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="13.6" cy="8.97" r="1.1"></circle><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="6.4" cy="8.97" r="1.1"></circle></g></g>
              </svg>
              <span className="absolute -top-2 -right-4 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </button>
            <CartDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
          </div>
        </div>
        <Divider className='mt-2'/>
        <div className='mx-auto max-w-c-1390 relative mt-4 lg:px-12 2xl:px-0 flex'>
          <NavigationMenu>
            <NavigationMenuList>
            {categories.map((category, index) => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger className='bg-background hover:bg-background hover:text-primaryT'><Link target='_blank' href={`/products?category=${category.name}`}>{category.name}</Link></NavigationMenuTrigger>
              <NavigationMenuContent>
              <ul className="w-[80rem] bg-background p-4 grid grid-cols-4 gap-4">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <Link target='_blank' className='hover:text-primaryT' href={`/products?category=${category.name}&&subCategory=${subCategory.name}`}><h4 className="font-semibold mb-2">{subCategory.name}</h4></Link>
                    {subCategory.subSubCategories.length > 0 && (
                      <ul className="">
                        {subCategory.subSubCategories.map((subSubCategory) => (
                          <li key={subSubCategory.id} className="py-1 hover:text-primaryT">
                            <Link target='_blank' href={`/products?category=${category.name}&&subCategory=${subCategory.name}&&subSubCategory=${subSubCategory.name}`}>{subSubCategory.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* <!-- Hamburger Toggle BTN --> */}
      <div className='mx-4 flex lg:hidden justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <button onClick={() => setNavigationOpen(true)} type="button" className="h-[40px]" aria-label="hamburger menu">
            <svg 
            width="24px" 
            height="24px" 
            viewBox="0 0 24 24" 
            version="1.1" xmlns="http://www.w3.org/2000/svg"  
            className="css-7zhfhb"
            >
              <g id="ic-left-nav" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g id="ic_hamburger" transform="translate(3.000000, 6.000000)" stroke="#000000" stroke-width="1.5"><line x1="0.5" y1="0.53" x2="17.5" y2="0.53" id="Path"></line><line x1="0.5" y1="11.47" x2="17.5" y2="11.47" id="Path"></line><line x1="0.5" y1="6.04" x2="17.5" y2="6.04" id="Path"></line></g></g>
            </svg>
          </button>
          <div className='w-[72px]'>
            <svg viewBox="0 0 3081 923" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M386.477 725.219C484.133 725.219 561.77 694.62 619.387 633.422L643.801 666.137C600.507 725.056 535.891 762.979 449.953 779.906C422.935 785.44 394.94 788.207 365.969 788.207C309.654 788.207 258.872 778.441 213.625 758.91C168.378 739.053 129.966 712.361 98.3906 678.832C32.9609 609.496 0.246094 523.884 0.246094 421.996C0.246094 314.574 30.0312 221.964 89.6016 144.164C129.641 91.7552 181.236 54.9714 244.387 33.8125C276.288 23.3958 305.91 18.1875 333.254 18.1875C360.923 18.1875 381.268 19.0013 394.289 20.6289C407.635 22.2565 419.517 24.3724 429.934 26.9766C440.35 29.5807 449.628 32.5104 457.766 35.7656C466.229 38.6953 475.344 41.7878 485.109 45.043C511.802 54.1576 533.286 58.7148 549.562 58.7148C565.839 58.7148 583.579 45.3685 602.785 18.6758H649.66L584.719 277.465H538.332C539.96 252.4 540.773 234.822 540.773 224.73C540.773 203.246 538.169 184.366 532.961 168.09C528.078 151.488 519.615 137.328 507.57 125.609C495.526 113.891 481.203 103.962 464.602 95.8242C431.398 79.5482 394.777 71.4102 354.738 71.4102C315.025 71.4102 280.845 79.3854 252.199 95.3359C223.879 111.286 199.953 133.096 180.422 160.766C143.638 213.826 121.665 285.928 114.504 377.074H429.445L416.262 432.25H113.039C116.294 508.096 141.359 574.503 188.234 631.469C239.992 693.969 306.073 725.219 386.477 725.219ZM718.996 735.473L740.969 732.543C769.94 727.986 787.844 723.428 794.68 718.871C807.049 710.733 813.234 695.596 813.234 673.461V15.2578L854.738 0.609375L1335.21 605.102V147.582C1335.21 116.332 1328.7 95.987 1315.68 86.5469C1305.91 79.3854 1280.85 74.0143 1240.48 70.4336V28.9297H1498.29V70.4336C1481.04 72.3867 1466.72 74.3398 1455.32 76.293C1443.93 77.9206 1434.82 81.1758 1427.98 86.0586C1415.61 94.8477 1409.43 114.867 1409.43 146.117V787.719L1371.34 798.949L887.453 190.062V658.324C887.453 686.319 893.964 705.199 906.984 714.965C916.424 721.801 931.887 726.846 953.371 730.102C974.855 733.031 987.714 734.822 991.945 735.473V776H718.996V735.473ZM1974.86 71.4102V28.9297H2227.3V71.4102C2198.33 74.9909 2173.26 86.8724 2152.1 107.055C2144.94 113.891 2137.45 121.866 2129.64 130.98L1931.4 389.77L2318.61 895.141L2285.4 922.973L1812.75 422.484L2012.94 155.883C2035.73 129.841 2047.12 109.333 2047.12 94.3594C2047.12 79.0599 2023.03 71.4102 1974.86 71.4102ZM1578.86 735.473L1595.95 733.031C1625.57 729.125 1643.31 723.754 1649.17 716.918C1655.36 710.082 1659.26 701.456 1660.89 691.039C1662.52 680.297 1663.33 665.486 1663.33 646.605V157.348C1663.33 120.238 1659.43 98.1029 1651.61 90.9414C1644.13 83.7799 1634.69 79.2227 1623.29 77.2695C1612.23 74.9909 1597.41 73.0378 1578.86 71.4102V28.9297H1846.93V71.4102C1828.05 73.0378 1812.91 74.8281 1801.52 76.7812C1790.45 78.4089 1781.98 81.9896 1776.12 87.5234C1770.27 93.0573 1766.52 101.195 1764.89 111.938C1763.27 122.68 1762.45 137.816 1762.45 157.348V646.605C1762.45 683.064 1765.71 704.874 1772.22 712.035C1779.05 719.197 1787.19 723.917 1796.63 726.195C1806.4 728.148 1819.58 730.264 1836.18 732.543L1857.18 735.473V776H1578.86V735.473ZM2698.49 798.949C2614.83 751.749 2552.17 706.013 2510.5 661.742C2462 610.31 2427.17 546.833 2406.01 471.312C2384.52 394.164 2373.78 291.625 2373.78 163.695C2373.78 126.26 2371.18 103.637 2365.97 95.8242C2357.51 82.4779 2337.16 74.3398 2304.93 71.4102V28.9297H2555.42V71.4102C2522.54 74.6654 2501.06 81.8268 2490.97 92.8945C2481.53 102.986 2476.81 129.516 2476.81 172.484C2476.81 215.453 2477.62 258.259 2479.25 300.902C2480.88 343.22 2484.3 381.306 2489.5 415.16C2495.04 449.014 2502.69 479.451 2512.45 506.469C2522.22 533.161 2535.24 558.552 2551.52 582.641C2580.49 625.284 2629.48 674.112 2698.49 729.125C2765.55 674.438 2813.23 625.609 2841.55 582.641C2870.53 538.37 2889.73 482.868 2899.17 416.137C2906.01 366.332 2909.43 278.93 2909.43 153.93C2909.43 123.331 2905.68 103.962 2898.2 95.8242C2886.15 82.8034 2863.85 74.6654 2831.3 71.4102V28.9297H3080.81V71.4102C3049.56 75.3164 3030.19 82.6406 3022.71 93.3828C3015.87 103.148 3012.45 133.422 3012.45 184.203C3012.45 234.984 3009.85 285.603 3004.64 336.059C2999.76 386.514 2991.95 431.599 2981.2 471.312C2970.46 511.026 2956.63 546.345 2939.7 577.27C2923.1 608.194 2903.24 636.352 2880.13 661.742C2840.42 705.688 2779.87 751.423 2698.49 798.949Z" fill="#FC2779"/>
            </svg>
          </div>
        </div>
        <div className='flex gap-8'>
          <button onClick={toggleDrawer} type="button" id="header-bag-icon" className="relative">
            <svg 
            width="24px" 
            height="24px" 
            viewBox="0 0 24 24" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            className="css-7zhfhb"
            >
              <g id="ic-bag" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ic_bag" transform="translate(2.000000, 2.000000)"><path d="M18.5,6.15 L18.5,14.48 C18.5,15.4550796 18.1119716,16.3900771 17.4215488,17.0786238 C16.7311259,17.7671705 15.795076,18.1526569 14.82,18.1500136 L5.18,18.1500136 C4.20492401,18.1526569 3.26887407,17.7671705 2.57845124,17.0786238 C1.8880284,16.3900771 1.5,15.4550796 1.5,14.48 L1.5,6.15 L18.5,6.15 M19,4.65 L1,4.65 C0.44771525,4.65 0,5.09771525 0,5.65 L0,14.48 C0,15.8529036 0.546064795,17.1694311 1.51779176,18.1392821 C2.48951873,19.1091332 3.80709895,19.6526555 5.18,19.65 L14.82,19.65 C16.1929011,19.6526555 17.5104813,19.1091332 18.4822082,18.1392821 C19.4539352,17.1694311 20,15.8529036 20,14.48 L20,5.65 C20,5.09771525 19.5522847,4.65 19,4.65 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path><path d="M6.4,8.86 L6.4,4.19 C6.33821865,2.13719693 7.94748296,0.420648332 10,0.35 L10,0.35 C10.989402,0.378747467 11.9268069,0.799576623 12.6057792,1.51981235 C13.2847514,2.24004808 13.6496079,3.20062335 13.62,4.19 L13.62,8.86" id="Path" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="13.6" cy="8.97" r="1.1"></circle><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="6.4" cy="8.97" r="1.1"></circle></g></g>
            </svg>
            <span className="absolute -top-2 -right-4 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </button>
          <CartDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
          <button type="button" aria-label="Kebab menu" className="css-n3ntp6">
            <svg 
            width="24px" 
            height="24px" 
            viewBox="0 0 24 24" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            className="css-7zhfhb"
            >
              <g id="ic-account" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ic_account" transform="translate(4.000000, 3.000000)"><path d="M4.71,4.3 L4.71,4.19 C4.71,2.37298317 6.18298317,0.9 8,0.9 C9.81701683,0.9 11.29,2.37298317 11.29,4.19 L11.29,4.29 C11.29,6.10701683 9.81701683,7.58 8,7.58 C6.18298317,7.58 4.71,6.10701683 4.71,4.29 L4.71,4.3 Z" id="Path" stroke="#000000" stroke-width="1.5"></path><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="15.65" cy="18.06" r="1"></circle><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="11.77" cy="18.06" r="1"></circle><circle id="Oval" fill="#000000" fill-rule="nonzero" cx="7.88" cy="18.06" r="1"></circle><path d="M4.16,18.24 L1,18.24 C0.785174643,18.24 0.579147974,18.154661 0.427243507,18.0027565 C0.275339041,17.850852 0.189892462,17.6448254 0.189892462,17.43 L0.189892462,15.52 C0.182015162,14.4007779 0.618981212,13.3242274 1.40476473,12.5271916 C2.19054824,11.7301558 3.26077754,11.2779283 4.38,11.27 L11.69,11.27 C13.7812854,11.2805307 15.5462056,12.8280332 15.83,14.9" id="Path" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></g>
            </svg>
          </button>
        </div>
      </div>
      <div className='flex items-center mx-4 mt-2 lg:hidden'>
        <SearchBar/>
      </div>
      <Sidebar isOpen={navigationOpen} setIsOpen={setNavigationOpen} categories={categories} brands={brands}/>
          {/* <!-- Hamburger Toggle BTN --> */}
    </div>
  )
}

export default Nav