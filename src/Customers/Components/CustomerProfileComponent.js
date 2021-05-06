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
    <>
      <div class="container">
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src={
                        customerImage
                          ? customerImage
                          : "https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png"
                      }
                      alt="Admin"
                      class="rounded-circle"
                      width="150"
                    />
                    <div class="mt-3">
                      <h4>{customer.username}</h4>
                      <p class="text-secondary mb-1">{customer.email}</p>
                      <p class="text-muted font-size-sm">
                        {customer.age} years old
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Questions asked:</h6>
                    <span class="text-secondary">{questions.length}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Appointments:</h6>
                    <span class="text-secondary">{appointments.length}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Visits:</h6>
                    <span class="text-secondary">3</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Pets:</h6>
                    <span class="text-secondary">{pets.length}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Fullname</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {customer.firstName} {customer.lastName}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{customer.email}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone number</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {customer.phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {customer.address}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div class="row gutters-sm">
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3 title">Pets</h6>
                      {pets.map((pet) => (
                        <p>
                          -{" "}
                          <a href={`/customers/${customer.id}/pets/${pet.id}`}>
                            {pet.name}
                          </a>{" "}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3 title">
                        Appointments
                      </h6>
                      {appointments.map((app) => (
                        <p>
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
                    <h1>Delete Customer</h1>
                    <p>Are you sure you want to delete this customer ?</p>

                    <div class="clearfix">
                      <button
                        type="button"
                        class="cancelbtn"
                        onClick={cancelDeletion}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="deletebtn"
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
    </>
  );
};

export default CustomerProfileComponent;
