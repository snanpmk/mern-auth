import React, { useState, useEffect } from "react";
import { RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri"; // Import the icons from react-icons
import EditModal from "../../components/admin/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/admin/adminSlice";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedUser, setDeletedUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [data, setData] = useState([]);
  const { modalIsOpen } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  console.log(deletedUser); // Initialize deletedUser as null

  const fetchUsers = async () => {
    try {
      const res = await fetch("api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await res.json();
      setData(userData);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [modalIsOpen]);

  useEffect(() => {
    if (deletedUser) {
      setData(data.filter((user) => user._id !== deletedUser._id));
    }
  }, [deletedUser]);

  const filteredData = data.filter((item) => {
    return (
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (item) => {
    const id = item._id;
    console.log(id + "🐐🐐");
    const res = await fetch(`api/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDeletedUser(item); // Update the deletedUser state
    console.log(data);
  };

  const handleEdit = async (item) => {
    const id = item._id;
    // console.log(id + "🛒🐐🛒");
    setEditedUserData(item);

    dispatch(openModal());
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl mt-6 font-bold mb-8">Users</h1>

      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg mx-auto max-w-3xl p-4 ">
        <div className="flex p-6">
          <input
            type="text"
            className="w-full bg-slate-200 rounded-lg p-2 mb-4 border-none outline-none"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </div>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="justify-between">
              <th scope="col" className="px-6 py-3 text-center">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) =>
              item.role !== "admin" ? (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-right">
                    <img
                      src={item.profilePicture}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover mr-2"
                    />
                    {item.username}
                  </td>
                  <td className="px-6 py-4 text-center">{item.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="font-medium bg-blue-300 py-3 px-3 rounded-lg text-black hover:bg-opacity-80 mr-2"
                    >
                      <RiEdit2Fill />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="font-medium bg-red-300 py-3 px-3 rounded-lg text-black hover.bg-opacity-80"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <EditModal data={editedUserData} />
    </div>
  );
}

export default Dashboard;
