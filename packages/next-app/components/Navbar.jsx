import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
// import { useRouter } from 'next/router';
// import NavLogo from '../public/assets/navLogo.png'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");
  // const [position, setPosition] = useState('fixed')
  // const router = useRouter();

  // useEffect(() => {
  //   if (
  //     router.asPath === '/property' ||
  //     router.asPath === '/crypto' ||
  //     router.asPath === '/netflix' ||
  //     router.asPath === '/twitch'
  //   ) {
  //     setNavBg('transparent');
  //     setLinkColor('#ecf0f3');
  //   } else {
  //     setNavBg('#ecf0f3');
  //     setLinkColor('#1f2937');
  //   }
  // }, [router]);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300"
          : "fixed w-full h-20 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <div className="font-bold">
          <Link href="/">
            <h1>FitLassian</h1>
          </Link>
        </div>

        {/* <Link href="/">
          <a>
            <Image
              src={NavLogo}
              alt="/"
              width="125"
              height="50"
              className="cursor-pointer"
            />
          </a>
        </Link> */}
        <div>
          <ul className="hidden md:flex">
            {/* <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="/">Home</Link>
            </li> */}
            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="/#pitch">Pitch</Link>
            </li>
            {/* <li className="ml-10 text-sm uppercase hover:border-b">
              <Link href="/#how">How it works</Link>
            </li> */}
            <li className="ml-10 text-sm uppercase hover:border-b">
              <Link
                href="https://developer.atlassian.com/console/install/a996f64b-50f8-44f8-b6b7-6f65faa556e8?signature=c2e0d1768220b0fad9180ddc381c36aefaf4fc153f3d0d89cacff56735fa88ac&product=jira"
                target="_blank"
                rel="noreferrer noopener"
              >
                Try it!
              </Link>
            </li>
          </ul>
          {/* Hamburger Icon */}
          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className="md:hidden"
          >
            <AiOutlineMenu className="text-white" size={25} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? "md:hidden fixed right-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? " fixed right-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] text-black p-10 ease-in duration-500"
              : "fixed right-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <div className="font-bold">
                <Link href="/">
                  <h1>FitLassian</h1>
                </Link>
              </div>
              {/* <Link href="/">
                <a>
                  <Image src={NavLogo} width="87" height="35" alt="/" />
                </a>
              </Link> */}
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">
                Gamifiying programmers health
              </p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              {/* <Link href="/">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Home
                </li>
              </Link> */}
              <Link href="/#pitch">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Pitch
                </li>
              </Link>
              {/* <Link href="/#how">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  How it works
                </li>
              </Link> */}
              <Link
                href="https://developer.atlassian.com/console/install/a996f64b-50f8-44f8-b6b7-6f65faa556e8?signature=c2e0d1768220b0fad9180ddc381c36aefaf4fc153f3d0d89cacff56735fa88ac&product=jira"
                target="_blank"
                rel="noreferrer noopener"
              >
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Try it!
                </li>
              </Link>
            </ul>
            {/* <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let&#39;s Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <a
                  href="https://www.linkedin.com/in/clint-briley-50056920a/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaLinkedinIn />
                  </div>
                </a>
                <a
                  href="https://github.com/fireclint"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaGithub />
                  </div>
                </a>
                <Link href="/#contact">
                  <div
                    onClick={() => setNav(!nav)}
                    className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <AiOutlineMail />
                  </div>
                </Link>
                <Link href="/resume">
                  <div
                    onClick={() => setNav(!nav)}
                    className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <BsFillPersonLinesFill />
                  </div>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
