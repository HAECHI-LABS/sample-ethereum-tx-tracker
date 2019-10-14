import React from "react";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing(1),
    },
  }));

export default function ({arg}) {
    const classes = useStyles();
    return (
        <Chip
            size="small"
            className={classes.chip}
            label={`${arg[0]}: ${arg[1]} `} >
        </Chip>
    )
}
