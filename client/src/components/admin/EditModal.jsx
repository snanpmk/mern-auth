import React, { useState } from "react";
import { closeModal } from "../../redux/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";

function EditModal({ data }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { modalIsOpen } = useSelector((state) => state.admin);
  const modalClassName = `fixed inset-0 flex items-center justify-center z-50 ${
    modalIsOpen ? "flex" : "hidden"
  }`;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`api/user/update/${data?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const userdata = await res.json();
      console.log(userdata.username + "🚀🚀🚀🚀");
      if (data.success == false) {
        return;
      }
      handleClose()
    } catch (error) {
      console.log(error + "error in upadating user form admin page");
    }
  };

  return (
    <>
      <div id="default-modal" className={modalClassName}>
        <div className="fixed inset-0 bg-gray-900 opacity-70"></div>{" "}
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit user credentials
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span onClick={handleClose} className="sr-only">
                  Close modal
                </span>
              </button>
            </div>
            <div className="p-6 space-y-6 max-w-lg mx-auto">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="username"
                  placeholder="Username"
                  id="username"
                  className="bg-slate-200 p-3 rounded-lg"
                  autoComplete="Username"
                  defaultValue={data?.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  id="email"
                  className="bg-slate-200 p-3 rounded-lg"
                  autoComplete="Email"
                  defaultValue={data?.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Update assword"
                  id="password"
                  className="bg-slate-200 p-3 rounded-lg"
                  autoComplete="password"
                  onChange={handleChange}
                />
                <div className="flex items-center justify-start gap-4  border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    onClick={handleClose}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
