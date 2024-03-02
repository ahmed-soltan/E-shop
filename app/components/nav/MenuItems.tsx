import React from 'react'

const MenuItems = ({children , onclick}:{children:React.ReactNode , onclick:()=>void}) => {
  return (
    <div onClick={onclick} className='px-4 py-3 hover:bg-neutral-100 transition'>
        {children}
    </div>
  )
}

export default MenuItems