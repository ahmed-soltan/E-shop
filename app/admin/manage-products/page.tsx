import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import { getProducts } from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async() => {
  const product = await getProducts({category:null});
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role!=="ADMIN"){
    return <NullData title="Oops! Access Denied"/>
  }
  return (
    <div className="p-8">
      <Container>
        <ManageProductsClient products={product}/>
      </Container>
    </div>
  );
};

export default ManageProducts;
