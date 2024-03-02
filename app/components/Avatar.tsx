import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

type AvaterSrcType ={
    src?: string | null | undefined 
}
const Avatar = ({
    src
}:AvaterSrcType) => {
    if(src){
        return <Image src={src} alt="avatar" width={30} height={30} className="rounded-full"/>
    }
  return (
    <FaUserCircle size={24}/>
  )
}

export default Avatar