import React, { useState } from "react";
import userService from "../../Services/user.service";

const CustomerProfileLogic = ({ customer }) => {
  const [confirmedDeletion, setconfirmedDeletion] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const { deleteCustomer } = userService({ customer: customer });

  const openConfirmationModal = () => {
    setshowModal(true);
  };

  const confirmDeletion = () => {
    setconfirmedDeletion(true);
    deleteCustomer();
  };

  const cancelDeletion = () => {
    setconfirmedDeletion(false);
    setshowModal(false);
  };

  return {
    cancelDeletion,
    showModal,
    openConfirmationModal,
    confirmDeletion,
  };
};

export default CustomerProfileLogic;
