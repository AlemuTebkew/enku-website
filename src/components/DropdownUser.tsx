import { LogOut, PackageIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";

export function DropDownUser() {
  const { logOut, token, userId } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center gap-2">
        <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full h-max"
          >
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{"H"}</AvatarFallback>
            </Avatar>
          </Button>
          <div className="hidden lg:flex lg:flex-col cursor-pointer text-sm">
            <span className="font-semibold">
              {"Heliza Yared"}
            </span>
            <span className="font-normal">{"0984245345"}</span>
          </div>
          
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50">
        <DropdownMenuGroup className="lg:hidden">
          <div className="p-2">
            <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
              <p className="font-semibold">
                {"Heliza Yared"}
              </p>
              <p className="font-normal">{"0984245345"}</p>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/order">
            <DropdownMenuItem className="cursor-pointer">
              <PackageIcon className="mr-2 h-4 w-4" />
              <span>My Order</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
