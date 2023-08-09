"use client";
import useAppStore, { AppStatus } from "../lib";
import { type FormEvent, useCallback, useMemo, useEffect, useState } from "react";
import { debounce } from "../shared/index";

const ShortUrlInput = () => {
  // In order to clear input value
  const [key, setKey] = useState(0)
  const { changeUrl, status } = useAppStore(({ changeUrl, status }) => ({ changeUrl, status }));

  const debounceSet = useMemo(() =>
    debounce((value: string) => {
      changeUrl(value);
    }, 1000), [changeUrl]);

  const onChangeUrl = useCallback(
    (e: FormEvent<HTMLInputElement>) =>
      debounceSet((e.target as HTMLInputElement).value),
    [debounceSet],
  );

  useEffect(() => {
    if (status === AppStatus.success || status === AppStatus.fail) setKey(prev => prev + 1)
  }, [status])

  return (
    <input
      key={key}
      type="text"
      className="w-full px-4 border-black-1 focus:outline-0 rounded"
      placeholder="Type long url here"
      onInput={onChangeUrl}
    />
  );
};

export default ShortUrlInput;
