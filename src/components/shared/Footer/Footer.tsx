import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#1A365D]">
        <div className="py-10 md:py-12 lg:py-14 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-5 md:gap-6 lg:gap-6">
          <div className="md:col-span-3 ">
            {/* Logo */}
            <Link href="/" className="">
              <Image
                src="/assets/images/footer_logo.png"
                alt="logo"
                width={1000}
                height={1000}
                className="w-auto h-[36px] object-contain"
              />
            </Link>
            <p className="max-w-[210px] text-sm md:text-base text-white leading-normal font-normal pt-4">
              Premium quality research peptides for scientific and educational
              purposes only.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="hidden md:block text-lg md:text-xl font-semibold text-white leading-[120%] pb-4">
              Quick Links
            </h4>
            <ul>
              <Link href="/">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary">
                  Home
                </li>
              </Link>
              <Link href="/products">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary py-2">
                  Products
                </li>
              </Link>
              <Link href="/about-us">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary">
                  About Us
                </li>
              </Link>
              <Link href="/contact-us">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary py-2">
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="hidden md:block text-lg md:text-xl font-semibold text-white leading-[120%] pb-4">
              Account
            </h4>
            <ul>
              <Link href="/login">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary">
                  Login
                </li>
              </Link>
              <Link href="/sign-up">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary py-2">
                  Sign UP
                </li>
              </Link>
              <Link href="/cart">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary">
                  Shopping Cart
                </li>
              </Link>
              <Link href="/terms-of-service">
                <li className="text-sm md:text-base font-normal text-white leading-[120%] hover:underline hover:text-primary py-2">
                  Terms of Service
                </li>
              </Link>
            </ul>
          </div>
          <div className="md:col-span-3">
            {/* Title */}
            <h4 className="hidden md:block text-lg md:text-xl font-semibold text-white leading-[120%] pb-4">
              Contact Us
            </h4>

            {/* Address */}
            <div className="flex items-start gap-4 mb-3">
              <MapPin className="w-6 h-6 text-white mt-1" />
              <Link
                href="https://maps.google.com/?q=123 Research Blvd, Science Park, CA 94000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base leading-normal font-normal text-white"
              >
                123 Research Blvd, <br />
                Science Park, CA 94000
              </Link>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 mb-3">
              <Phone className="w-6 h-6 text-white" />
              <Link
                href="tel:+1 (555) 123-4567"
                className="text-sm md:text-base leading-normal font-normal text-white"
              >
                +1 (555) 123-4567
              </Link>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-white" />
              <Link
                href="mail:info@researchpeptides.com"
                className="text-sm md:text-base leading-normal font-normal text-white"
              >
                info@researchpeptides.com
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* footer bottom  */}
      <p className="container text-sm md:text-base font-medium text-center text-[#131313] leading-[120%] py-6 ">
        Copyright © {new Date().getFullYear()}. Hierarchy of Visionaries. All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
