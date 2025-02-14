"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

import thumb from "@/assets/images/thumb.svg";
import ticz from "@/assets/images/ticz.svg";
import "@/styles/NavBar.css";
import { CgClose, CgMenuRight } from "react-icons/cg";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar bg-[#142124] border border-solid border-[#197686] rounded-3xl p-4 text-white relative ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src={thumb} alt="ticket-icon"></Image>
          <Image src={ticz} alt="event-name" className="mt-[6px]"></Image>
        </div>
        <div className="hidden lg:flex space-x-4">
          <NavLinks pathname={pathname} />
        </div>

        <button className="animated-button hidden lg:flex lg:py-3 lg:px-9 py-3 px-4  lg:text-base text-sm">
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text uppercase">My Tickets</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>

        <div className="lg:hidden flex flex-row gap-2 items-center">
          <button className="animated-button flex py-3 px-4 text-sm">
            <svg
              viewBox="0 0 24 24"
              className="arr-2 -me-[14px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text uppercase">My Tickets</span>
            <span className="circle"></span>
            <svg
              viewBox="0 0 24 24"
              className="arr-1 -me-[14px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
          <div className="lg:hidden">
            {isOpen ? (
              <CgClose
                className="text-3xl text-[#197686] cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <CgMenuRight
                className="text-3xl text-[#197686] cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`fixed top-full rounded-3xl left-0 w-full min-h-screen bg-black/50 backdrop-blur-lg flex items-center text-white text-2xl transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-6">
          <NavLinks pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}

const NavLinks = ({ pathname }: { pathname: string }) => (
  <>
    <Link
      href="/"
      className={`hover:text-gray-400 menu-links ${
        pathname === "/" ? "active" : "text-gray-400"
      }`}
    >
      <span className="relative text-lg font-normal hover-underline-animation">
        Event
      </span>
    </Link>
    <Link
      href="/my-tickets"
      className={`hover:text-gray-400 menu-links ${
        pathname === "/my-tickets" ? "active" : "text-gray-400"
      }`}
    >
      <span className="relative font-normal text-lg hover-underline-animation">
        My Tickets
      </span>
    </Link>
    <Link
      href="/about"
      className={`hover:text-gray-400 menu-links ${
        pathname === "/about" ? "active" : "text-gray-400"
      }`}
    >
      <span className="relative text-lg font-normal hover-underline-animation">
        About Project
      </span>
    </Link>
  </>
);
