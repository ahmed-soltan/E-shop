"use client";

import { FieldValues, useForm } from "react-hook-form";
import Input from "./inputs/Input";
import { useRouter } from "next/navigation";
import queryString from "query-string";

const SearchBar = () => {
    const router = useRouter()
    const {register , handleSubmit , reset , formState:{errors}} = useForm<FieldValues>({
        defaultValues: {
            searchItem: "",
        }
    })
    const Submit = async (values: FieldValues) => {
        console.log(values)
        if(!values.searchItem){
            return router.push(`/`)
        }
        const url = queryString.stringifyUrl({
            url: `/`,
            query: {
                searchItem: values.searchItem
            },
        },{
            skipNull:true
        })
        console.log(url)
        router.push(url)

        reset()
    }
  return (
    <form className="flex items-center w-full"  onSubmit={handleSubmit(Submit)}>
      <input
      {...register("searchItem")}
      name="searchItem"
        type="text"
        autoComplete="off"
        placeholder="Explore E-shop"
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus-border-slate-500"
      />
      <button className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md" type="submit">
        search
      </button>
    </form>
  );
};

export default SearchBar;
