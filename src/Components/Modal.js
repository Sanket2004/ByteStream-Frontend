import React from "react";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full z-[99999]">
      <div className="fixed w-[90%] md:max-w-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-slate-900 p-8 shadow-2xl">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          {title}
        </h2>

        <div className="mt-2 text-sm text-gray-500 whitespace-break-spaces break-all ">
          {children}
        {/* <div className="mt-4 flex flex-col md:flex-row gap-2 md:items-center"> */}
          <button
            type="button"
            className="rounded-xl bg-green-100 px-5 py-3 text-sm font-medium text-green-400 dark:bg-green-900"
            onClick={onClose}
          >
            OK
          </button>
        {/* </div> */}
        </div>

      </div>
    </div>
  );
};

export default Modal;
