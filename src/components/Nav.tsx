"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SearchBar from "./SearchBar";
import { Divider } from "@mui/material";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { Category } from "../models/category";
import { Button } from "./ui/button";
import CartDrawer from "../features/cart/components/CartDrawer";
import useCart from "@/features/cart/hooks/useCart";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DropDownUser } from "./DropdownUser";
import Image from "next/image";

interface NavProps {
  categories: Category[];
}

const Nav: React.FC<NavProps> = ({ categories }) => {
  const router = useRouter();
  const {
    token,
    setCartDrawerOpen,
    setMobileNavbarOpen,
    cartDrawerOpen,
    mobileNavBarOpen,
  } = useAuth();
  // State to manage the cart drawer's open state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // State to manage which menu is currently open (null if none)
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Ref to track the container of the NavigationMenu, used for click outside
    const navigationMenuRef = useRef<HTMLDivElement>(null);

  const { itemCount } = useCart();
  const [isClient, setIsClient] = useState(false); // This is new state
  // Function to toggle the cart drawer's open state
  const toggleDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

    // Function to toggle the sidebar open state
  const toggleNavDrawer = () => {
    setMobileNavbarOpen(!mobileNavBarOpen);
  };


    // Function to open the menu on hover
    const handleMenuOpen = (categoryId: string) => {
        setOpenMenu(categoryId);
    };

    // Function to close the menu
    const handleMenuClose = () => {
        setOpenMenu(null);
    };

    // Function to close the category menu when the category is clicked again
     const handleCategoryClick = (categoryId:string) => {
        if(openMenu === categoryId) {
           setOpenMenu(null)
        }
     }

    // Effect to handle clicks outside of the menu, this close the menu
    useEffect(() => {
      setIsClient(true) // set isClient to true after mounting
        const handleClickOutside = (event: MouseEvent) => {
            if (navigationMenuRef.current && !navigationMenuRef.current.contains(event.target as Node)) {
               setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navigationMenuRef]);

  return (
    <div className={`bg-white sticky top-0 z-40 w-full py-2`}>
      <div className='w-full hidden lg:block'>
        <div className='mx-auto container flex py-0 w-full justify-between items-center relative 2xl:px-0'>
          <Link className='z-50' href={"/"}>
            <div className='flex items-center gap-10 relative z-50'>
              <div className='w-16'>
              <Image 
                  src='/logo/pixel-logo.png' 
                  alt='Logo'
                  width={64} // specify width
                  height={64} // specify height
                  className='w-full h-auto'
                />
              </div>
            </div>
          </Link>
          <div className='flex gap-4 items-center w-3/4'>
            <SearchBar/>
             {/* Show placeholders or no content initially */}
                {isClient ? (
              (token === null || token === undefined) ? (
                <Button
                onClick={() => router.push('/login')}
                className='w-32 py-[10px] px-4 bg-primary text-background rounded-md font-semibold hover:bg-secondary'
                >
                  Sign in
                </Button>
              ) :
              (
              <DropDownUser/>
              )
           ) : null}
           
            <button onClick={toggleDrawer} type="button" id="header-bag-icon" className="relative">
              <svg 
              width="24px" 
              height="24px" 
              viewBox="0 0 24 24" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" 
              className="css-7zhfhb"
              >
                <g
                  id="ic-bag"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="ic_bag" transform="translate(2.000000, 2.000000)">
                    <path
                      d="M18.5,6.15 L18.5,14.48 C18.5,15.4550796 18.1119716,16.3900771 17.4215488,17.0786238 C16.7311259,17.7671705 15.795076,18.1526569 14.82,18.1500136 L5.18,18.1500136 C4.20492401,18.1526569 3.26887407,17.7671705 2.57845124,17.0786238 C1.8880284,16.3900771 1.5,15.4550796 1.5,14.48 L1.5,6.15 L18.5,6.15 M19,4.65 L1,4.65 C0.44771525,4.65 0,5.09771525 0,5.65 L0,14.48 C0,15.8529036 0.546064795,17.1694311 1.51779176,18.1392821 C2.48951873,19.1091332 3.80709895,19.6526555 5.18,19.65 L14.82,19.65 C16.1929011,19.6526555 17.5104813,19.1091332 18.4822082,18.1392821 C19.4539352,17.1694311 20,15.8529036 20,14.48 L20,5.65 C20,5.09771525 19.5522847,4.65 19,4.65 Z"
                      id="Shape"
                      fill="#000000"
                      fillRule="nonzero"
                    ></path>
                    <path
                      d="M6.4,8.86 L6.4,4.19 C6.33821865,2.13719693 7.94748296,0.420648332 10,0.35 L10,0.35 C10.989402,0.378747467 11.9268069,0.799576623 12.6057792,1.51981235 C13.2847514,2.24004808 13.6496079,3.20062335 13.62,4.19 L13.62,8.86"
                      id="Path"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <circle
                      id="Oval"
                      fill="#000000"
                      fillRule="nonzero"
                      cx="13.6"
                      cy="8.97"
                      r="1.1"
                    ></circle>
                    <circle
                      id="Oval"
                      fill="#000000"
                      fillRule="nonzero"
                      cx="6.4"
                      cy="8.97"
                      r="1.1"
                    ></circle>
                  </g>
                </g>
              </svg>
              <span className="absolute -top-2 -right-4 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </button>
            <CartDrawer isOpen={cartDrawerOpen} onClose={toggleDrawer} />
          </div>
        </div>
        <Divider className="mt-2" />
        <div className="mx-auto container relative mt-2 flex px-10" ref={navigationMenuRef}>
          <NavigationMenu>
            <NavigationMenuList>
              {categories.map((category, index) => (
                <NavigationMenuItem key={category.id}>
                  {/* Added onMouseEnter to open the menu and onClick to close the menu */}
                   <NavigationMenuTrigger
                      onMouseEnter={() => handleMenuOpen(category.id)}
                       onClick={() => handleCategoryClick(category.id)}
                      className="font-medium bg-background hover:bg-background hover:text-primaryT"
                    >
                    <Link
                      href={`/products?category=${category.name}&&categoryId=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  </NavigationMenuTrigger>
                  {/* Conditionally display the menu content based on openMenu */}
                  <NavigationMenuContent
                    className={openMenu === category.id ? 'block' : 'hidden'}
                  >
                    <ul className="w-[80rem] bg-background p-4 grid grid-cols-4 gap-4">
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory.id}>
                          <Link
                            className="hover:text-primaryT"
                            href={`/products?category=${category.name}&&categoryId=${category.id}&&subCategory=${subCategory.name}`}
                            //call handleMenuClose when the user click on a subcategory link
                             onClick={handleMenuClose}
                          >
                            <h4 className="font-semibold mb-2">
                              {subCategory.name}
                            </h4>
                          </Link>
                          {subCategory.subSubCategories.length > 0 && (
                            <ul className="">
                              {subCategory.subSubCategories.map(
                                (subSubCategory) => (
                                  <li
                                    key={subSubCategory.id}
                                    className="py-1 hover:text-primaryT"
                                  >
                                    <Link
                                      href={`/products?category=${category.name}&&categoryId=${category.id}&&subCategory=${subCategory.name}&&subSubCategory=${subSubCategory.name}`}
                                        //call handleMenuClose when the user click on a subsubcategory link
                                      onClick={handleMenuClose}
                                    >
                                      {subSubCategory.name}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <Link className="hover:text-primaryT" href={`/blogs`}>
                <h4 className="">Blog</h4>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* <!-- Hamburger Toggle BTN --> */}
      <div className="mx-4 flex lg:hidden justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setMobileNavbarOpen(true)}
            type="button"
            className="h-[40px]"
            aria-label="hamburger menu"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="css-7zhfhb"
            >
              <g
                id="ic-left-nav"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g
                  id="ic_hamburger"
                  transform="translate(3.000000, 6.000000)"
                  stroke="#000000"
                  strokeWidth="1.5"
                >
                  <line x1="0.5" y1="0.53" x2="17.5" y2="0.53" id="Path"></line>
                  <line
                    x1="0.5"
                    y1="11.47"
                    x2="17.5"
                    y2="11.47"
                    id="Path"
                  ></line>
                  <line x1="0.5" y1="6.04" x2="17.5" y2="6.04" id="Path"></line>
                </g>
              </g>
            </svg>
          </button>
          <Link className='z-50' href={"/"}>
            <div className='w-[72px]'>
            <Image 
                src='/logo/pixel-logo.png'  // Use absolute path
                alt='Logo'
                width={72} // specify width
                height={72} // specify height
                className='w-full h-auto'
              />
            </div>
          </Link>
        </div>
        <div className="flex gap-8">
          <button
            onClick={toggleDrawer}
            type="button"
            id="header-bag-icon"
            className="relative"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="css-7zhfhb"
            >
              <g
                id="ic-bag"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="ic_bag" transform="translate(2.000000, 2.000000)">
                  <path
                    d="M18.5,6.15 L18.5,14.48 C18.5,15.4550796 18.1119716,16.3900771 17.4215488,17.0786238 C16.7311259,17.7671705 15.795076,18.1526569 14.82,18.1500136 L5.18,18.1500136 C4.20492401,18.1526569 3.26887407,17.7671705 2.57845124,17.0786238 C1.8880284,16.3900771 1.5,15.4550796 1.5,14.48 L1.5,6.15 L18.5,6.15 M19,4.65 L1,4.65 C0.44771525,4.65 0,5.09771525 0,5.65 L0,14.48 C0,15.8529036 0.546064795,17.1694311 1.51779176,18.1392821 C2.48951873,19.1091332 3.80709895,19.6526555 5.18,19.65 L14.82,19.65 C16.1929011,19.6526555 17.5104813,19.1091332 18.4822082,18.1392821 C19.4539352,17.1694311 20,15.8529036 20,14.48 L20,5.65 C20,5.09771525 19.5522847,4.65 19,4.65 Z"
                    id="Shape"
                    fill="#000000"
                    fillRule="nonzero"
                  ></path>
                  <path
                    d="M6.4,8.86 L6.4,4.19 C6.33821865,2.13719693 7.94748296,0.420648332 10,0.35 L10,0.35 C10.989402,0.378747467 11.9268069,0.799576623 12.6057792,1.51981235 C13.2847514,2.24004808 13.6496079,3.20062335 13.62,4.19 L13.62,8.86"
                    id="Path"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <circle
                    id="Oval"
                    fill="#000000"
                    fillRule="nonzero"
                    cx="13.6"
                    cy="8.97"
                    r="1.1"
                  ></circle>
                  <circle
                    id="Oval"
                    fill="#000000"
                    fillRule="nonzero"
                    cx="6.4"
                    cy="8.97"
                    r="1.1"
                  ></circle>
                </g>
              </g>
            </svg>
            <span className="absolute -top-0 -right-3 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </button>
          <CartDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
           {/* Show placeholders or no content initially */}
              {isClient ? (
                (token === null || token === undefined) ? (
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-32 py-[10px] px-4 bg-primary text-background rounded-md font-semibold hover:bg-secondary"
                  >
                    Sign in
                  </Button>
                ) : (
                  <DropDownUser />
                )
                ) : null }
        </div>
      </div>

      <div className="flex items-center mx-4 mt-2 lg:hidden">
        <SearchBar />
      </div>

      <Sidebar
        isOpen={mobileNavBarOpen}
        setIsOpen={toggleNavDrawer}
        categories={categories}
      />
    </div>
  );
};

export default Nav;