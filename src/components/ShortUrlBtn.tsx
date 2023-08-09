"use client";
import useAppStore, { AppStatus } from "../lib";
import { useMemo } from 'react'

const ShortUrlBtn = (props: JSX.IntrinsicElements['button']) => {
  const { url, status, getSavedData } = useAppStore(({ url, status, getSavedData }) => ({ url, status, getSavedData }));

  const enable = useMemo(() => {
    const isValidUrl = !!url
    return isValidUrl && status === AppStatus.ready
  }, [url, status])
  return (
    <button
      onClick={getSavedData}
      disabled={!enable}
      {...props}
      className={`ml-2 rounded min-w-32 h-10 bg-gray-500 text-white ${enable ? 'bg-pink-700 cursor-pointer' : 'cursor-not-allowed'}`}
    />
  )
}

export default ShortUrlBtn
