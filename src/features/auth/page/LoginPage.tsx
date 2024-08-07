"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import CustomButton from '@/components/Button';
import { useAuth } from '../hooks/useAuth';
import { getSessionId } from '@/utils/getLocalStorageData';
 
const FormSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

const LoginPage = () => {
  const {submitLoginRequest, selectIsLoading, token} = useAuth()
  const router = useRouter();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submitLoginRequest({
      loginInfo: {
        phoneNumber: data.phone
      },
      sessionId: getSessionId()
    })

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }


  useEffect(() => {
    if ((token !== null || token !== undefined) && typeof(window) !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get('redirect') || '/';
      router.push(redirectPath);
    }
  }, [token, router]);
      
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50">

        {/* <!-- Login Container --> */}
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
            
            <h2 className="text-2xl font-bold text-pink-600 text-center mb-6">Login / Create Account</h2>
            <p className="text-center text-gray-600 mb-4">Register now and get <b>1000 Enku Beauty reward points instantly!</b></p>
            
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col items-start">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start">
                      <FormLabel className="text-left">Phone Number</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput placeholder="Enter a phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Button type="submit">Submit</Button> */}
                <CustomButton isLoading={selectIsLoading} type='submit' className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 flex justify-center items-center mb-6">
                  Sign in with Mobile Number
                  <svg className="ml-2" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.66667 0.166992L8.41667 1.41699L12.2253 5.22559H0.5V6.89225H12.2253L8.41667 10.7008L9.66667 11.9508L15.5586 6.05892L9.66667 0.166992Z" fill="#FFF"></path>
                  </svg>
              </CustomButton>
              </form>
            </Form> 
        </div>
    </div>

  )
}

export default LoginPage
