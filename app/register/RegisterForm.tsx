"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
const RegisterForm = ({ currentUser }: { currentUser: SafeUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
    }
  }, []);
  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // Handle non-2xx status codes
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // Handle the response data appropriately
      // For example, you can check if login was successful and display a message accordingly

      toast.success("Account Created Successful");

      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh();
          toast.success("Logged in ");
        }
        if (callback?.error) {
          toast.success(callback.error);
        }
      });
    } catch (error) {
      // Handle request or server errors
      console.error("Error during Registering:", error);
      // Show an error message to the user, indicating login failure
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      // Whether successful or not, you can stop the loading state here
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return (
      <p className="text-center">You are already logged in. Redirecting....</p>
    );
  }
  return (
    <>
      <Heading title="Sign up For E-shop" />
      <Button
        outlined
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn("google")}}
      />
      <hr className="bg-slate-300 w-full h-px my-4" />
      <Input
        id="name"
        type="text"
        label="Name"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
      />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
      />
      <Button
        label={`${isLoading ? "Loading" : "Sign up"}`}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already Have An Account?{" "}
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
