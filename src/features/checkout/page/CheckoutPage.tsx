"use client"
import React, { useState, useEffect } from "react";
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
import useOrder from "../hooks/useOrder";

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
        if(isOrderCheckoutSuccess) {
            router.push('/confirmation')
        }
    }, [isOrderCheckoutSuccess])

    return (
        <div className="mx-auto max-w-c-1390 py-0 w-full lg:px-12 2xl:px-0">
            <div className="mx-0 lg:mx-12">
                <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
                <div className="flex bg-white gap-2">
                    {/* Order Summary */}
                    <div className="p-6 rounded-lg w-3/4">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
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
                    </div>
                    </div>
                    <Separator className="" orientation="vertical"/>
                    {/* Billing Information */}
                    <div className="p-6 rounded-lg w-3/4">
                        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 flex flex-col items-start">
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
                                <div className="text-right">
                                    <CustomButton 
                                    type="submit" 
                                    className="w-full sm:w-auto"
                                    isLoading={isOrderCheckoutLoading}
                                    >
                                        Place Order
                                    </CustomButton>
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
