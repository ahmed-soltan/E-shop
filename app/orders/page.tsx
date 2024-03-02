import { getCurrentUser } from "@/actions/getCurrentUser";
import { getOrderByUserId } from "@/actions/getOrdersByUserId";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import OrderClient from "./OrderClient";

const ManageOrders = async() => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return <NullData title="Oops! Access Denied"/>
  }

  const orders = await getOrderByUserId(currentUser.id);
  return (
    <div className="p-8">
      <Container>
        <OrderClient orders={orders}/>
      </Container>
    </div>
  )
}

export default ManageOrders