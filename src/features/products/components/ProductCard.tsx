`use client`
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/models/product";
import Link from "next/link";
import useCart from "@/features/cart/hooks/useCart";
import CustomButton from "@/components/Button";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const { addToCart, isSaveCartLoading } = useCart();
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const buyNow = async (p: Product) => {
    await addToCart({
      productId: product.id,
      variationId: p?.variations?.length > 0 ? p?.variations[0]?.id : "",
      quantity: 1,
    });
    router.push("/checkout");
  };

  return (
    <Card className="bg-background rounded-md h-min border py-10">
      <CardContent>
        <Link href={`/products/${product.id}`}>
          <div className="relative flex flex-col items-center w-full gap-4">
            <img
              src={`https://api.enkubeauty.com/files/${product.imageUrl}`}
              width={200}
              height={200} // Adjusted height for better display
              alt={product.name} // Added alt text for better accessibility
              className="object-contain" // Added class for better image fit
            />
            <p className="text-md text-center font-medium leading-relaxed px-4">
              {product.name}
            </p>
            <p>{`ETB ${
              product?.variations?.length && product?.variations[0]
                ? product?.variations[0]?.price
                : product.price
            }`}</p>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="w-full flex gap-2 px-2 py-2">
        <CustomButton
          variant="outline"
          onClick={() => {
            setClickedButton("Buy")
            buyNow(product);
          }}
          isLoading={isSaveCartLoading && clickedButton === "Buy"}
          className="w-full"
        >
          <div className="py-1">
            <p className="font-bold">Buy Now</p>
          </div>
        </CustomButton>
        <CustomButton
          variant="primary"
          onClick={() => {
            setClickedButton("Add")
            addToCart({ productId: product.id, variationId: "1", quantity: 1 });
          }}
          isLoading={isSaveCartLoading && clickedButton === "Add"}
          className="w-full flex items-center"
        >
          <div className="flex gap-2 items-center py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 20"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M21 23H-3V-1h24z"></path>
                <path
                  fill="#fff"
                  fill-rule="nonzero"
                  d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"
                ></path>
              </g>
            </svg>
            <p className="font-bold">Add to Bag</p>
          </div>
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
