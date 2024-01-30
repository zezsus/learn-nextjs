/** @format */
"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import useSWR, { Fetcher } from "swr";
import SpinnerComponent from "@/components/SpinnerComponent";

export default function BlogDetail({ params }: { params: { idblog: string } }) {
  console.log(params);

  const fetcher: Fetcher<IBlog, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.idblog}`,
    fetcher
  );

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Stack sx={{ display: "flex", alignItems: "center" }} pt={2}>
      <Card sx={{ maxWidth: "50%" }}>
        <CardContent>
          <Typography
            variant='h5'
            sx={{ textTransform: "capitalize" }}
            gutterBottom>
            {data?.title}
          </Typography>

          <Box display='flex' alignItems='center'>
            <Typography component={"div"} gutterBottom>
              Author:
            </Typography>
            <Typography
              component='div'
              gutterBottom
              pl={1}
              sx={{ textTransform: "capitalize" }}>
              {data?.author}
            </Typography>
          </Box>

          <Box>
            <Typography component={"div"} gutterBottom>
              Content
            </Typography>
            <Typography component='div' sx={{ textAlign: "justify" }}>
              {data?.content}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
