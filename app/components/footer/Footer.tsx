import React from "react";
import FooterList from "./FooterList";
import Container from "../Container";
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-500 text-slate-200 text-sm mt-16 ">
      <Container>
        <div className="flex flex-col md:flex-row pt-16 pb-8 gap-5">
          <FooterList>
            <h3 className="font-bold text-xl mb-2">Shop Categories</h3>
            <Link href={"#"}>Phone</Link>
            <Link href={"#"}>TV</Link>
            <Link href={"#"}>Clothes</Link>
            <Link href={"#"}>Laptops</Link>
            <Link href={"#"}>Watches</Link>
            <Link href={"#"}>Desktops</Link>
            <Link href={"#"}>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold text-xl mb-2">Customer Services</h3>
            <Link href={"#"}>Contact us</Link>
            <Link href={"#"}>Shiping Policy</Link>
            <Link href={"#"}>Returns & Exchange</Link>
            <Link href={"#"}>Wathces</Link>
            <Link href={"#"}>FAQs</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold text-xl mb-2">About us</h3>
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
              est odio corrupti iure esse consequatur maxime. Officiis omnis
              esse mollitia nam. Sint eveniet rem nisi minima iure, labore
              libero recusandae?
            </span>
            <span className="font-bold flex items-center gap-x-1">
              <FaRegCopyright /> {new Date().getFullYear()} E-shop. All Right Preserved
            </span>
          </FooterList>
          <FooterList>
            <h3 className="font-bold text-xl mb-2">Follow us</h3>
            <div className="flex items-center gap-x-3">
              <Link href={"#"}>
                <FaFacebook  className="text-2xl"/>
              </Link>
              <Link href={"#"}>
                <FaTwitter  className="text-2xl"/>
              </Link>
              <Link href={"#"}>
                <FaInstagram className="text-2xl" />
              </Link>
              <Link href={"#"}>
                <FaYoutube className="text-2xl" />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
