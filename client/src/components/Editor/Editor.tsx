import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/css/css";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

type Props = {
  code: string;
  setCode: (val: string) => void;
  language: string;
};

const Editor: React.FC<Props> = ({ code, setCode, language }: Props) => {
  return (
    <Box
      sx={{
        fontSize: "1rem",
      }}
    >
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
      <Grid container alignItems="center" justifyContent="center">
        <Grid xs={4} item textAlign="center"></Grid>
      </Grid>
    </Box>
  );
};

export default Editor;

/* <Button
  onClick={async () => {
    const body = { Language: language, Code: code };
    console.log("clicked");
    await fetch("http://localhost:4000/testCode", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    console.log("again");

    const data: { info: string }[] = await (
      await fetch("http://localhost:4000/code")
    ).json();

    setDbCode(
      data.map((item) => {
        console.log(item.info);
        return item.info;
      })
    );
  }}
  sx={{
    fontSize: "2rem",
    color: "black",
    border: "1px solid black",
    marginTop: "2rem",
  }}
>
  Send Code
</Button>; */

// useEffect(() => {
//   const getCode = async () => {
//     const data: { info: string }[] = await (
//       await fetch("http://localhost:4000/code")
//     ).json();

//     setDbCode(
//       data.map((item) => {
//         console.log(item.info);
//         return item.info;
//       })
//     );
//   };
//   getCode();
// }, []);

// const [code, setCode] = useState<string>("");
// const [language, setLanguage] = useState<string>("python");
// const [dbCode, setDbCode] = useState<string[]>([]);
