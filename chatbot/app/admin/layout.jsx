import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-white">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
