import React from 'react'

const page = ( {params} ) => {
  return (
    <div>
      This should is all the groups: {params.groupId}
    </div>
  )
}

export default page
