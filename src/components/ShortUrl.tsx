"use client";
import useAppStore, { AppStatus } from "../lib";
import Link from "next/link";

const ShortUrl = () => {
  const savedData = useAppStore(({ savedData }) => savedData);
  return (
    savedData && (
      <span className="text-xl text-slate-900 font-bold">
        <Link href={`/r/${savedData.shortenUrl}`}>
          {`${window.location.origin}/r/${savedData.shortenUrl}`}
        </Link>
      </span>
    )
  );
};

export default ShortUrl;
