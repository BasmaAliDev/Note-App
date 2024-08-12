import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Sidebar.module.css'
import { Search, showAddModal } from '../../utils/Note'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';




export default function Sidebar({isMinized, setIsMinized}) {
  const{token,logOut,setNotes,notes}=useContext(UserContext);
  
  console.log("token=>",token);
  return <>
  <nav className={`${style.nav}  shadow-sm`}>
        <button
          className="btn btn-main text-capitalize w-100 mb-3"
          onClick={() => showAddModal({ token ,userNotes:setNotes})}
        >
          <i className="fa-solid fa-plus me-2"></i>
          {isMinized?" New Note":""}
         
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
            <i class="fa-solid fa-house-user"></i>
            {isMinized?"Home":""}
              
            </NavLink>
          </li>
          <li>
            <NavLink onClick={()=>Search({ token ,userNotes:setNotes ,notes})}>
            <i class="fa-solid fa-magnifying-glass"></i> {isMinized?"Search":""}
            </NavLink>
          </li>
          <li  onClick={logOut}>
            <span style={{cursor:'pointer'}}>

            <i class="fa-solid fa-chevron-left"></i>
            {isMinized?" Log Out":""}
             
            </span>
          </li>
          <li></li>
        </ul>
        <div className={`${style.change} shadow pointer`} onClick={()=>setIsMinized(!isMinized)}>
          <i className={`fa-solid fa-chevron-right`}></i>
        </div>
      </nav>
  </>
}
