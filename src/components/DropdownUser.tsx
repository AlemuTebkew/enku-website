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
import { useEffect, useState } from "react";

export function DropDownUser() {
  const { logOut, token } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogout = () => {
    logOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setName(user.fullName || "User");
        setPhoneNumber(user.phoneNumber || "N/A");
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

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
              <AvatarFallback>
                {name ? name?.charAt(0)?.toUpperCase() : ""}
              </AvatarFallback>
            </Avatar>
          </Button>
          <div className="hidden lg:flex lg:flex-col cursor-pointer text-sm">
            <span className="font-semibold">{name}</span>
            <span className="font-normal">{phoneNumber}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50">
        <DropdownMenuGroup className="lg:hidden">
          <div className="p-2">
            <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
              <p className="font-semibold">{name}</p>
              <p className="font-normal">{phoneNumber}</p>
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
        <DropdownMenuItem onClick={() => handleLogout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
