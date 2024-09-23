`use client`
import React, { SetStateAction, useState } from 'react';
import { Drawer } from '@mui/material';
import { Button } from '@/components/ui/button';
import { FilterModel } from '../api/productApi';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  onItemSelected: (id: number) => void
  filters: FilterModel[] | undefined,
  selectedFilters: number[]
  setSelectedFilters: React.Dispatch<SetStateAction<number[]>>;
}

const FilterDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onItemSelected, filters, selectedFilters, setSelectedFilters }) => {
  const [selectedFilterIds, setSelectedFilterIds] = useState<number[]>(selectedFilters)
  const [selectedFilter, setSelectedFilter] = useState<number>(0)

  const handleFilterChange = (filterId: number) => {
    const updatedFilters = selectedFilterIds.includes(filterId)
      ? selectedFilterIds.filter(id => id !== filterId) // Remove filterId
      : [...selectedFilterIds, filterId]; // Add filterId

      setSelectedFilterIds(updatedFilters);
  };

 return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={() => onClose(false)}
      classes={{ paper: 'w-full h-full bg-[#f3f3f3]' }}
    >
      <div className="relative h-full flex flex-col relative">
        <div className='flex justify-between items-center p-4 bg-[#FFD1DF] fixed top-0 w-full z-50'>
            <div onClick={() => onClose(false)} className="flex items-center cursor-pointer mr-2 gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.92"><path d="M21.51 11.2108H5.42L10.93 5.71079C11.0237 5.61783 11.0981 5.50723 11.1489 5.38537C11.1997 5.26351 11.2258 5.1328 11.2258 5.00079C11.2258 4.86878 11.1997 4.73808 11.1489 4.61622C11.0981 4.49436 11.0237 4.38376 10.93 4.29079C10.7426 4.10454 10.4892 4 10.225 4C9.96081 4 9.70736 4.10454 9.52 4.29079L2.3 11.5008C2.20551 11.5934 2.13034 11.7039 2.07885 11.8257C2.02735 11.9476 2.00055 12.0785 2 12.2108C2.00055 12.3431 2.02735 12.474 2.07885 12.5959C2.13034 12.7177 2.20551 12.8282 2.3 12.9208L9.51 20.1308C9.6983 20.3191 9.9537 20.4249 10.22 20.4249C10.4863 20.4249 10.7417 20.3191 10.93 20.1308C11.1183 19.9425 11.2241 19.6871 11.2241 19.4208C11.2241 19.1545 11.1183 18.8991 10.93 18.7108L5.43 13.2108H21.51C21.7752 13.2108 22.0296 13.1054 22.2171 12.9179C22.4046 12.7304 22.51 12.476 22.51 12.2108C22.51 11.9456 22.4046 11.6912 22.2171 11.5037C22.0296 11.3161 21.7752 11.2108 21.51 11.2108Z" fill="black"></path></g></svg>
              <p className='text-black text-lg'>Filters</p>
            </div>
          {/* <div className="flex items-center cursor-pointer">
          </div> */}
          <div onClick={() => setSelectedFilterIds([])} className="flex items-center cursor-pointer mr-2 gap-2">
            {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.92"><path d="M21.51 11.2108H5.42L10.93 5.71079C11.0237 5.61783 11.0981 5.50723 11.1489 5.38537C11.1997 5.26351 11.2258 5.1328 11.2258 5.00079C11.2258 4.86878 11.1997 4.73808 11.1489 4.61622C11.0981 4.49436 11.0237 4.38376 10.93 4.29079C10.7426 4.10454 10.4892 4 10.225 4C9.96081 4 9.70736 4.10454 9.52 4.29079L2.3 11.5008C2.20551 11.5934 2.13034 11.7039 2.07885 11.8257C2.02735 11.9476 2.00055 12.0785 2 12.2108C2.00055 12.3431 2.02735 12.474 2.07885 12.5959C2.13034 12.7177 2.20551 12.8282 2.3 12.9208L9.51 20.1308C9.6983 20.3191 9.9537 20.4249 10.22 20.4249C10.4863 20.4249 10.7417 20.3191 10.93 20.1308C11.1183 19.9425 11.2241 19.6871 11.2241 19.4208C11.2241 19.1545 11.1183 18.8991 10.93 18.7108L5.43 13.2108H21.51C21.7752 13.2108 22.0296 13.1054 22.2171 12.9179C22.4046 12.7304 22.51 12.476 22.51 12.2108C22.51 11.9456 22.4046 11.6912 22.2171 11.5037C22.0296 11.3161 21.7752 11.2108 21.51 11.2108Z" fill="white"></path></g></svg> */}
            <p className='text-primary text-lg'>Clear All</p>
          </div>
        </div>
        <div className='w-full flex h-full gap-2 px-2 py-16'>
          <div className='w-full h-full flex flex-col gap-2 overflow-auto'>
            {
              (filters && filters.length > 0) && filters.map((filter, index) => (
                <div key={index} className={`py-4 px-2 rounded-md cursor-pointer relative ${selectedFilter === index ? "bg-[#FFD1DF] text-black" : "bg-background text-black" }`} onClick={() => setSelectedFilter(index)}>
                  <p className='text-lg'>{filter.name}</p>
                  <p className={`absolute top-2 right-2 ${selectedFilter === index ? "text-black" : "text-primary" }`}>
                    {
                      filter.values.filter((value) => selectedFilterIds.includes(value.id)).length > 0 && filter.values.filter((value) => selectedFilterIds.includes(value.id)).length
                    }
                  </p>
                </div>
              ))
            }
          </div>
          <div className='w-full h-full flex flex-col gap-4 py-4 bg-background px-4 rounded-t-lg overflow-auto'>
            {
              (filters && filters.length > 0) && filters[selectedFilter].values.map((value, index) => (
                <div className='flex flex-col gap-2'>
                  <div key={value.value} className="flex items-center w-full gap-4">
                    <Checkbox
                      id={`${value.value}-${value.id}`}
                      checked={selectedFilterIds.includes(value.id)}
                      onCheckedChange={() => handleFilterChange(value.id)}
                      className='w-6 h-6'
                    />
                    <label htmlFor={`${value.value}-${value.id}`} className="text-lg capitalize">
                      {value.value}
                    </label>
                  </div>
                  <Separator/>
                </div>
              ))
            }
          </div>
        </div>
        <div className="w-full flex justify-between items-center p-4 bg-background fixed bottom-0 z-50">
          <Button
          onClick={() => {
            setSelectedFilters(selectedFilterIds)
            onClose(false)
          }} 
          className="w-full py-6 cursor-pointer"
          >
            <p className='text-background text-lg'>Apply Filters</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;