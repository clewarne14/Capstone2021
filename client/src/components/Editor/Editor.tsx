import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/css/css";
import styles from "./styles";

const Editor: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");

  return (
    <div>
      <select
        name="languages"
        onChange={(e) => {
          setLanguage(e.target.value);
          setCode("");
        }}
      >
        <option value="python">python</option>
        <option value="javascript">javascript</option>
        <option value="text/x-java">java</option>
      </select>

      <CodeMirror
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        value={code}
        options={{
          lineWrapping: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      ></CodeMirror>
    </div>
  );
};

export default Editor;
