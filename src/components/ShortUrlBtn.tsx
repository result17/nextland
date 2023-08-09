"use client";
import useAppStore from "../lib";
const ShortUrlBtn = (props: JSX.IntrinsicElements['button']) => {
  const url = useAppStore(({ url }) => url);
  console.log(url)
  return (
    <button
      disabled={!!!url}
      {...props}
      className={`ml-2 rounded min-w-32 h-10 bg-gray-500 text-white ${url.length ? 'bg-pink-700 cursor-pointer' : 'cursor-not-allowed'}`}
    />
  )
}

export default ShortUrlBtn
