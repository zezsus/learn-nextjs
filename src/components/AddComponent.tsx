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

interface IPropAdd {
  showAdd: boolean;
  setShowAdd: (v: boolean) => void;
}

export default function AddComponent(props: IPropAdd) {
  const { showAdd, setShowAdd } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCloseAdd = () => {
    setShowAdd(false);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  const handleAdd = () => {
    if (!title || !author || !content) {
      setError("Please complete all fields. ");
      setTimeout(() => setError(""), 3000);
    } else {
      const newBlog = {
        title: title,
        author: author,
        content: content,
      };

      fetch("http://localhost:8000/blogs", {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newBlog),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            handleCloseAdd();
            mutate("http://localhost:8000/blogs");
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  };

  return (
    <div>
      <Modal
        open={showAdd}
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
            <HeaderModal variant='h6' bgcolor={"blue"}>
              ADD BLOG
            </HeaderModal>

            <Form>
              <TextField
                label='Title'
                id='title'
                variant='outlined'
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label='Author'
                id='author'
                variant='outlined'
                value={author}
                onChange={(e: any) => setAuthor(e.target.value)}
                fullWidth
              />
              <TextField
                label='Content'
                id='content'
                variant='outlined'
                multiline
                rows={3}
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
                fullWidth
              />

              <Typography color={"error"}>{error}</Typography>
            </Form>

            <FooterModal>
              <Button variant='contained' onClick={handleAdd}>
                Add
              </Button>
              <Button variant='contained' color='info' onClick={handleCloseAdd}>
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
