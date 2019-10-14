import React from 'react';
import { GoMarkGithub } from "react-icons/go";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 3),
      margin: theme.spacing(4, 4)
    },
  }));
  

function MetaInfoPaper() {
    const classes = useStyles();

    return <Paper className={classes.root}>
        <Typography>
        You are now Tracking Transaction.
        For more information: 
        <a href="https://github.com/haechi-labs/" target="_blank" >
            <GoMarkGithub />
        </a>
        </Typography>

    </Paper>
}

export default MetaInfoPaper;