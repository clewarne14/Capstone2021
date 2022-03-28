import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { Alert, Collapse, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Alert = {
  text: string;
  variant: "success" | "warning" | "error" | "none" | "info";
};

const AlertContext = createContext<Dispatch<SetStateAction<Alert>> | null>(
  null
);

const AlertContextProvider = AlertContext.Provider;

const useAlert = () => useContext(AlertContext);

type Props = {
  children: ReactNode;
};

const AlertContextWrapper: FC<Props> = ({ children }: Props) => {
  const [alert, setAlert] = useState<Alert>({ variant: "none", text: "" });

  const onClose = () => setAlert({ variant: "none", text: "" });

  return (
    <AlertContextProvider value={setAlert}>
      <Snackbar
        open={alert.variant !== "none"}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert
          color={alert.variant === "none" ? undefined : alert.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="medium"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          {alert.text}
        </Alert>
      </Snackbar>
      {children}
    </AlertContextProvider>
  );
};

export { AlertContextWrapper, useAlert };
