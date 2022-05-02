import React, { FC, useEffect, useState } from "react";
import { ProblemType } from "../../Routes";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListsDialog from "../ListsDialog";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";
import HoverText from "../HoverText";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../contexts/AuthUserContext";

export type AddToListProps = { listTitle: string; listId: string };

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
  const [lists, setLists] = useState<Array<AddToListProps>>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [textActive, setTextActive] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { username } = useUser();

  const closeDialog = () => setDialogOpen(false);
  const openDialog = () => setDialogOpen(true);

  const closeText = () => setTextActive(false);
  const openText = () => setTextActive(true);

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const response = await fetch(
          `http://localhost:4000/user/${username}/lists`
        );
        const data = await response.text();
        const parsedLists = data.split(",");
      })();
    }
  }, [isAuthenticated, username]);

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
        lists={lists}
      />
    </HoverText>
  );
};

export default AddToListButtonAndPopup;
