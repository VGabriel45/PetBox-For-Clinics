import React from "react";

const AppointmentComponent = ({ appointment, date, customerImage }) => {
  return (
    <div>
      <div>
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={customerImage} alt="Image" />
            </figure>
          </div>
          <div class="">
            <div class="">
              <p style={{ textAlign: "left" }}>
                {appointment.customer ? (
                  <div>
                    <strong>{appointment.customer.firstName}</strong>{" "}
                    <small>@{appointment.customer.username}</small>{" "}
                  </div>
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
