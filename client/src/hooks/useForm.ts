import React, { useState } from "react";

const useForm = (
  inputVal: string
): [value: string, setText: (e: React.FormEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<string>(inputVal);

  const setText = (e: React.FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return [value, setText];
};

export default useForm;
