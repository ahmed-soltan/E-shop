import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../components/Container"
import CartClient from "./CartClient"

const page = () => {
  const currentUser = getCurrentUser()
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser}/>
      </Container>
    </div>
  )
}

export default page