import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: '30px',
      padding: '20px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blue[500],
    },
  }),
);
interface ClinicCardProps {
  id: number;
  name: string;
  address: string;
  expanded: number;
  expandChild: (arg1: number) => void;
  children: React.ReactNode;
}

export const ClinicCard = ({
  id,
  expanded,
  name,
  address,
  children,
  expandChild,
}: ClinicCardProps) => {
  const classes = useStyles();

  function handleExpansion() {
    if (expanded === id) expandChild(-1);
    else expandChild(id);
  }

  const logo: (arg1: string, arg2: boolean) => string = (
    name: string,
    capital: boolean,
  ) => {
    const casedLetter: (arg: string) => string = (letter: string) =>
      capital ? letter.toUpperCase() : letter.toLowerCase();
    const words = name.split(' ');
    switch (true) {
      case words.length > 1:
        return words.map((word: string) => casedLetter(word[0])).join('');
      case name.length > 3:
        return (
          casedLetter(name[0]) + casedLetter(name[1]) + casedLetter(name[name.length - 1])
        );
      default:
        return name;
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {logo(name, true)}
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={`/src/assets/images/${logo(name, false)}_building.jpeg`}
        // image="https://source.unsplash.com/random"
        title={name}
      />
      <CardContent style={{ height: '10px' }}>
        <Typography variant="body2" color="textSecondary" component="p">
          {address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded === id,
          })}
          onClick={handleExpansion}
          aria-expanded={expanded === id}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded === id} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
};
