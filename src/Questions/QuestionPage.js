import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import authHeader from "../Services/auth-header";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const classes = useStyles();
  const [question, setquestion] = useState({});
  const [response, setresponse] = useState();
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const questionId = params.questionId;

  async function markAsSolved() {
    await axios.put(
      `http://localhost:8080/customers/${customerId}/questions/${questionId}/setSolved`,
      { headers: authHeader() }
    );
  }

  async function getQuestion() {
    await axios
      .get(
        `http://localhost:8080/customers/${customerId}/questions/${questionId}`,
        { headers: authHeader() }
      )
      .then((res) => setquestion(res.data));
  }

  function handleChange(event) {
    setresponse(event.target.value);
    console.log(question);
  }

  function formatDateWithoutTime(date) {
    var parsedDate = new Date(date);
    return parsedDate.toLocaleString();
  }

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.put(
      `http://localhost:8080/customers/${customerId}/questions/${questionId}/setResponse`,
      {
        date: question.date,
        solved: true,
        text: question.text,
        author: question.author,
        seen: true,
        response: response,
        customer: question.customer,
      },
      { headers: authHeader() }
    );
    history.push("/questions");
    window.location.reload("/questions");
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <Container>
      <Link to="/dash">Back to dashboard</Link>
      <p>
        Question author{" "}
        <small>
          <Link to={`http://localhost:8080/customers/${customerId}`}>
            <strong>{question.author}</strong>
          </Link>
        </small>
      </p>
      <Paper>
        <p>
          Question: <strong>{question.text}</strong>
        </p>
        Response: <strong>{question.response}</strong>
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
            <label for="floatingTextarea1">
              {question.response ? "Already responded" : "Add response"}
            </label>
          </div>
          {/* <Link to={`/successPage`}>
            {" "} */}
          <button type="submit" className="btn btn-primary">
            Submit response
          </button>
          {/* </Link> */}
        </form>
        <br />
        <p>
          Question date: <strong>{formatDateWithoutTime(question.date)}</strong>
        </p>
        {/* Mark as solved:{" "}
        <Checkbox
          checked={question.solved ? true : false}
          onClick={markAsSolved}
          name="checkedB"
          color="primary"
        />
        {console.log(question.solved)} */}
      </Paper>
    </Container>
  );
}
