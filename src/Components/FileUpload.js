import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Modal from "./Modal";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [fileLink, setFileLink] = useState(""); // Store the file link
  const [fileName, setFileName] = useState(""); // Store the file link
  const [uploadMessage, setUploadMessage] = useState(""); // State for the message displayed after form submission
  const [emailSentMessage, setEmailSentMessage] = useState(""); // State for the message displayed after sending the email

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    const formData = new FormData();
    formData.append("file", file);
    formData.append("createdBy", userName);
    if (password) formData.append("password", password);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const appUrl = window.location.origin;
      const uploadMessage = `File uploaded successfully: ${appUrl}/file/${response.data.fileLink}`;
      setModalTitle("Upload Successful");
      setFileLink(response.data.fileLink);
      setFileName(response.data.fileName);

      // Set upload message
      setUploadMessage(uploadMessage);

      // Automatically send email after upload
      await sendEmail(response.data.fileLink, email, response.data.fileName);

      setShowModal(true);
    } catch (error) {
      console.error(error);
      setModalTitle("Upload Failed");
      setMessage(error.response?.data?.error || error.message);
      setShowModal(true);
    } finally {
      setLoading(false); // Set loading back to false after upload finishes
    }
  };

  const sendEmail = async (fileLink, email, fileName) => {
    // Clear previous email sent message
    setEmailSentMessage("");

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-email`, {
        email,
        fileLink,
        fileName,
      });
      setEmailSentMessage(`Email sent to ${email}`);
    } catch (error) {
      console.error("Email sending error:", error);
      setEmailSentMessage(
        `Failed to send email to ${email}. Please try again later.`
      );
    } finally {
      // Show the modal
      setShowModal(true);
    }
  };

  const handleSendEmail = async () => {
    await sendEmail(fileLink, email, fileName);
  };

  // Callback function to reset email field when modal is closed
  const handleModalClose = () => {
    // Clear form fields and reset file input
    setFile(null); // Clear file input
    setPassword("");
    setUserName("");
    setEmail("");
    // Reset file input value in the DOM
    document.getElementById("file-input").value = ""; // Assuming your file input has an id of 'file-input'

    setShowModal(false);
  };

  return (
    <div className="w-full dark:bg-slate-900 dark:text-white">
      <Navbar />
      <section className="dark:bg-slate-900 min-h-screen ">
        <div className="mx-auto max-w-screen-md text-center pt-20 px-4">
          <h1 className="text-2xl font-extrabold sm:text-3xl text-slate-700 dark:text-slate-300 ">
            Share your file securely
          </h1>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-600 ">
            Upload your file and receive a secure link to share or download it
            instantly. Enjoy seamless and efficient file transfers with our
            easy-to-use interface.
          </p>
        </div>
        <div className="max-w-screen-xl mx-auto px-6 sm:px-6 lg:px-8 pb-12 sm:pt-2 items-center">
          <div className="">
            <form
              onSubmit={onSubmit}
              className="mx-auto mb-0 mt-8 max-w-screen-md space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="text-base text-slate-700 dark:text-slate-200"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userName}
                    onChange={onUserNameChange}
                    required
                    className="w-full rounded-xl px-4 mt-1 py-3 pe-12 text-base bg-slate-100 dark:bg-slate-950 focus:ring-1 ring-slate-400 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base text-slate-700 dark:text-slate-200"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    required
                    className="w-full rounded-xl px-4 mt-1 py-3 pe-12 text-base bg-slate-100 dark:bg-slate-950 focus:ring-1 ring-slate-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-base text-slate-700 dark:text-slate-200"
                >
                  File Password (optional)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    className="w-full rounded-xl px-4 mt-1 py-3 pe-12 text-base bg-slate-100 dark:bg-slate-950 focus:ring-1 ring-slate-400 focus:outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="text-base text-slate-700 dark:text-slate-200"
                >
                  Choose File (Max size 5mb)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-input"
                    onChange={onFileChange}
                    className="w-full rounded-xl px-4 mt-1 py-3 pe-12 text-base bg-slate-100 dark:bg-slate-950 focus:ring-1 ring-slate-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-block rounded-xl bg-slate-700 px-5 py-3 text-base font-medium text-white w-full transition-all hover:bg-slate-800  focus:outline-none focus:ring ring-slate-400"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </section>
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[9999]">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-slate-800 dark:border-slate-400"></div>
        </div>
      )}
      {showModal && (
        <Modal title={modalTitle} message={message} onClose={handleModalClose}>
          {fileLink && (
            <>
              <div className="mb-4">{uploadMessage}</div>
              {emailSentMessage && (
                <div className="mb-4">{emailSentMessage}</div>
              )}
              <button
                onClick={handleSendEmail}
                className="inline-block mr-4 rounded-xl bg-slate-700 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring ring-slate-400"
              >
                Send Email
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default FileUpload;
