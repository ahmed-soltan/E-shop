import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

type ProductType = {
  product: any;
};

const ListRating = ({ product }: ProductType) => {
  return (
    <div>
      {product.reveiws&& product.reveiws.length>0 && <Heading title="Product Review" />}
      <div className="text-sm mt-2">
        {product.reveiws &&
          product.reveiws.map((review: any) => {
            return (
              <div className="max-w-[300px]" key={review.id}>
                <div className="flex gap-2 items-center">
                  <Avatar src={review?.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-ligth">
                    {moment(review?.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review?.rating} readOnly />
                  <div className="ml-2 w-full">{review?.comment}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
