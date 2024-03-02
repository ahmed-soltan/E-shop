"use client";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";
import { useOnClickOutside } from "@/hook/use-on-click-hoo";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

const UserMenu = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const toggleOpen = () => {
    setIsOpen((prev: boolean) => !prev);
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
  }, []);
  useOnClickOutside(navRef, () => setIsOpen(false));
  return (
    <>
      <div className="relative z-30" ref={navRef}>
        <div
          onClick={toggleOpen}
          className="p-2 cursor-pointer border-2 border-slate-300 flex flex-row items-center gap-2 rounded-full hover:shadow-md transition text-slate-700"
        >
          <Avatar src={currentUser?.image}/>
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute top-12 right-0 w-[170px] bg-white rounded-md overflow-hidden text-sm flex flex-col cursor-point shadow-md">
            {currentUser ? (
              <div>
                <Link href={"/orders"}>
                  <MenuItems onclick={toggleOpen}>Your Orders</MenuItems>
                </Link>
                <Link href={"/admin"}>
                  <MenuItems onclick={toggleOpen}>Admin Dashboard</MenuItems>
                </Link>
                <hr />
                  <MenuItems
                    onclick={() => {
                      toggleOpen();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItems>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <MenuItems onclick={toggleOpen}>Login</MenuItems>
                </Link>
                <Link href={"/register"}>
                  <MenuItems
                    onclick={() => {
                      toggleOpen();
                    }}
                  >
                    Sign up
                  </MenuItems>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
