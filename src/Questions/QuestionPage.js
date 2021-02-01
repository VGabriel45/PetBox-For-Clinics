import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  const [question, setquestion] = useState([]);
  const [response, setresponse] = useState();
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const questionId = params.questionId;

  async function markAsSolved() {
    await axios.get(
      `http://localhost:8080/customers/${customerId}/questions/${questionId}/setSolved`
    );
  }

  async function getQuestion() {
    await axios
      .get(
        `http://localhost:8080/customers/${customerId}/questions/${questionId}`
      )
      .then((res) => setquestion(res.data));
  }

  function handleChange(event) {
    setresponse(event.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.get(
      `http://localhost:8080/customers/${customerId}/questions/${questionId}/setResponse`,
      {
        response: data.get("response"),
      }
    );
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <Container>
      <p>
        Question author{" "}
        <small>
          <Link to={`http://localhost:8080/customers/${customerId}`}>
            {question.author}
          </Link>
        </small>
      </p>
      <Paper>
        <p>Question: {question.text}</p>
        Response: <small>{response}</small>
        <form className="form-signin" method="post" onSubmit={submitForm}>
          <div class="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="response"
              style={{ height: "100px" }}
              onChange={handleChange}
              name="response"
            ></textarea>
            <label for="floatingTextarea2">Add your response</label>
          </div>
          {/* <Link to={`/successPage`}>
            {" "} */}
          <button type="submit" className="btn btn-primary">
            Submit response
          </button>
          {/* </Link> */}
        </form>
        <p>Question date: {question.date}</p>
        Mark as solved:{" "}
        <Checkbox
          checked={question.solved ? true : false}
          onClick={markAsSolved}
          name="checkedB"
          color="primary"
        />
        {console.log(question.solved)}
      </Paper>
    </Container>
  );
}
