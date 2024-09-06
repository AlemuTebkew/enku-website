"use client"
import React, { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { PhoneInput } from "@/components/ui/phone-input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useOrderCheckoutMutation } from "../api/OrderCheckoutApi";
import CustomButton from "@/components/Button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import useOrder from "../hooks/useOrder";
import { CartItemModel } from "@/features/cart/api/CartApi";
import OrderItem from "../components/OrderItem";
import { useAuth } from "@/features/auth/hooks/useAuth";
import useCart from "@/features/cart/hooks/useCart";

  const FormSchema = z.object({
    fullName: z.string(),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    address: z.string(),
    createAccount: z.boolean().default(false).optional(),
  })

const CheckoutPage: React.FC = () => {
    const router = useRouter()
    const { checkoutOrder, isOrderCheckoutLoading, isOrderCheckoutSuccess, isOrderCheckoutError} = useOrder()
    const { token } = useAuth()
    const { cartData, isFetchCartItemLoading,  } = useCart()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        fullName: "",
        phone: "",
        address: "",
        createAccount: false
        },
    });

    const onSubmit =  async (data: z.infer<typeof FormSchema>) => {
        await checkoutOrder({
            customerName: data.fullName,
            shippingPhoneNumber: data.phone,
            shippingAddress: data.address,
            agreed: data.createAccount ?? false
        })
    }

    useEffect(() => {
      if (!token) {
        // User is not logged in, redirect to login page
        router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
      }
    }, [token]);

    useEffect(() => {
        if(isOrderCheckoutSuccess) {
            router.push('/confirmation')
        }
    }, [isOrderCheckoutSuccess])

    const orderItems: CartItemModel[] = [
        {
          "id": "item1",
          "quantity": 2,
          "variation": {
            "id": "var1",
            "sku": "SKU12345",
            "title": "Luxury Face Cream",
            "color": "Beige",
            "isFeatured": true,
            "price": "49.99",
            "quantity": 10,
            "images": [
              {
                "id": "img1",
                "url": "https://images-static.nykaa.com/media/catalog/product/6/5/654bc788809738312872.jpg"
              },
              {
                "id": "img2",
                "url": "https://images-static.nykaa.com/media/catalog/product/6/5/654bc788809738312872.jpg"
              }
            ],
            "optionValues": [
              {
                "id": "opt1",
                "value": "50ml",
                "option": {
                  "id": "size",
                  "name": "Size"
                }
              },
              {
                "id": "opt2",
                "value": "Normal",
                "option": {
                  "id": "skin-type",
                  "name": "Skin Type"
                }
              }
            ]
          }
        },
        {
          "id": "item2",
          "quantity": 1,
          "variation": {
            "id": "var2",
            "sku": "SKU67890",
            "title": "Radiant Glow Serum",
            "color": null,
            "isFeatured": false,
            "price": "29.99",
            "quantity": 5,
            "images": [
              {
                "id": "img3",
                "url": "https://images-static.nykaa.com/media/catalog/product/6/5/654bc788809738312872.jpg"
              }
            ],
            "optionValues": [
              {
                "id": "opt3",
                "value": "30ml",
                "option": {
                  "id": "size",
                  "name": "Size"
                }
              }
            ]
          }
        }
      ]
      
    return (
        <div className="mx-auto max-w-c-1390 py-0 w-full lg:px-12 2xl:px-0">
            <div className="mx-0 lg:mx-12">
                <div className="ml-4 flex flex-col gap-2 lg:ml-0">
                    <h2 className="text-2xl font-semibold">Checkout</h2>
                    <div className="flex gap-2 hover:text-primary cursor-pointer" onClick={() => router.push('/')}>
                        <ArrowBackIcon className=""/>
                        <h4 className="">Back to shopping</h4>
                    </div>
                </div>
                <div className="px-4 py-2 flex flex-col gap-0 bg-white lg:gap-8 lg:px-10 lg:py-4 lg:flex-row">
                    {/* Order Summary */}
                    <div className="w-full flex flex-col gap-8 py-6 rounded-lg lg:w-3/4">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <p className="text-md">Total Price</p>
                                    <p className="text-md font-medium">ETB 1000</p>
                                </div>
                                <Separator className="h-[.09px]"/>
                                <div className="flex justify-between">
                                    <p className="text-md">Delivery Price</p>
                                    <p className="text-md font-medium">ETB 0</p>
                                </div>
                                <Separator className="h-[.09px]"/>
                                <div className="flex justify-between">
                                    <p className="text-md">SubTotal</p>
                                    <p className="text-md font-medium">ETB 1100</p>
                                </div>
                            </div>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                            <AccordionTrigger>Items</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-2">
                                    {
                                        cartData && cartData.items.map((order, index) => (
                                            <OrderItem key={index} item={order} onRemoveItem={(items) => {}} onUpdateQuantity={(item) => {}}/>
                                        ))
                                    }
                                </div>
                            </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        {/* <div className="flex justify-between mb-2">
                            <span>Product 1</span>
                            <span>$50.00</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Product 2</span>
                            <span>$30.00</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>$80.00</span>
                        </div> */}
                    </div>
                    <div className="hidden py-6 h-auto lg:block">
                        <Separator className="z-50" orientation="vertical"/>
                    </div>
                    {/* Billing Information */}
                    <div className="w-full py-6 rounded-lg lg:w-3/4">
                        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 flex flex-col items-start">
                                <FormField
                                name="fullName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full flex flex-col items-start">
                                    <FormLabel className="text-left">Full Name</FormLabel>
                                    <FormControl className="w-full">
                                        <Input
                                        {...field}
                                        placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start w-full">
                                    <FormLabel className="text-left">Phone Number</FormLabel>
                                    <FormControl className="w-full">
                                        <PhoneInput placeholder="Enter a phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                name="address"
                                control={form.control}
                                render={({ field}) => (
                                    <FormItem className="w-full flex flex-col items-start">
                                    <FormLabel className="text-left">Address</FormLabel>
                                    <FormControl className="w-full">
                                    <Input
                                        {...field}
                                        placeholder="123 Street Name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                name="createAccount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                            Enjoy faster checkouts and exclusive offers with automatic account creation.
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                                />
                                <div className="w-full">
                                    <CustomButton 
                                    type="submit" 
                                    className="w-full"
                                    isLoading={isOrderCheckoutLoading}
                                    >
                                        Place Order
                                    </CustomButton >
                                </div> 
                            </form>
                        </Form>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CheckoutPage;
