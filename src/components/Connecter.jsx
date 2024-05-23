import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'sonner'
import { Password } from '@mui/icons-material';
import { object } from 'yup';
import { userStore } from '../../store';






   

export default function Connecter({modaleChanger, closeModal}) {
  let setUser = userStore((state)=>state.setCurrentUser)
  let user = userStore((state)=>state.USERS)
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [int, setInt]=useState({})


async  function handleSubmit(e) {
    e.preventDefault()
   if ( validation()) {
    await fetch(`http://localhost:3000/users?email=${email}`)
    .then((res)=>{
      return res.json();
    })
    .then((resp)=>{

      if (Object.keys(resp).length === 0) {
      toast.error("Mauvais Identifiants")
      }
      else{
        if (resp[0].password === password) {
          toast.success("Vous vous etes connecter avec succes")
          setUser(resp[0])
          console.log(resp[0], user);
        }else{
      toast.error("Mauvais mot de passe")        
        }
      }
    })
    .catch((erreur)=>{
      toast.error("Une erreur du serveur du a : "+erreur.message)
    })
   }
    
  }
  
  function validation() {
    let valide = true
    if (email==="" || email ===null) {
      valide = false
      toast.warning("saisisez correctement l'email")
    }
    if (password === "" || password === null) {
      valide = false
      toast.warning('saisir correctement son mot de passe')
    }
    return valide
  }



  return (
    <div className="main p-3" >
        <div className="modaleHeader"><span className='fs-4'>Se connecter</span> <span role='button' data-bs-dismiss="modal"><CloseIcon/></span></div><hr />
        <div className="modaleBody p-3">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div class="mb-3">
  <input type="email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className="btn-no-border-radius form-control form-control-lg" id="email" placeholder="Votre email..." />
</div>
<div class="mb-3">
  <input type="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className="btn-no-border-radius form-control form-control-lg" id="password" placeholder="Votre mot de passe..." />

</div>
        <div className="autreOption text-center mb-3">Pas de compte? <span className='modaleChanger' onClick={()=>{modaleChanger(true)}} >S'incrire</span></div>
        <div className="modaleFooter"><button type="submit" className='btn-no-border-radius w-100 btn btn-secondary'>Se connecter</button></div>
            </form>
        </div>
    </div>
    
  )
}
