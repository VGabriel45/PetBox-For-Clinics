import React from "react";

const AppointmentComponent = ({ appointment, date, customerImage }) => {
  return (
    <div>
      <div>
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={customerImage} alt="customerImg" />
            </figure>
          </div>
          <div className="">
            <div className="">
              <p style={{ textAlign: "left" }}>
                {appointment.customer ? (
                  <>
                    <strong>{appointment.customer.firstName}</strong>{" "}
                    <small>@{appointment.customer.username}</small>{" "}
                  </>
                ) : (
                  "Loading ..."
                )}
                <small>Date: {date}</small>
                <br />
                Reason: {appointment.reason}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default AppointmentComponent;
