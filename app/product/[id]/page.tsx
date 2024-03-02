
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { getProducts } from "@/actions/getProducts";
import NullData from "@/app/components/NullData";
import Addrating from "./Addrating";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Product = async({params}:{params:{id?:string}}) => {
  const products =await getProducts({category:null})
  const user = await getCurrentUser()
  const product = products.find(item=>item.id === params.id)
  if(products.length < 0) {
    return <NullData title="Oops!! , No Products found Click 'All' to Remove Filters"/>
  }
  return (
    <div className="p-8">
        <Container>
            <ProductDetails product={product}/>
            <div className="flex flex-col gap-4 mt-20">
              <Addrating product={product} user={user}/>
              <div>
                <ListRating product={product}/>
              </div>
            </div>
        </Container>
    </div>
  )
}

export default Product