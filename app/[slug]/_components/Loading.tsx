import Image from "next/image"
import eye from "@/public/eye1.gif"

const Loading = () => {
  return (
    <div className="h-screen center ">
        <Image alt="eye" src={eye} className="w-20"/>
    </div>
  )
}
export default Loading