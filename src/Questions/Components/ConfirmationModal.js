import React from "react";

const ConfirmationModal = ({
  showModal,
  confirmDeletion,
  cancelDeletion,
  openConfirmationModal,
}) => {
  return (
    <div>
      {showModal ? (
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-content">
            <span
              onclick="document.getElementById('id01').style.display='none'"
              class="close"
              title="Close Modal"
            >
              &times;
            </span>
            <form class="modal-content" action="/action_page.php">
              <div class="container">
                <h1>Delete Question</h1>
                <p>Are you sure you want to delete this question ?</p>

                <div class="clearfix">
                  <button
                    type="button"
                    class="modalButton cancelbtn"
                    onClick={cancelDeletion}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="modalButton deletebtn"
                    onClick={confirmDeletion}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <a onClick={openConfirmationModal} className="btn btn-danger">
        Delete question
      </a>
    </div>
  );
};

export default ConfirmationModal;
