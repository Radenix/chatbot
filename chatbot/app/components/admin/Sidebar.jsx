'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import UsersIcon from "../../assets/icons/usersIcon.svg";
import AnalyticsIcon from "../../assets/icons/analyticsIcon.svg";
import logoutIcon from "../../assets/icons/logoutIcon.svg";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const pathname = usePathname(); // Mevcut route'u alır

  return (
    <div className="w-64 h-full flex flex-col px-3 pt-1 relative">
      {/* Routes */}
      <nav className="flex-1 font-Manrope">
        <ul className="space-y-2 mt-4">
          <li>
            <Link
              href="/admin/users"
              className={`flex items-center px-4 py-2 rounded-[12px] space-x-3 ${
                pathname === "/admin/users" ? "bg-[#F0F2F5] text-[#121417]" : "hover:bg-[#F0F2F5] text-[#121417]"
              }`}
            >
              <Image src={UsersIcon} alt="Users" width={20} height={20} />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/analytics"
              className={`flex items-center px-4 py-2 rounded-[12px] space-x-3 ${
                pathname === "/admin/analytics" ? "bg-[#F0F2F5] text-[#121417]" : "hover:bg-[#F0F2F5] text-[#121417]"
              }`}
            >
              <Image src={AnalyticsIcon} alt="Analytics" width={20} height={20} />
              <span>Analytics</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* New User Button (Only on /admin/users) */}
      {pathname === "/admin/users" && (
        <div className="pb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-[12px] font-Manrope font-medium"
          >
            New User
          </button>
        </div>
      )}

      {/* Logout Button */}
      <div className="pb-4">
        <Link
          href="/logout"
          className="flex items-center px-4 py-2 rounded-[12px] space-x-3 hover:bg-[#F0F2F5] text-[#121417]"
        >
          <Image src={logoutIcon} alt="Logout" width={20} height={20} />
          <span>Logout</span>
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)}  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 w-[400px] shadow-lg animate-fadeIn relative ">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-Manrope font-semibold text-[#121417]">Add New User</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-semibold"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <form>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Business Type"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Business Account Id"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Instagram Account"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Facebook Account"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Telegram Manager"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-[12px] font-Manrope font-medium"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
