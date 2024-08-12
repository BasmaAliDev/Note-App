import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [isMinized, setIsMinized] = useState(false);
  return <>
    <div className='container-fluid'>
        <div className="row">
        <div className={isMinized?'col-md-2':'sidebar-mini'}>
    <Sidebar isMinized={isMinized} setIsMinized={setIsMinized} />
    </div>
    <div className='Outlet col-md-10 '>
    <Outlet />
    </div>
        </div>
    </div>

  </>
}
