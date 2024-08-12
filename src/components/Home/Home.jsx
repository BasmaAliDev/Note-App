import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Context/UserContext';
import { MagnifyingGlass } from 'react-loader-spinner';
import Note from '../Note/Note';
import { getAllNotes } from '../../utils/Note';
export default function Home() {
  const { token, notes, setNotes } = useContext(UserContext);


  useEffect(() => {
    getAllNotes({ token, userNotes: setNotes });
  }, [token, setNotes]);

  return (
    <>
      <h2 className='heading position-relative py-3' >
        <i class="fa-regular fa-folder px-2"></i>My Notes
      </h2>

      {notes === null ?
        <div className='d-flex justify-content-center align-items-center vh-100 w-100 '>
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
        : notes.length === 0 ?
          <h2 className='text-center py-5'>No Notes found</h2>
          : <div className='row p-3' >
            {notes.map((note) => (
              <Note noteobj={note} key={note._id} />
            ))}
          </div>
      }





<div className="popUpRgba px-5">
</div>
    </>
  );
}


