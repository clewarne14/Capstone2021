import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

const Editor: React.FC = () => {
  const [code, setCode] = useState<string>("");
  return (
    <CodeMirror
      value={code}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
      }}
    ></CodeMirror>
  );
};

export default Editor;
