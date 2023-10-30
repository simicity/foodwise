import { useParams } from "react-router-dom"

const Fridge = () => {
  const fridge_id = useParams().id

  return (
    <>
      <div>Fridge {fridge_id}</div>
    </>
  )
}

export default Fridge