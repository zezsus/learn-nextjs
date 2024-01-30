/** @format */

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { mutate } from "swr";

interface IPropsDelete {
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
  blog: IBlog;
}

const DeleteComponent = (props: IPropsDelete) => {
  const { showDelete, setShowDelete, blog } = props;
  const [idBlog, setIdBlog] = useState(blog.id);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${idBlog}`, {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          handleCloseDelete();
          mutate("http://localhost:8000/blogs/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      open={showDelete}
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
            <Typography variant='h6'>
              Do you want delete this item (id={idBlog})?
            </Typography>
          </Form>

          <FooterModal>
            <Button variant='contained' color='warning' onClick={handleDelete}>
              Yes
            </Button>
            <Button
              variant='contained'
              color='info'
              onClick={handleCloseDelete}>
              No
            </Button>
          </FooterModal>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default DeleteComponent;

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
