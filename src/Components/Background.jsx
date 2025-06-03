import React from 'react'
import { dataContext } from '../Data/Data'

const Background = () => {
  const { data } = React.useContext(dataContext);
  return (
    <div className='absolute  z-[1] w-full h-full'>
        <div className='w-full relative h-full flex justify-center items-center'>
      <span className='absolute  top-20 text-base text-zinc-400'>Task Manager</span>
      <h1 className='text-zinc-900/90  text-8xl font-bold'>{data.length > 0 ? 'Today Task' : 'No Tasks Available'}</h1>

        </div>
     </div>
  )
}

export default Background
