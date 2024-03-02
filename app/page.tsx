import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/ProductCard";
import { IProductsParams, getProducts } from "@/actions/getProducts";

type HomeProps = {
  searchParams: IProductsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  console.log(searchParams)
  const products = await getProducts(searchParams);
  if (products.length < 0) {
    return (
      <NullData title="Oops!! , No Products found Click 'All' to Remove Filters" />
    );
  }
  return (
    <div className="my-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
