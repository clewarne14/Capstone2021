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
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import "./codemirror.css";

type Props = { scode: string };

const Editor: React.FC<Props> = ({ scode }: Props) => {
  const [code, setCode] = useState<string>(scode);
  const [language, setLanguage] = useState<string>("text/x-java");

  return (
    <Box sx={{ fontSize: "1.0001rem", width: "75%" }}>
      <select
        name="languages"
        onChange={(e) => {
          setLanguage(e.target.value);
          setCode(scode);
        }}
      >
        <option value="text/x-java">java</option>
        <option value="python">python</option>
        <option value="javascript">javascript</option>
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
      {/* <Button
        onClick={async () => {
          const body = { Language: language, Code: code };
          const data = await fetch("http://localhost:9000/codeToDockerTemp", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          alert(data);
        }}
        sx={{ fontSize: "2rem", color: "black" }}
      >
        Send Code
      </Button> */}
    </Box>
  );
};

export default Editor;
