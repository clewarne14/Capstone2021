import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AlertType = {
  text: string;
  variant: "success" | "warning" | "error" | "none" | "info";
  variantOverride?: string; // This is optional, will override the variant string present at the beginning of an alert
};

const AlertContext = createContext<Dispatch<SetStateAction<AlertType>> | null>(
  null
);

const AlertContextWrapper = AlertContext.Provider;

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("Error building alert context");
  return context;
};

type Props = {
  children: ReactNode;
};

const AlertContextProvider: FC<Props> = ({ children }: Props) => {
  const [alert, setAlert] = useState<AlertType>({ variant: "none", text: "" });

  const onClose = () => setAlert({ variant: "none", text: alert.text });

  return (
    <AlertContextWrapper value={setAlert}>
      <Snackbar
        sx={{ opacity: alert.variant === "none" ? 0 : "100%" }}
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
          sx={{ fontSize: "1.2rem", textAlign: "center", fontWeight: 700 }}
        >
          {`${alert.variantOverride ?? `${alert.variant.toUpperCase()}:`} ${
            alert.text
          }`}
        </Alert>
      </Snackbar>
      {children}
    </AlertContextWrapper>
  );
};

export { AlertContextProvider, useAlert };
