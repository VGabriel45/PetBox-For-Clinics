import React from "react";
import "../../Styles/PetDetails.css";
import CustomerProfileLogic from "./CustomerProfileLogic";

const CustomerProfileComponent = ({
  customer,
  customerImage,
  pets,
  appointments,
  questions,
}) => {
  const {
    cancelDeletion,
    showModal,
    openConfirmationModal,
    confirmDeletion,
  } = CustomerProfileLogic({ customer });

  return (
    <div>
      <div style={{ margin: "0 auto", width: "80%" }}>
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={
                        customerImage
                          ? customerImage
                          : customer.gender == "male"
                          ? "https://img.icons8.com/bubbles/2x/user-male.png"
                          : "https://img.icons8.com/bubbles/2x/audrey-hepburn.png"
                      }
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{customer.username}</h4>
                      <p className="text-secondary mb-1">{customer.email}</p>
                      <p className="text-muted font-size-sm">
                        {customer.age ? customer.age + " years old" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Questions asked:</h6>
                    <span className="text-secondary">{questions.length}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Appointments:</h6>
                    <span className="text-secondary">
                      {appointments.length}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Visits:</h6>
                    <span className="text-secondary">3</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Pets:</h6>
                    <span className="text-secondary">{pets.length}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Fullname</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {customer.firstName} {customer.lastName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {customer.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {customer.phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {customer.address}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3 title">
                        Pets
                      </h6>
                      {pets.map((pet) => (
                        <p style={{ textAlign: "left" }} key={pet.id}>
                          -{" "}
                          <a href={`/customers/${customer.id}/pets/${pet.id}`}>
                            {pet.name}
                          </a>{" "}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3 title">
                        Appointments
                      </h6>
                      {appointments.map((app) => (
                        <p key={app.id}>
                          -{" "}
                          <a
                            href={`/customers/${customer.id}/appointments/${app.id}`}
                          >
                            {app.reason}
                          </a>{" "}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "40%", margin: "0 auto" }}>
            <a
              href={`/customers/${customer.id}/addPet`}
              style={{ marginRight: "10%" }}
            >
              Add pet
            </a>
            <a
              href={`/customers/${customer.id}/updateCustomer`}
              style={{ marginRight: "10%" }}
            >
              Update customer data
            </a>
            {showModal ? (
              <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-content">
                  <span
                    onclick="document.getElementById('id01').style.display='none'"
                    className="close"
                    title="Close Modal"
                  >
                    &times;
                  </span>
                  <form className="modal-content" action="/action_page.php">
                    <div className="container">
                      <h1>Delete Customer</h1>
                      <p>Are you sure you want to delete this customer ?</p>

                      <div className="clearfix">
                        <button
                          type="button"
                          className="modalButton cancelbtn"
                          onClick={cancelDeletion}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="modalButton deletebtn"
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
            <a onClick={openConfirmationModal} className="deleteButton">
              Delete customer data
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileComponent;
