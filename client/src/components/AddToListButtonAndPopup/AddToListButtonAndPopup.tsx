import React, { FC, useState } from "react";
import { ProblemType } from "../../Routes";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListsDialog from "../ListsDialog";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";
import HoverText from "../HoverText";
import colors from "../../colors";

type Props = {
  problemType: ProblemType;
  problemId: string;
  sx?: SxProps<Theme>;
};

const AddToListButtonAndPopup: FC<Props> = ({
  problemId,
  problemType,
  sx,
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [textActive, setTextActive] = useState(false);

  const closeDialog = () => setDialogOpen(false);
  const openDialog = () => setDialogOpen(true);

  const closeText = () => setTextActive(false);
  const openText = () => setTextActive(true);

  return (
    <HoverText text="Add to list" open={textActive}>
      <AddBoxIcon
        onClick={openDialog}
        sx={{ cursor: "pointer", ...sx }}
        onMouseEnter={openText}
        onMouseLeave={closeText}
      />
      <ListsDialog
        open={dialogOpen}
        setOpen={openDialog}
        setClose={closeDialog}
        sx={{ display: "none" }}
      />
    </HoverText>
  );
};

export default AddToListButtonAndPopup;
