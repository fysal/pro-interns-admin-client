import { Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

const CircularProgressWidget = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        {...props}
        className={clsx(
          props.value === 100
            ? "text-success"
            : props.value > 50
            ? "text-warning"
            : "text-danger"
        )}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <span className="small text-secondary">
          {`${Math.round(props.value)}%`}
        </span>
      </Box>
    </Box>
  );
};

export default CircularProgressWidget;
