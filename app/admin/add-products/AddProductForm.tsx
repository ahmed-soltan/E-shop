"use client";

import { categories } from "@/Utils/Categories";
import { colors } from "@/Utils/Colors";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PriceFormat } from "@/Utils/PriceFormat";

export type ImageItem = {
  color: string;
  image: File | null;
  colorCode: string;
};
export type UploadedImageItem = {
  color: string;
  image: string;
  colorCode: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageItem | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      setIsProductCreated(false);
      setIsLoading(false);
      setImages(null);
    }
  }, [isProductCreated]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      brand: "",
      inStock: false,
    },
  });

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback(
    (value: ImageItem) => {
      setImages((prev: ImageItem[] | null) => {
        return prev ? [...prev, value] : [value];
      });
    },
    [setImages]
  );

  const removeImageToState = useCallback(
    (value: ImageItem) => {
      setImages((prev: ImageItem[] | null) => {
        return prev ? prev.filter((item) => item.color !== value.color) : prev;
      });
    },
    [setImages]
  );

  const onSubmit = async(data: FieldValues) => {
    setIsLoading(true);

    let uploadedImages : UploadedImageItem[] = [];

    if(!data.category){
      setIsLoading(false);
      return toast.error("Please select a category");
    }
    if(!data.images || data.images.length === 0){
      setIsLoading(false);
      return toast.error("Please select a Image");
    }

    const handleImageUpload = async () => {
      toast("Creating Product. please wait...");
      
      try {
        const uploadPromises = data.images.map(async (item:any) => {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
    
            return new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  console.log(error)
                  reject(error);
                },
                async () => {
                  try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    uploadedImages.push({
                      color: item.color,
                      image: downloadURL,
                      colorCode: item.colorCode,
                    });
                    console.log('File available at', downloadURL);
                    resolve();
                  } catch (error) {
                    console.log(error)
                    reject(error);
                  }
                }
              );
            });
          }
        });
    
        await Promise.all(uploadPromises);
      } catch (error:any) {
        setIsLoading(false);
        console.log(error)
        return toast.error(error.message);
      }
    };
    

    await handleImageUpload();
    const productData = {
      ...data,
      price: parseFloat(data.price),
      images: uploadedImages
    }
    console.log(productData)

    await axios.post('/api/product' , productData)
    .then(() => {
      toast.success("Product created successfully");
      setIsProductCreated(true);
      router.refresh();
    })
    .catch(error => {
      const errorMessage = error.response ? error.response.data.message : error.message;
      toast.error(errorMessage);
    })
    .finally(() => {
      setIsLoading(false);
      reset();
    });
  
  };

  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        disabled={isLoading}
        label="This Product is in Stock"
      />
      <div className="w-full font-medium ">
        <div className="mb-2 font-bold ">Select a Categoy</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label}>
                <CategoryInput
                  label={item.label}
                  icon={item.icon}
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the Available Products Colore and upload thier Images
          </div>
          <div className="text-sm">
            you must upload an image for each selected color otherwise you color
            selection will be ignored
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 ">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageToState={removeImageToState}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
