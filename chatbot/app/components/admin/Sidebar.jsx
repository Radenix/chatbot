'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UsersIcon from "../../assets/icons/usersIcon.svg";
import AnalyticsIcon from "../../assets/icons/analyticsIcon.svg";
import logoutIcon from "../../assets/icons/logoutIcon.svg";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    phone: "",
    facebookAccount: "",
    instagramAccount: "",
    telegramManager: "",
    password: ""
  });

  const pathname = usePathname();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhaXN0YXRpb24tQjc2ME0tUHJvLVJTIiwic3ViIjoiMDU1NzI1MDQwNSJ9.g09CK3Yb7bJQa9c_QQsiGj0XmEM1VJi0C4B0AqwXIbk";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://enabled-prompt-vervet.ngrok-free.app/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}` 
        },
        body: JSON.stringify({
          phone: formData.phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          facebookAccount: formData.facebookAccount,
          telegramManager: formData.telegramManager,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("User added successfully!");
        setIsModalOpen(false); 
        setFormData({ 
          businessName: "",
          businessType: "",
          phone: "",
          facebookAccount: "",
          instagramAccount: "",
          telegramManager: "",
          password: ""
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add user: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-64 h-full flex flex-col px-3 pt-1 relative">
      <nav className="flex-1 font-Manrope">
        <ul className="space-y-2 mt-4">
          <li>
            <Link href="/admin/users" legacyBehavior>
              <a className={`flex items-center px-4 py-2 rounded-[12px] space-x-3 ${pathname === "/admin/users" ? "bg-[#F0F2F5] text-[#121417]" : "hover:bg-[#F0F2F5] text-[#121417]"}`}>
                <Image src={UsersIcon} alt="Users" width={20} height={20} />
                <span>Users</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics" legacyBehavior>
              <a className={`flex items-center px-4 py-2 rounded-[12px] space-x-3 ${pathname === "/admin/analytics" ? "bg-[#F0F2F5] text-[#121417]" : "hover:bg-[#F0F2F5] text-[#121417]"}`}>
                <Image src={AnalyticsIcon} alt="Analytics" width={20} height={20} />
                <span>Analytics</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>

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

      <div className="pb-4">
        <Link href="/logout" legacyBehavior>
          <a className="flex items-center px-4 py-2 rounded-[12px] space-x-3 hover:bg-[#F0F2F5] text-[#121417]">
            <Image src={logoutIcon} alt="Logout" width={20} height={20} />
            <span>Logout</span>
          </a>
        </Link>
      </div>

      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-Manrope font-semibold text-[#121417]">Add New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl font-semibold">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <input
                  name="businessName"
                  type="text"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="businessType"
                  type="text"
                  placeholder="Business Type"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="facebookAccount"
                  type="text"
                  placeholder="Facebook Account"
                  value={formData.facebookAccount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="telegramManager"
                  type="text"
                  placeholder="Telegram Manager"
                  value={formData.telegramManager}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

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
