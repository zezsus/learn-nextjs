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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PreviewIcon from "@mui/icons-material/Preview";
import { useState } from "react";
import EditComponent from "./EditComponent";

interface IProps {
  blogs: IBlog[];
}

export default function TableComponent(props: IProps) {
  const { blogs } = props;
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [editItem, setEidtItem] = useState<IBlog>({
    id: 0,
    title: "",
    author: "",
    content: "",
  });

  const handleEidt = (editItem: any) => {
    setShowEdit(true);
    setEidtItem(editItem);
  };

  const handleDelete = (id: number) => {
    setShowDelete(true);
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
                        <PreviewIcon color='primary' titleAccess='View' />
                      </IconButton>

                      <IconButton onClick={() => handleEidt(item)}>
                        <EditCalendarIcon color='warning' titleAccess='Edit' />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(item.id)}>
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
          editItem={editItem}
          setEditItem={setEidtItem}
        />
      )}
    </Container>
  );
}
