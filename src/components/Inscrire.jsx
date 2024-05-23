import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from 'sonner'
import { userListStorage, userStore } from '../../store';



   


export default function Inscrire({ modaleChanger, closeModal}) {

 
let setToConnect= userStore((state)=>state.setCurrentUser) 
let setUserList = userListStorage((state)=>state.addUserOnList)
let removeAllUsers = userListStorage((state)=>state.removeAllUsers)
let USERLIST = userListStorage((state)=>state.USERLIST)

async function updatUserList() {
  await fetch('http://localhost:3000/users')
  .then((resp)=>{
    return resp.json()
})
.then((resp)=>{
     setUserList(resp)
})
.catch((erreur)=>{
  console.log("Une erreur est survenu sur la liste des utilisateur: "+ erreur.message);
  })
}

 useEffect(()=>{
  updatUserList()
}, [])

async function handleSubmit(e){
  e.preventDefault();
  const infosUser = new FormData(e.target)
 
  const user= Object.fromEntries(infosUser.entries())

  if(!user.name || !user.email || !user.password){
      
      return  toast.warning("Veuillez entrer convenablement les champs");
  }
 await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
})
.then((reponse)=>{

    if (!reponse.ok) {
        throw new Error("Sia pb sur l'api")
    }
    return reponse.json()
})
.then((data)=>{
  // parcourir data et compare son email a user.email si ya lemail? ne pas setToConnect
  let emailUsed = USERLIST.findIndex((USER)=> USER.email === user.email   )
  if (emailUsed === -1) {
  setToConnect(data)
 
  
  }else{
    return toast.error("Email deja pris")
  }

})
 }





// useEffect(() => {
//   initiUserList()
//   console.log();


  
// }, [])



  return (
    <div className="main p-3">
    <div className="modaleHeader"><span className='fs-4'>S'inscrire</span> <span role='button' data-bs-dismiss="modal" ><CloseIcon/></span></div><hr />
    <div className="modaleBody p-3">
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div class="mb-3">
  <input type="text" className="btn-no-border-radius form-control form-control-lg" name='name' id="name" placeholder="Votre nom..."/>

</div>  
     <div class="mb-3">
  <input type="email" className="btn-no-border-radius form-control form-control-lg" name='email' id="email" placeholder="Votre email..."  />

</div>
<div class="mb-3">
  <input type="password" className="btn-no-border-radius form-control form-control-lg" name='password' id="password" placeholder="Votre mot de passe..."/>
</div>
    <div className="autreOption text-center mb-3">Deja un compte? <span className='modaleChanger' onClick={()=>{modaleChanger(false); removeAllUsers() }}>Se connecter</span></div>
    <div className="modaleFooter"><button type="submit" className='btn-no-border-radius w-100 btn btn-secondary'>Creer un compte</button>
    {
      USERLIST.map((user)=>{
        return(
          <div className="">{user.email}</div>
        )
      })
    }
    </div>
        </form>
    </div>
</div>
  )
}
