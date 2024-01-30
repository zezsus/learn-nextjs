/** @format */

"use client";

import SpinnerComponent from "@/components/SpinnerComponent";
import TableComponent from "@/components/TableComponent";
import { Box, Button, Stack, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useSWR from "swr";
import { useState } from "react";
import AddComponent from "@/components/AddComponent";

const HomePage = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const fetcher = (url: any) =>
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .catch((error: any) => console.log(error));

  const { data, isLoading, error } = useSWR(
    "http://localhost:8000/blogs",
    fetcher
  );

  if (isLoading) {
    return <SpinnerComponent />;
  }
  return (
    <Stack
      spacing={2}
      pt={1}
      bgcolor={"#DDDDDD"}
      height={"89.9vh"}
      alignItems={"center"}>
      <ButtonAdd>
        <Button variant='contained' onClick={() => setShowAdd(true)}>
          <AddIcon />
        </Button>
      </ButtonAdd>

      <TableComponent blogs={data} />
      {showAdd && <AddComponent showAdd={showAdd} setShowAdd={setShowAdd} />}
    </Stack>
  );
};

export default HomePage;

const ButtonAdd = styled(Box)({
  width: "90%",
  display: "flex",
  alignItems: "flex-start",
});
