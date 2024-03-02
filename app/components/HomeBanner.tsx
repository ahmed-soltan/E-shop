import Image from "next/image"
import banner from '../../public/banner-image.png'
const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
        <div className="mx-auto flex flex-col md:flex-row px-8 py-12 items-center justify-evenly gap-2">
            <div>
                <h1 className="text-4xl md:text-7xl font-bold text-slate-100">Summer Sale!</h1>
                <h3 className="my-3 text-xl md:text-2xl text-slate-200">Enjoy Discounts on Selected Items</h3>
                <h1 className="text-4xl md:text-7xl  font-bold text-yellow-300">GET 50% OFF</h1>
            </div>
            <div className="w-1/3 relative aspect-video">
                <Image src={banner} alt="banner" className="object-contain"/>
            </div>
        </div>
    </div>
  )
}

export default HomeBanner