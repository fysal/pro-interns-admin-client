import { Button, ButtonGroup, Typography } from '@material-ui/core';
import React from 'react';
import{makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  btnText: {
    fontSize: "16px",
  },
  prevNext: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "16px",
  },
  btnGroup: {
    margin: "20px",
  },
  btnActive: {
    background: "#042F5C",
    color: "#ffffff",
    "&:hover": {
      background: "#042F5C",
      color: "#f16731",
    },
  },
}));

const Pagination = ({
  pages,
  handlePrevious,
  onHandleChange,
  handleNext,
  currentPage,
  maxPageNumberLimit,
  minPageNumberLimit,
}) => {
    const classes = useStyles()
  return (
    <>
      <ButtonGroup className={classes.btnGroup}>
        <Button
          onClick={() => handlePrevious()}
          disabled={currentPage === pages[0]}
          className={classes.prevNext}
        >
          Previous
        </Button>
        {pages.map((number) =>
          number < maxPageNumberLimit + 1 && number > minPageNumberLimit ? (
            <Button
              onClick={() => onHandleChange(number)}
              className={number === currentPage ? classes.btnActive : null}
              key={number}
            >
              {number}
            </Button>
          ) : null
        )}
        <Button
          className={classes.prevNext}
          disabled={currentPage === pages[pages.length - 1]}
          onClick={() => handleNext()}
        >
          <Typography variant="body1" className={classes.prevNext}>
            Next
          </Typography>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Pagination