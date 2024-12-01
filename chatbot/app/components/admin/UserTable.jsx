"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://enabled-prompt-vervet.ngrok-free.app/api/v1/admin/users`, {withCredentials: true},
          {
            params: {
              page: currentPage * usersPerPage + 1, // Calculate the correct page (offset)
              pageSize: usersPerPage, // Limit
            },
            
          }
        );
        setUsers(response.data.users);
        setTotalCount(response.data.totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]); // Trigger when currentPage changes

  const filteredUsers = users.filter(
    (user) =>
      user.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.businessType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id, role) => {
    if (role === "admin") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot delete an admin user!",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        }
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Calculate the total number of pages based on totalCount and usersPerPage
  const totalPages = Math.ceil(totalCount / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      <div className="rounded-[12px] overflow-hidden border border-[#DBE0E5]">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="font-Manrope">
                <th className="px-4 py-[13px] font-medium text-left">Name</th>
                <th className="px-4 py-[13px] font-medium text-left">Type</th>
                <th className="px-4 py-[13px] font-medium text-left">Phone</th>
                <th className="px-4 py-[13px] font-medium text-left">
                  Instagram
                </th>
                <th className="px-4 py-[13px] font-medium text-left">
                  Facebook
                </th>
                <th className="px-4 py-[13px] font-medium text-left">
                  Telegram
                </th>
                <th className="px-4 py-[13px] font-medium text-left">
                  Joined At
                </th>
                <th className="px-4 py-[13px] font-medium text-left">Role</th>
                <th className="px-4 py-[13px] font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t font-Manrope py-3">
                    <td className="px-4 py-[25px]">{user.businessName}</td>
                    <td className="px-4 py-[25px] text-[#637587]">
                      {user.businessType}
                    </td>
                    <td className="px-4 py-[25px] text-[#637587]">
                      {user.phone}
                    </td>
                    <td className="px-4 py-[25px] text-[#637587]">
                      {user.instagramAccount}
                    </td>
                    <td className="px-4 py-[25px] text-[#637587]">
                      {user.facebookAccount}
                    </td>
                    <td className="px-4 py-[25px] text-[#637587]">
                      {user.telegramManager}
                    </td>
                    <td className="px-4 py-[25px] text-[#637587]">
                      {formatDate(user.joinedAt)}
                    </td>
                    <td className="px-4 py-[13px] text-center">
                      <span className="bg-[#F0F2F5] text-[#121417] w-24 py-1 rounded-xl flex justify-center">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-[13px] text-center">
                      <button
                        onClick={() => handleDelete(user.id, user.role)}
                        className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 break-keep ${
                          user.role === "admin"
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        disabled={user.role === "admin"}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() =>
            setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)
          }
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 flex items-center justify-center"
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <span className="flex items-center">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage(currentPage < totalPages - 1 ? currentPage + 1 : currentPage)
          }
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 flex items-center justify-center"
          disabled={currentPage === totalPages - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default UserTable;
