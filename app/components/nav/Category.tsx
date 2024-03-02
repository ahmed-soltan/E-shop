"use client"

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

type CategoryProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};
const Category = ({ label, icon: Icon, selected }: CategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};
      if (searchParams) {
        currentQuery = queryString.parse(searchParams.toString());
      }
      const updatedQuery = {
        ...currentQuery,
        category: label,
      };
      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
          skipEmptyString: true,
        }
      );
      router.push(url);
    }
  }, [label , searchParams]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-2 p-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "text-slate-800 border-b-2 border-b-slate-800"
          : "text-slate-400 "
      }`}
    >
      <Icon size={24} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default Category;
