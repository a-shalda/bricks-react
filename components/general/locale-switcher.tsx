"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { type Locale } from "@/i18n-config";

import { RU, GB } from 'country-flag-icons/react/3x2'

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="header__upper__left__hamburger__dropdown__flag">
      <Link href={redirectedPathName("ru")}>
        {/* <p className="header__upper__left__hamburger__dropdown__language"></p> */}
        <RU title="Russian" width="24" height="24"/>
      </Link>
      <Link href={redirectedPathName("en")}>
        {/* <p className="header__upper__left__hamburger__dropdown__language"></p> */}
        <GB title="English" width="24" height="24"/>
      </Link>

    </div>
  );
}