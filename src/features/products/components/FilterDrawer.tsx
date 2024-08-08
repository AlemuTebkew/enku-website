`use client`
import React, { SetStateAction } from 'react';
import { Drawer, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '@/store/app-store-hooks';
import { RootState } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  onItemSelected: (id: number) => void
}

const FilterDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onItemSelected }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();



 return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={() => onClose(false)}
      classes={{ paper: 'w-full h-full' }}
    >
      <div className="relative h-full flex flex-col">
        <p onClick={() => onClose(false)}> Close Filter</p>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;