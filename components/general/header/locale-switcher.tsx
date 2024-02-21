"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { type Locale } from "@/i18n-config";

import { RU, GB } from 'country-flag-icons/react/3x2'

export default function LocaleSwitcher() {

  const [pointerOne, setPointerOne] = useState("header__upper__left__hamburger__dropdown__switcher__item__flag")
  const [pointerTwo, setPointerTwo] = useState("header__upper__left__hamburger__dropdown__switcher__item__flag")

  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handlePointerOneEnter = () => setPointerOne("header__upper__left__hamburger__dropdown__switcher__item__contrast")
  const handlePointerOneLeave = () => setPointerOne("header__upper__left__hamburger__dropdown__switcher__item__flag")
  const handlePointerTwoEnter = () => setPointerTwo("header__upper__left__hamburger__dropdown__switcher__item__contrast")
  const handlePointerTwoLeave = () => setPointerTwo("header__upper__left__hamburger__dropdown__switcher__item__flag")

  return (
    <div className="header__upper__left__hamburger__dropdown__switcher">

      <Link onPointerEnter={handlePointerOneEnter} onPointerLeave={handlePointerOneLeave} href={redirectedPathName("ru")} className="header__upper__left__hamburger__dropdown__switcher__item">
        <span className="header__upper__left__hamburger__dropdown__switcher__item__language"></span>
        <RU title="Russian" width="20" height="20" className={pointerOne} />
      </Link>


      <Link onPointerEnter={handlePointerTwoEnter} onPointerLeave={handlePointerTwoLeave} href={redirectedPathName("en")} className="header__upper__left__hamburger__dropdown__switcher__item">
        <span className="header__upper__left__hamburger__dropdown__switcher__item__language"></span>
        <GB title="English" width="20" height="20" className={pointerTwo} />
      </Link>

    </div>
  );
}