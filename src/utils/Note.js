import axios from "axios";
import Swal from "sweetalert2";

//  show modal [title, content]
export function showAddModal({token,userNotes}){
    Swal.fire({
        title: "Add Note",
        html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
        <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        confirmButtonColor:"#4276a8",
        preConfirm: ()=> {
          const title=document.getElementById('title').value;
          const content=document.getElementById('content').value;
          return{title,content}
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        console.log(result);
      try {
        sendDataToAddNote({title:result.value.title,content:result.value.content,token,userNotes})
      } catch (error) {
        console.log("showAddModal =>",error);
      }
       
      });
      
}


// send data from inputs to API
export async function sendDataToAddNote({ title, content, token,userNotes }) {
  const { data } = await axios.post(
    "https://note-sigma-black.vercel.app/api/v1/notes",
    { title, content },
    {
      headers: {
        token,
      },
    }
  );
  if (data.msg === "done") {
    getAllNotes({ token,userNotes});
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }
 
}


//export async function getAllNotes

export async function getAllNotes({token,userNotes}){
  try {
    const {data}=await axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
      headers:{token}
    })
    console.log("getAllNotes",data.notes);
    userNotes(data.notes);
  } catch (error) {
    userNotes([]);
  }
}


// !==================> Delete NOTE

export function showDeleteModal({ noteID, token, userNotes }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor:"#4276a8",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("showDeleteModal");
      sendDataToDelete({ noteID, token, userNotes });
    }
  });
}
// send Data To Delete
async function sendDataToDelete({ noteID, token, userNotes }) {
  const { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
    { headers: { token } }
  );
// get Notes after delete
  getAllNotes({ token, userNotes });
  Swal.fire("Deleted!", "Your Note has been deleted.", "success");
  
}


// !==================> Updata NOTE

export function showUpdateModal({token,userNotes,noteID}){
  Swal.fire({
      title: "Update Note 😁",
      html: `
      <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
      <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      confirmButtonColor:"#4276a8",

      
      preConfirm: ()=> {
        const title=document.getElementById('title').value;
        const content=document.getElementById('content').value;
        return{title,content}
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
     try {
      sendUpdateData({title:result.value.title,content:result.value.content,token,userNotes,noteID})
     } catch (error) {
      console.log("showUpdatemodal ",error);
     }
      
    });
    
}
 async function sendUpdateData({title,content,token,userNotes,noteID}){
  const {data}=await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
    {title,content},
    {headers:{token}}
  );
  getAllNotes({ token, userNotes });

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your Note has been updated',
    showConfirmButton: false,
    timer: 1000
  })
 }




// !==================> Search by Title

export function Search({ token, userNotes, notes }) {
  Swal.fire({
    title: "Search your Note by Title",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Search",
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      return login;
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    let searchResult = notes.filter(item => item.title.toLowerCase().includes(result.value.toLowerCase()));
    if(searchResult.length>0){
    printNote({ searchResult, setNotes: userNotes, token });
    }
  });
}

function printNote({ searchResult, setNotes, token }) {
  let popUpRgba = document.querySelector(".popUpRgba");
      popUpRgba.style.display = "flex";
      popUpRgba.innerHTML = "";

  for (let i = 0; i < searchResult.length; i++) {
    popUpRgba.innerHTML += `
    <i id="close" class="fas fa-window-close  fa-1x "></i>
      <div class='col-md-4 bg-light mx-2'>
        <div class="p-4 shadow note">
          <div class="note-body">
            <h2 class="h5 m-0 text-center">${searchResult[i].title}</h2>
            <p class="mt-2">${searchResult[i].content}</p>
          </div>
          <div class='text-center'>
            <i class="fa-solid fa-pen-to-square pointer text-secondary me-2" data-note-id="${searchResult[i]._id}"></i>
            <i class="fa-solid fa-trash text-danger pointer" data-note-id="${searchResult[i]._id}"></i>
          </div>
        </div>
      </div>
    `;
  }

  // Add event listener for click events on icons
  popUpRgba.addEventListener('click', function(event) {
    const target = event.target;
    //------------------update
    if (target.classList.contains('fa-pen-to-square')) {
      const noteId = target.getAttribute('data-note-id');
      showUpdateModal({ noteID: noteId, token, userNotes: setNotes });
      popUpRgba.style.display = "none";
      popUpRgba.innerHTML = "";
    //-------------------delete
    } else if (target.classList.contains('fa-trash')) {
      const noteId = target.getAttribute('data-note-id');
      showDeleteModal({ noteID: noteId, token, userNotes: setNotes });
      popUpRgba.style.display = "none";
      popUpRgba.innerHTML = "";
    }
    //--------------------close
    if (target.classList.contains('fa-window-close')){
      popUpRgba.style.display = "none";
      popUpRgba.innerHTML = "";
    }
  });
  
}
