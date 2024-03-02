
import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import { getOrder } from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";


const Order = async({params}:{params:{id:string}}) => {
    const {id} = params;
    if(!id){
        return <NullData title="Oops! Access Denied"/>
    }
  const order = await getOrder(id); 
  if(!order){
    return <NullData title="Oops! Access Denied"/>
  }
  return (
    <div className="p-8">
        <Container>
            <OrderDetails order={order}/>
        </Container>
    </div>
  )
}

export default Order