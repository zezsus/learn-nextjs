/** @format */
"use client";
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PreviewIcon from "@mui/icons-material/Preview";
import { useState } from "react";
import EditComponent from "./EditComponent";
import DeleteComponent from "./DeleteComponent";
import Link from "next/link";

interface IProps {
  blogs: IBlog[];
}

export default function TableComponent(props: IProps) {
  const { blogs } = props;
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog>({
    id: 0,
    title: "",
    author: "",
    content: "",
  });

  const handleEidt = (editItem: IBlog) => {
    setShowEdit(true);
    setBlog(editItem);
  };

  const handleDelete = (deleteItem: IBlog) => {
    setShowDelete(true);
    setBlog(deleteItem);
  };

  return (
    <Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ fontWeight: "bold" }}>
                  No
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: "bold" }}>
                  Author
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs?.map((item: any, index: number) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell align='center' sx={{ fontWeight: "bold" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell align='center'>
                      <IconButton>
                        <NavLink href={`/blogs/${item.id}`}>
                          <PreviewIcon color='primary' titleAccess='View' />
                        </NavLink>
                      </IconButton>

                      <IconButton onClick={() => handleEidt(item)}>
                        <EditCalendarIcon color='warning' titleAccess='Edit' />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(item)}>
                        <DeleteForeverIcon color='error' titleAccess='Delete' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {showEdit && (
        <EditComponent
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          blog={blog}
        />
      )}

      {showDelete && (
        <DeleteComponent
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          blog={blog}
        />
      )}
    </Container>
  );
}

const NavLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
