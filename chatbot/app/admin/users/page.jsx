// app/admin/users/page.jsx
import UserTable from "../../components/admin/UserTable";

const AdminUsersPage = () => {
  return (
    <div>
      <h1 className="text-2xl text-[#121417] font-Manrope font-bold mb-4">Users</h1>
      <UserTable />
    </div>
  );
};

export default AdminUsersPage;
