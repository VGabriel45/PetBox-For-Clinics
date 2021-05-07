import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import authHeader from "../Services/auth-header";
import { useHistory } from "react-router-dom";
import NavigationBar from "../Navbar/NavigationBar";
import ConfirmationModal from "./Components/ConfirmationModal";

export default function AlignItemsList(props) {
  const history = useHistory();
  const [question, setquestion] = useState({});
  const [response, setresponse] = useState("");
  const [showTextArea, setshowTextArea] = useState(false);
  const [showConfirmationModal, setshowConfirmationModal] = useState(false);

  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const questionId = params.questionId;

  async function markAsSolved() {
    await axios
      .get(
        `http://localhost:8080/customers/${customerId}/questions/${questionId}/setSolved`,
        { headers: authHeader() }
      )
      .then(() => window.location.reload());
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

  function deleteQuestion() {
    axios
      .delete(
        `http://localhost:8080/customers/${customerId}/questions/${questionId}`,
        { headers: authHeader() }
      )
      .then(() => {
        history.push("/questions");
        window.location.reload("/questions");
      });
  }

  function showTextareaInput() {
    if (showTextArea === true) {
      setshowTextArea(false);
    } else {
      setshowTextArea(true);
    }
  }

  useEffect(() => {
    getQuestion();
    console.log(showTextArea);
  }, [showTextArea]);

  return (
    <div>
      <NavigationBar />
      <Container style={{ marginTop: "5%" }}>
        <Link to="/dash">Back to dashboard</Link>
        <br />
        <br />
        <div class="box">
          <div class="card-content">
            <p class="title">{question.text}</p>
            <p class="subtitle">{question.author}</p>
            <p>
              Question date:{" "}
              <strong>{formatDateWithoutTime(question.date)}</strong>
            </p>
          </div>
          <form className="form-signin" method="post" onSubmit={submitForm}>
            {showTextArea ? (
              <div>
                <textarea
                  className="form-control"
                  placeholder="Leave a response here"
                  id="response"
                  style={{ height: "100px" }}
                  onChange={handleChange}
                  name="response"
                  required
                ></textarea>
                <label for="floatingTextarea1">
                  {question.response ? "Already responded" : "Add response"}
                </label>
              </div>
            ) : (
              ""
            )}

            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  {showTextArea ? (
                    <button type="submit" className="btn btn-success">
                      Submit response
                    </button>
                  ) : (
                    <a className="btn btn-primary" onClick={showTextareaInput}>
                      Add response
                    </a>
                  )}
                </span>
              </p>
              <p class="card-footer-item">
                <ConfirmationModal
                  showModal={showConfirmationModal}
                  confirmDeletion={deleteQuestion}
                  cancelDeletion={() => setshowConfirmationModal(false)}
                  openConfirmationModal={() => setshowConfirmationModal(true)}
                />
              </p>
            </footer>
          </form>
          <div>
            Mark as solved:{" "}
            {question.solved ? (
              <input
                type="checkbox"
                name="solved"
                id="solved"
                checked
                onClick={markAsSolved}
              />
            ) : (
              <input
                type="checkbox"
                name="not solved"
                id="not solved"
                onClick={markAsSolved}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
