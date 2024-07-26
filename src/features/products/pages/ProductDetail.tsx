'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/models/product';
import { Separator } from '@/components/ui/separator';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
  

const ProductDetail: React.FC<{product: Product}> = ({product}) => {

  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='mx-auto max-w-c-1390 py-4 w-full lg:px-12 2xl:px-0'>
        <div className='w-full'>
            <div className='mx-0 xl:mx-12'>
                <div className='flex py-4 px-4'>
                    <div className='flex'>
                        <p>{"Home"}</p>
                        <NavigateNextIcon/>
                    </div>
                    <div className='flex'>
                        <p>{product.category?.name}</p>
                        <NavigateNextIcon/>
                    </div>
                    <div className='flex'>
                        <p>{product.subCategory?.name}</p>
                        <NavigateNextIcon/>
                    </div>
                    <div className='flex'>
                        <p>{product.subSubCategory?.name}</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-5 lg:gap-4 bg-background rounded-md'>
                    <div className='w-full xl:col-span-2 flex gap-8'>
                        <div className='flex flex-col gap-4 lg:ml-2 lg:mt-8'>
                            <button className='hidden text-primaryT self-end lg:block'>
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="28"
                                height="28"
                                viewBox="0 0 23 20">
                                    <path className="text-primaryT self-end" fill="#fff" stroke="currentColor" d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"></path>
                                </svg>
                            </button>
                            <div className='flex flex gap-8'>
                                {/* Desktop Thumbnails */}
                                <div className='hidden lg:flex lg:flex-col lg:gap-2'>
                                    {product.images && product.images.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className={`border-2 ${selectedImage === index ? 'border-secondaryT' : ''}`} 
                                        onMouseEnter={() => setSelectedImage(index)} 
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image} className='h-[50px] w-auto' alt=''/>
                                    </div>
                                    ))}
                                </div>

                                {/* Mobile Carousel */}
                                <div className='lg:hidden w-full'>
                                    <Carousel 
                                    showThumbs={false} 
                                    selectedItem={selectedImage} 
                                    onChange={(index) => setSelectedImage(index)}
                                    showIndicators={true}
                                    showStatus={false}
                                    useKeyboardArrows={true}
                                    >
                                    {product.images && product.images.map((image, index) => (
                                        <div key={index} className='mb-14 mx-10'>
                                            <img src={image} className='w-full h-auto object-cover' alt='' />
                                        </div>
                                    ))}
                                    </Carousel>
                                </div>

                                {/* Selected Image for Desktop */}
                                <div className='w-full hidden lg:block '>
                                    <img 
                                    src={product?.images?.[selectedImage]} 
                                    className='w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-125' 
                                    alt='' 
                                    />
                                </div>
                            </div>
                        </div>
                        <Separator className='hidden lg:block' orientation='vertical'/>
                    </div>
                    <div className='col-span-3 relative my-8 lg:mt-8'>
                        <div className='mx-4 flex flex-col gap-4'>
                            <p className='text-lg font-normal lg:text-[23px] lg:font-medium lg:leading-relaxed'>{product.name}</p>
                            <p className='text-2xl font-semibold lg:text-3xl lg:font-semibold'>{`ETB ${product.price}`}</p>
                            <Button className='hidden lg:block mt-4 w-min'>Add to Bag</Button>
                        </div>
                        <div className='hidden absolute bottom-0 left-0 w-full bg-primary lg-block'>
                            <p>100% Genuine Products</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='w-full mt-8 flex gap-2 p-4 bg-background lg:hidden'>
                <div className='flex items-center gap-2 p-2 border-2 flex-1 rounded-sm'>
                    <div className='w-[24px] h-[24px]'>
                    <svg viewBox="0 0 24 24"><path d="M20.12 18.1201L18 14.5194C18.9138 13.39 19.4885 12.0257 19.6577 10.5842C19.8269 9.14273 19.5837 7.68293 18.9561 6.37352C18.3286 5.06411 17.3424 3.95855 16.1114 3.18462C14.8805 2.4107 13.4551 2 12 2C10.5449 2 9.11954 2.4107 7.8886 3.18462C6.65766 3.95855 5.67143 5.06411 5.04389 6.37352C4.41635 7.68293 4.17311 9.14273 4.34231 10.5842C4.5115 12.0257 5.08621 13.39 6.00001 14.5194L3.89001 18.1101C3.79999 18.2615 3.75176 18.434 3.75022 18.6101C3.74868 18.7861 3.79388 18.9594 3.88123 19.1124C3.96858 19.2654 4.09497 19.3926 4.24756 19.481C4.40015 19.5695 4.5735 19.6162 4.75001 19.6162H6.94001L8.00001 21.5013C8.08811 21.6535 8.21498 21.7798 8.36775 21.8674C8.52053 21.9549 8.6938 22.0007 8.87001 22C9.04622 22.0007 9.21949 21.9549 9.37226 21.8674C9.52504 21.7798 9.6519 21.6535 9.74001 21.5013L12 17.6513L14.23 21.5013C14.3181 21.6535 14.445 21.7798 14.5978 21.8674C14.7505 21.9549 14.9238 22.0007 15.1 22C15.2762 22.0007 15.4495 21.9549 15.6023 21.8674C15.755 21.7798 15.8819 21.6535 15.97 21.5013L17.06 19.6162H19.25C19.4259 19.6169 19.5988 19.5713 19.7514 19.484C19.904 19.3968 20.0308 19.2709 20.119 19.1192C20.2073 18.9675 20.2538 18.7952 20.254 18.6198C20.2542 18.4443 20.2079 18.272 20.12 18.1201ZM5.79001 9.74181C5.79011 8.77822 6.01561 7.82794 6.44859 6.96653C6.88156 6.10513 7.51007 5.35636 8.28412 4.77978C9.05818 4.20319 9.95643 3.81468 10.9075 3.64516C11.8585 3.47563 12.836 3.52975 13.7624 3.80322C14.6888 4.07669 15.5384 4.56196 16.2437 5.22046C16.9491 5.87895 17.4906 6.69249 17.8253 7.5964C18.1601 8.50031 18.2788 9.46964 18.1719 10.4273C18.0651 11.385 17.7357 12.3046 17.21 13.1131C16.8769 13.6318 16.4692 14.0989 16 14.4995C14.8856 15.426 13.4808 15.9335 12.03 15.9335C10.5792 15.9335 9.17437 15.426 8.06001 14.4995C7.58019 14.1011 7.1623 13.6338 6.82001 13.1131C6.15504 12.1132 5.79707 10.9416 5.79001 9.74181ZM8.90001 20.0052L8.24001 18.8681L7.81001 18.1201H5.62001L7.05001 15.6365C8.03795 16.4617 9.21702 17.0274 10.48 17.2822L8.90001 20.0052ZM16.19 18.1201L15.76 18.8681L15.1 20.0052L13.52 17.2822C14.8006 17.0353 15.9978 16.4691 17 15.6365L18.43 18.1201H16.19Z" fill="#001325" fill-opacity="0.92"></path><path d="M11.17 12.4049C10.91 12.4049 10.91 12.4049 8.54001 10.5996C8.46187 10.5393 8.3964 10.4643 8.34733 10.3788C8.29826 10.2933 8.26655 10.1991 8.25401 10.1013C8.24148 10.0036 8.24836 9.90441 8.27427 9.80935C8.30017 9.71429 8.3446 9.62525 8.40501 9.54732C8.52701 9.38992 8.7067 9.28731 8.90455 9.26206C9.00252 9.24956 9.10199 9.25642 9.1973 9.28226C9.2926 9.3081 9.38187 9.35242 9.46001 9.41267L11.1 10.6694L14.47 7.29816C14.6106 7.15807 14.8013 7.07939 15 7.07939C15.1988 7.07939 15.3894 7.15807 15.53 7.29816C15.6705 7.43842 15.7493 7.62855 15.7493 7.82679C15.7493 8.02502 15.6705 8.21515 15.53 8.35541L11.7 12.1855C11.6318 12.2568 11.5495 12.3132 11.4582 12.351C11.367 12.3888 11.2688 12.4071 11.17 12.4049Z" fill="#001325" fill-opacity="0.92"></path></svg>
                    </div>
                    <div>
                        <p className='text-[12px] text-primary font-bold'>100% Authentic</p>
                        <p className='text-[10px]'>view certificate</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 p-2 border-2 flex-1 rounded-sm'>
                    <div className='w-[24px] h-[24px]'>
                    <svg viewBox="0 0 24 24"><title></title><path d="M10.955 7.85717C11.1711 8.08123 11.1646 8.43806 10.9406 8.65417L10.087 9.47742H12.3639C12.8391 9.45326 13.314 9.5328 13.7556 9.7106C14.2022 9.89044 14.6038 10.1664 14.9318 10.5189C15.2598 10.8714 15.5062 11.2918 15.6534 11.7502C15.8007 12.2086 15.8452 12.6938 15.7839 13.1714C15.7808 13.1958 15.776 13.2199 15.7698 13.2437C15.5636 14.0232 15.0955 14.7079 14.4441 15.183C13.7968 15.655 13.0076 15.8914 12.2077 15.8532H9.44969C9.13839 15.8532 8.88603 15.6008 8.88603 15.2895C8.88603 14.9782 9.13839 14.7259 9.44969 14.7259H12.2218C12.2315 14.7259 12.2413 14.7261 12.2511 14.7266C12.7978 14.7551 13.3376 14.5946 13.7799 14.2721C14.2121 13.9569 14.5255 13.5056 14.6702 12.9913C14.7037 12.6897 14.6731 12.3842 14.5802 12.095C14.4835 11.7941 14.3218 11.5182 14.1065 11.2868C13.8912 11.0555 13.6277 10.8744 13.3345 10.7563C13.0414 10.6383 12.7258 10.5862 12.4103 10.6038C12.3998 10.6044 12.3893 10.6047 12.3788 10.6047H10.0964L10.8985 11.4321C11.1152 11.6556 11.1097 12.0124 10.8862 12.2291C10.6627 12.4458 10.3058 12.4403 10.0892 12.2168L8.32427 10.3965C8.22003 10.2889 8.16286 10.1444 8.16537 9.99465C8.16789 9.84493 8.22987 9.70235 8.33766 9.5984L10.158 7.84275C10.3821 7.62665 10.7389 7.6331 10.955 7.85717Z" fill="#001325" fill-opacity="0.92"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM4.38604 12C4.38604 7.79492 7.79492 4.38604 12 4.38604C16.2051 4.38604 19.614 7.79492 19.614 12C19.614 16.2051 16.2051 19.614 12 19.614C7.79492 19.614 4.38604 16.2051 4.38604 12Z" fill="#001325" fill-opacity="0.92"></path></svg>
                    </div>
                    <div>
                        <p className='text-[12px] text-primary font-bold'>Easy return policy</p>
                        <p className='text-[10px]'>view policy</p>
                    </div>
                </div>
            </div>
            <div className='lg:mx-12 mt-8'>
                <p className='text-xl font-semibold mb-4 mx-4 lg:mx-0'>Product Description</p>
                <div className='flex gap-8'>
                    <div className='w-full'>
                        <Box sx={{ width: '100%', backgroundColor: "#FFFFFF" }}>
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
                                label="Description"
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
                                label="Ingredients"
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
                                label="How To Use"
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
                            <div>
                            {value === 0 ? (
                                <div className='p-4' dangerouslySetInnerHTML={{ __html: product.description }} />
                            ) : value === 1 ? (
                                <div className='p-4' dangerouslySetInnerHTML={{ __html: product.ingredients }} />
                            ) : (
                                <div className='p-4' dangerouslySetInnerHTML={{ __html: product.howToUse }} />
                            )}
                            </div>
                        </Box>
                    </div>
                    <div className='hidden bg-background sticky top-4 w-1/4 h-min p-4 border rounded lg:flex flex-col items-center justify-center gap-4'>
                        <div className='relative w-full h-64 mx-10 px-10'>
                            <Image src={product.imageUrl} layout="fill" alt={product.name} />
                        </div>
                        <p className='text-md text-center font-normal mb-2'>{product.name}</p>
                        <p className='text-lg text-center font-semibold text-primary mb-4'>{`ETB ${product.price}`}</p>
                        <button className='bg-primary text-white py-2 px-4 rounded'>Add to Bag</button>
                    </div>
                </div>
            </div>
            <div className='flex bg-background rounded-md p-4 gap-4 mt-8 xl:hidden sticky bottom-0 shadow-soft'>
                <Button variant={'outline'} className='w-1/4'>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24"
                    height="24"
                    viewBox="0 0 23 20">
                        <path className="text-primaryT self-end" fill="#fff" stroke="currentColor" d="M11.4967297,19.0021565 C12.1501607,18.4744665 15.7313591,16.1461023 16.6556949,15.4660553 C20.4639993,12.6642314 22.5,9.83806845 22.500204,6.31427989 C22.4080534,3.08900922 19.7336922,0.5 16.5,0.5 C14.6798666,0.5 13.0132876,1.30878098 11.8904344,2.71234752 L11.5,3.20039053 L11.1095656,2.71234752 C9.98671236,1.30878098 8.32013337,0.5 6.5,0.5 C3.16873226,0.5 0.5,3.08355995 0.5,6.3 C0.5,9.87466924 2.55294628,12.7216506 6.38828771,15.5301224 C7.34346545,16.229562 10.7334347,18.4195137 11.4967297,19.0021565 Z"></path>
                    </svg>
                </Button>
                <Button className='w-full flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><g fill="none" fill-rule="evenodd"><path d="M21 23H-3V-1h24z"></path><path fill="#fff" fill-rule="nonzero" d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"></path></g></svg>
                    Add to Bag
                </Button>
            </div>
        </div>
        
    </div>
  );
};

export default ProductDetail;
