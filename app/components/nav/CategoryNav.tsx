"use client"
import { categories } from "@/Utils/Categories";
import Container from "../Container";
import Link from "next/link";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryNav = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname()

  const mainpage = pathname==='/'
  if(!mainpage) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => {
            return (
              <Category
                label={item.label}
                icon={item.icon}
                key={item.label}
                selected={
                  category === item.label ||
                  (category === null && item.label === "All")
                }
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default CategoryNav;
