"use client";
import { useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Search Input */}
      <div className="mb-4">
  <div className="relative">
    {/* Search Icon */}
    <div className="absolute inset-y-0 left-0 flex items-center pl-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-[#637587]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search Users"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="bg-[#F0F2F5] p-2 pl-[50px] h-[48px] w-full font-Manrope rounded-[12px] outline-none placeholder:text-[#637587]"
    />
  </div>
</div>


      {/* Tablonun Dış Kapsayıcı Div'i */}
      <div className="rounded-[12px] overflow-hidden border border-[#DBE0E5]">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="font-Manrope">
              <th className="px-4 py-[13px] font-medium text-left">Business Name</th>
              <th className="px-4 py-[13px] font-medium text-left">Business Type</th>
              <th className="px-4 py-[13px] font-medium text-left">Business Acc ID</th>
              <th className="px-4 py-[13px] font-medium text-left">Instagram Acc</th>
              <th className="px-4 py-[13px] font-medium text-left">Facebook Acc</th>
              <th className="px-4 py-[13px] font-medium text-left">Telegram Manager</th>
              <th className="px-4 py-[13px] font-medium text-left">Role</th>
              <th className="px-4 py-[13px] font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t font-Manrope py-3 ">
                  <td className="px-4 py-[25px]">{user.username}</td>
                  <td className="px-4 py-[25px]">Sales</td>
                  <td className="px-4 py-[25px]">133343434</td>
                  <td className="px-4 py-[25px]">https://www.instagram.com/my_business</td>
                  <td className="px-4 py-[25px]">https://www.facebook.com/my_business</td>
                  <td className="px-4 py-[25px]">@manager_username</td>
                  
                  <td className="px-4 py-[13px] text-center ">
                    <span className="bg-[#F0F2F5] text-[#121417] w-24 py-1 rounded-xl flex justify-center">
                        User
                    </span>
                  </td>
                  <td className="px-4 py-[13px] text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 break-keep"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  There are no users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
