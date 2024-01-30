/** @format */

import { Box, CircularProgress, styled } from "@mui/material";

const SpinnerComponent = () => {
  return (
    <Div>
      <CircularProgress />
    </Div>
  );
};
export default SpinnerComponent;

const Div = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "2rem",
});
