import { Metadata } from "next";
import AdminNav from "../components/admin/AdminNav";

export const metadata: Metadata = {
    title: "E-Shop Admin",
    description: "Ecommerce App",
  };

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <div>
            <AdminNav/>
        </div>
        {children}
    </div>
  )
}

export default AdminLayout