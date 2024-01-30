/** @format */

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

interface IPropEdit {
  showEdit: boolean;
  setShowEdit: (v: boolean) => void;
  editItem: IBlog;
  setEditItem: (value: IBlog) => void;
}

export default function EditComponent(props: IPropEdit) {
  const { editItem, showEdit, setShowEdit, setEditItem } = props;
  const [error, setError] = useState<string>("");
  const [updateItem, setUpdateItem] = useState<IBlog>({
    id: editItem?.id,
    title: editItem?.title,
    author: editItem?.author,
    content: editItem?.content,
  });

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleSave = () => {
    console.log("edit");
  };

  return (
    <div>
      <Modal
        open={showEdit}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in>
          <Stack
            spacing={3}
            sx={style}
            justifyContent={"center"}
            alignItems={"center"}>
            <HeaderModal variant='h6' bgcolor={"orange"}>
              Edit BLOG
            </HeaderModal>

            <Form>
              <TextField
                label='Title'
                id='title'
                variant='outlined'
                name='title'
                value={updateItem.title}
                fullWidth
              />
              <TextField
                label='Author'
                id='author'
                variant='outlined'
                name='author'
                value={updateItem.author}
                fullWidth
              />
              <TextField
                label='Content'
                id='content'
                variant='outlined'
                name='content'
                value={updateItem.content}
                multiline
                rows={3}
                fullWidth
              />

              <Typography color={"error"}>{error}</Typography>
            </Form>

            <FooterModal>
              <Button variant='contained' color='warning' onClick={handleSave}>
                Save
              </Button>
              <Button
                variant='contained'
                color='info'
                onClick={handleCloseEdit}>
                Close
              </Button>
            </FooterModal>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const HeaderModal = styled(Typography)({
  width: "100%",
  paddingBottom: "1rem",
  paddingTop: "1rem",
  textAlign: "center",
  color: "white",
});

const Form = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  width: "80%",
});

const FooterModal = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  paddingBottom: "1rem",
});
