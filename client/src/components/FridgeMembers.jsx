import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../main'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

function FridgeMembers() {
  const fridge_id = useParams().id
  const [members, setMembers] = useState([])

  useEffect(() => {
    const getMembers = async () => {
      const response = await fetch(`${API_URL}/api/fridges-users/users/${fridge_id}`)
      const data = await response.json()
      setMembers(data)
    }

    getMembers()
  }, [fridge_id])

  return (
    <AvatarGroup max={5}>
      {members.map((member) => (
        <Avatar key={member.id} alt={member.name} src={member.avatarurl} />
      ))}
    </AvatarGroup>
  );
}

export default FridgeMembers