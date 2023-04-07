/* eslint-disable */
import { useState, React, useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

function myToast({ type, isShow, msgInfo }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(isShow);
    setInterval(() => {
      setShow(false);
    }, 2000);
  }, [isShow]);
  return (
    <>
      {" "}
      {show ? (
        <ToastContainer className="mt-1" position={"top-center"}>
          <Toast show={show} bg={type}>
            {/* <Toast.Header className="bg-dark">
          <strong className="me-auto text-white">Notification</strong>
        </Toast.Header> */}
            <Toast.Body className={"text-white text-center"}>
              <strong> {msgInfo}</strong>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default myToast;
