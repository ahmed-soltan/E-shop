"use client"
import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading"
import Input from "@/app/components/inputs/Input"
import { SafeUser } from "@/types"
import { Rating } from "@mui/material"
import { Order, Products, Review, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValue, FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

type AddRatingProps = {
    product :Products & {
        reveiws:Review[]
    },
    user:(SafeUser&{
        orders:Order[]
    }|null)
}
const AddRating = ({
    product,
    user
}:AddRatingProps) => {
    const [isLoading , setIsLoading] = useState(false)
    const router = useRouter()
    const {register , handleSubmit , reset , formState:{errors} , setValue} = useForm<FieldValues>({
        defaultValues: {
            rating: 0,
            comment: "",
        },
    })
    const setCustomValue = (id:string , value:any)=>{
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onSubmit = async (values: FieldValues) => {
        if(values.rating ===0){
            toast.error("Please select a rating")
            return
        }
        const productRating = {
            ...values,
             product: product,
             userId: user?.id
        }
        console.log(productRating)
        setIsLoading(true)
         axios.post('/api/rating' , productRating).then(()=>{
                toast.success("Rating added successfully")
                setIsLoading(false)
                router.refresh()
            }).catch(err => {
                toast.error(err.response.data.error)
                console.error(err.response.data.error)
                setIsLoading(false)
            }).finally(()=>{
                reset()
                setIsLoading(false)
            })

    }

    if(!user || !product) return null;

    const deliveredOrder = user && user.orders && user.orders.some((order: any) => {
        return order.products.find(
            (item: any) =>
                item.id === product.id && order.deliveryStatus === "delivered"
        );
    });
  const userReview = product?.reveiws && product?.reveiws.find((review: any) =>review.userId === user?.id);

    if(userReview || !deliveredOrder){
        return null
    }

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
        <Heading title="Rate Our Product"/>
        <Rating onChange={(event , newValue)=>setCustomValue('rating' , newValue)}/>
        <Input 
            id="comment"
            label="Comment"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Button
            label={isLoading? "Loading..." : "Submit"}
            onClick={handleSubmit(onSubmit)}
        />
    </div>
  )
}

export default AddRating