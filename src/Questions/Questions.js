import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const [questions, setquestions] = useState([]);

  async function getQuestions() {
    await axios
      .get("http://localhost:8080/questions")
      .then((res) => setquestions(res.data));
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center", marginTop: "2%" }}>
        Questions asked by customers
      </h1>
      <Paper
        elevation={3}
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "5%",
          backgroundColor: "#3f51b5",
        }}
      >
        <List className={classes.root}>
          {questions.map((question) => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                {console.log(questions)}
              </ListItemAvatar>
              <Link
                to={`/customers/${question.customer.id}/questions/${question.id}`}
              >
                <ListItemText
                  key={question.id}
                  primary={question.text}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        <small key={question.id}>
                          <Link
                            to={`/customers/${question.customer.id}`}
                            key={question.id}
                          >
                            {question.author}
                          </Link>
                        </small>
                      </Typography>
                      {" - "}
                      {question.date}
                    </React.Fragment>
                  }
                />
              </Link>
            </ListItem>
          ))}

          <Divider variant="inset" component="li" />
        </List>
      </Paper>
    </React.Fragment>
  );
}
