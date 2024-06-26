import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { LiaDownloadSolid } from "react-icons/lia";
import {
  RiFile2Line,
  RiFileExcel2Line,
  RiFileImageLine,
  RiFilePdf2Line,
  RiFilePpt2Line,
  RiFileTextLine,
  RiFileVideoLine,
  RiFileWord2Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function getFileIcon(extension) {
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return <RiFileImageLine />;
    case "pdf":
      return <RiFilePdf2Line />;
    case "doc":
    case "docx":
      return <RiFileWord2Line />;
    case "xls":
    case "xlsx":
      return <RiFileExcel2Line />;
    case "ppt":
    case "pptx":
      return <RiFilePpt2Line />;
    case "txt":
      return <RiFileTextLine />;
    case "mp4":
      return <RiFileVideoLine />;
    default:
      return <RiFile2Line />;
  }
}

function UploadedFilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/files`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles = files.filter(
    (file) =>
      file.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="dark:bg-slate-900 min-h-screen">
        <div className="mx-auto max-w-screen-md text-center pt-20 px-4">
          <h1 className="text-2xl font-bold sm:text-3xl text-slate-700 dark:text-slate-300">
            All shared files
          </h1>
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            readOnly={loading}
            className="mt-4 p-2 px-4 w-full max-w-screen-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 rounded-full focus:outline-none dark:focus:border-slate-500 text-slate-500 dark:text-slate-200"
          />
        </div>
        <div className="mx-auto max-w-screen-xl py-8 px-4 md:px-6">
          {loading ? (
            <p className="text-slate-600 dark:text-slate-400 text-center">
              Loading files...
            </p>
          ) : filteredFiles.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center">
              No files uploaded yet.
            </p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2 items-center">
              {filteredFiles.map((file) => (
                <li
                  key={file._id}
                  onClick={() => navigate(`/file/${file._id}`)}
                  className="relative mb-2 h-32 w-full bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <div className="mx-auto p-3 h-full w-full flex flex-col justify-between">
                    <p className="font-semibold text-xs text-center w-full border-b-2 border-slate-200 dark:border-slate-700 pb-1 truncate">
                      {file.originalName}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-4xl">
                        <span>
                          {getFileIcon(file.originalName.split(".").pop())}
                        </span>
                      </div>
                    </div>
                    <div className="border-t-2 w-full border-slate-200 dark:border-slate-700 flex flex-row items-center justify-between">
                      <div className="truncate max-w-22">
                        <p className="text-[10px] truncate">{file.createdBy}</p>
                        <p className="text-[8px] truncate">
                          {new Date(file.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-[10px] truncate">{file.downloads}</p>
                        <p className="text-[10px] truncate">
                          <LiaDownloadSolid />
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default UploadedFilesPage;
