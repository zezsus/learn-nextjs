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
import { mutate } from "swr";

interface IPropEdit {
  showEdit: boolean;
  setShowEdit: (v: boolean) => void;
  blog: IBlog;
}

export default function EditComponent(props: IPropEdit) {
  const { blog, showEdit, setShowEdit } = props;
  const [error, setError] = useState<string>("");
  const [updateItem, setUpdateItem] = useState<IBlog>({
    id: blog?.id,
    title: blog?.title,
    author: blog?.author,
    content: blog?.content,
  });

  const handleChangeEditValue = (e: any) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleSave = () => {
    if (!updateItem.title || !updateItem.author || !updateItem.content) {
      setError("Please complete all fields. ");
      setTimeout(() => setError(""), 3000);
    } else {
      fetch(`http://localhost:8000/blogs/${updateItem.id}`, {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(updateItem),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            handleCloseEdit();
            mutate(`http://localhost:8000/blogs`);
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  };

  return (
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
              onChange={handleChangeEditValue}
              fullWidth
            />
            <TextField
              label='Author'
              id='author'
              variant='outlined'
              name='author'
              value={updateItem.author}
              onChange={handleChangeEditValue}
              fullWidth
            />
            <TextField
              label='Content'
              id='content'
              variant='outlined'
              name='content'
              value={updateItem.content}
              onChange={handleChangeEditValue}
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
            <Button variant='contained' color='info' onClick={handleCloseEdit}>
              Close
            </Button>
          </FooterModal>
        </Stack>
      </Fade>
    </Modal>
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
