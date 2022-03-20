import React, { useEffect, useState } from "react";
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
import { Button, Grid, Typography } from "@mui/material";

type Props = {
  scode: string;
};

const Editor: React.FC<Props> = ({ scode }: Props) => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [dbCode, setDbCode] = useState<string[]>([]);

  useEffect(() => {
    const getCode = async () => {
      const data: { info: string }[] = await (
        await fetch("http://localhost:4000/code")
      ).json();

      setDbCode(
        data.map((item) => {
          console.log(item.info);
          return item.info;
        })
      );
    };
    getCode();
  }, []);

  return (
    <Box
      sx={{
        margin: "10rem auto",
        fontSize: "1rem",
        height: "50vh",
        width: "50vw",
      }}
    >
      {/* <select
        name="languages"
        onChange={(e) => {
          setLanguage(e.target.value);
          setCode(scode);
        }}
      >
        <option value="text/x-java">java</option>
        <option value="python">python</option>
        <option value="javascript">javascript</option>
        <option value="text/x-java">java</option>
      </select> */}

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
        <Grid xs={4} item textAlign="center">
          <Button
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
          </Button>
        </Grid>
      </Grid>
      <Typography sx={{ marginTop: "2rem" }} textAlign="center" variant="h3">
        Code from the database:{" "}
      </Typography>
      <Grid sx={{ margin: "2rem 0 " }}>
        {dbCode.map((code) => (
          <Typography textAlign="center" variant="h6">
            {code}
          </Typography>
        ))}
      </Grid>
      <br></br>
    </Box>
  );
};

export default Editor;
