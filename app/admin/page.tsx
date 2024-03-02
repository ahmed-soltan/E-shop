import { getProducts } from "@/actions/getProducts";
import Summary from "./Summary";
import { getOrders } from "@/actions/getOrders";
import { getUsers } from "@/actions/getUsers";
import Container from "../components/Container";

const page = async () => {
  const users = await getUsers();
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
};

export default page;
