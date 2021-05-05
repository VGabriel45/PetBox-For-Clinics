import React from "react";

const AppointmentComponent = ({ appointment, date, customerImage }) => {
  return (
    <>
      <div>
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={customerImage} alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                {appointment.customer ? (
                  <div>
                    <strong>{appointment.customer.firstName}</strong>{" "}
                    <small>@{appointment.customer.username}</small>{" "}
                  </div>
                ) : (
                  "Loading ..."
                )}
                <small>{date}</small>
                <br />
                Reason: {appointment.reason}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="reply">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="retweet">
                  <span class="icon is-small">
                    <i class="fas fa-retweet" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </>
  );
};

export default AppointmentComponent;
