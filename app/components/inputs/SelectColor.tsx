"use client";

import { ImageItem } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

type SelectColorProps = {
  item: ImageItem;
  addImageToState: (value: ImageItem) => void;
  removeImageToState: (value: ImageItem) => void;
  isProductCreated: boolean;
};
const SelectColor = ({
  item,
  addImageToState,
  removeImageToState,
  isProductCreated,
}: SelectColorProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    
    if (!e.target.checked) {
      removeImageToState(item);
      setFile(null);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="h-[20px] w-[20px] cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center flex flex-row items-center justify-start border-dashed ">
            <SelectImage item={item} handleFileChange={handleFileChange}/>
          </div>
        )}

        {
            file && (
              <div className="col-span-2 text-center flex flex-row items-center justify-center gap-2">
                <p className="">{file.name}</p>
                <div className="w-[70px]">
                    <Button label="Cancel" small outlined onClick={()=>{
                        removeImageToState(item);
                        setFile(null);
                    }}/>
                </div>
              </div>
            )
  
        }
      </>
    </div>
  );
};

export default SelectColor;
