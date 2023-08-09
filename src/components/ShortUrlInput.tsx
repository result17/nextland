"use client";
import useAppStore from "../lib";
import { type FormEvent, useCallback, useMemo } from "react";
import { debounce } from "../shared/index";

const ShortUrlInput = () => {
  const changeUrl = useAppStore(({ changeUrl }) => changeUrl);

  const debounceSet = useMemo(() =>
    debounce((value: string) => {
      changeUrl(value);
    }, 1000), [changeUrl]);

  const onChangeUrl = useCallback(
    (e: FormEvent<HTMLInputElement>) =>
      debounceSet((e.target as HTMLInputElement).value),
    [debounceSet],
  );

  return (
    <input
      type="text"
      className="w-full px-4 border-black-1 focus:outline-0 rounded"
      placeholder="long url here"
      onInput={onChangeUrl}
    />
  );
};

export default ShortUrlInput;
