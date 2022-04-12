import {makeStyles} from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,0.3)",
    width: "100%",
    padding: "5px",
  },
  select: {
    padding: theme.spacing(.7),
    border: "1px solid rgba(0,0,0,0.3)",
    borderRadius: theme.spacing(.4),
    minWidth:"150px",
    fontFamily: "Poppins",
    textTransform: "capitalize",
  },
}));

export default useStyles;