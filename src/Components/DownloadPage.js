import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const FileDownload = () => {
  const { id } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const  id = "664e012bfda20726ab1540a4"

  const fetchFileInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/file/${id}`);
      setFileInfo(response.data);
      if (!response.data.passwordProtected) {
        initiateDownload(response.data.fileUrl);
      }
    } catch (err) {
      setError("Failed to fetch file information.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/file/${id}`, {
        password,
      });
      initiateDownload(response.data.path);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Incorrect password.");
      } else if (err.response && err.response.status === 401) {
        setError("Password required.");
      } else {
        setError("Failed to download file.");
      }
    } finally {
      setLoading(false);
    }
  };

  const initiateDownload = async (url) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileInfo.originalName; // Set the filename for download
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up by revoking the object URL
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to initiate download:", error);
      // Handle error
    }
  };

  return (
    <>
      <Navbar />
      <section className="dark:bg-slate-900 min-h-screen ">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="mx-auto max-w-screen-md text-center px-4">
            <h1 className="text-2xl font-bold sm:text-3xl text-slate-700 dark:text-slate-300 ">
              Download shared file
            </h1>
            <p className="mt-4 text-base text-slate-500 dark:text-slate-600 ">
              Download the file with password and if password not required then
              download it directly.
            </p>
          </div>
          <div className="mx-auto max-w-screen-xl text-center">
            <div className="mx-auto px-6 py-8 sm:px-6 lg:px-8 gap-16 items-center">
              <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
                <button
                  onClick={fetchFileInfo}
                  disabled={loading}
                  className="inline-block rounded-xl bg-slate-700 py-2 px-4 text-base font-medium text-white transition-all hover:bg-slate-800  focus:outline-none focus:ring ring-slate-400"
                >
                  {loading ? "Loading..." : "Download File"}
                </button>
                {fileInfo && (
                  <p className="text-base text-slate-500 dark:text-slate-200 ">
                    {fileInfo.originalName}
                  </p>
                )}
                {fileInfo && fileInfo.passwordProtected && (
                  <div className="flex flex-col gap-4 w-full">
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-xl px-4 mt-1 py-3 pe-12 text-base bg-slate-100 dark:bg-slate-950 focus:ring-1 ring-slate-400 focus:outline-none dark:text-slate-200 text-slate-700"
                    />
                    <button
                      onClick={handlePasswordSubmit}
                      disabled={loading}
                      className="inline-block rounded-xl bg-slate-700 px-5 py-2 text-base font-medium text-white transition-all hover:bg-slate-800  focus:outline-none focus:ring ring-slate-400"
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FileDownload;
