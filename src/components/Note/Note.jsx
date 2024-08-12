import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext';
import { showDeleteModal, showUpdateModal } from '../../utils/Note';
export default function Note({noteobj}) {
    const{token,setNotes}=useContext(UserContext)
  return <>
<div className='col-md-4'>

<div className={`p-4 shadow note `}>
        <div className="note-body">
          <h2 className="h5 m-0 text-center">
            {noteobj.title}
          </h2>
          <p className={` mt-2`}>{noteobj.content}</p>
        </div>

        <div className='text-center' >
          <i className="fa-solid fa-pen-to-square pointer text-secondary me-2 "
          onClick={()=>showUpdateModal({token,userNotes:setNotes,noteID:noteobj._id})}
           

          ></i>

         <i class="fa-solid fa-trash text-danger"
         onClick={()=>showDeleteModal({noteID:noteobj._id,token,userNotes:setNotes})}
         ></i>
        </div>
        </div>
</div>


  </>
}
