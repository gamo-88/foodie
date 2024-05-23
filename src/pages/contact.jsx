import React, { useState } from 'react'
import "../css/all.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'sonner'
import emailjs from '@emailjs/browser';
import Spinner from 'react-bootstrap/Spinner';

  


const schema = yup
  .object({
    nom: yup.string().required("Ce champ est obligatoire"),
    sujet: yup.string().required("Ce champ est obligatoire"),
    message: yup.string().required("Ce champ est obligatoire").min(15, "Veuillez saisir au moin 20 caracteres"),
  })
  .required()

export default function Contact() {
  const [load, setLoad]= useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
      const onSubmit = (data) => {
       setLoad(true)
        var templateParams = {
          nom: data.nom,          
          sujet: data.sujet,
          message: data.message,

        };
        
        emailjs.send('service_024geye', 'template_zin9p3h', templateParams, "XUNrCm5WEbc9i1L5w").then(
          (response) => {

            toast.success('Message envoyer avec succes')
            console.log('SUCCESS!', response.status, response.text);
            setLoad(false)
          },
          (error) => {
            console.log('FAILED...', error);
          },
        );
         
      }

  return (
<><main>
<div className="container mt-3">
    <div className="row fs-2 d-flex justify-content-center">Contact us</div>
    <div className="row d-flex justify-content-center ">
        <div className="map col-lg-6 ">
       <iframe style={{width:"100%", height:"100%"}}  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=carrefour%20Agip%20douala%20cameroun+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div>
    <form action="" className='col-lg-6' onSubmit={handleSubmit(onSubmit)}>
        <div className="nom mb-3">
            <label htmlFor="nom" className='form-label'>Nom</label>
            <input type="text" className='form-control form-control-lg btn-no-border-radius' name='nom' id='nom' {...register("nom")}/>
            <span className='text-danger'>{errors.nom?.message}</span>
        </div>

        <div className="sujet mb-3 " >
            <label htmlFor="sujet" className='form-label'>Sujet</label>
            <input type="text" className='form-control form-control-lg btn-no-border-radius' name='sujet' id='sujet' {...register("sujet")}/>
            <span className='text-danger'>{errors.sujet?.message}</span>
        </div>
        <div className="message mb-3">
            <label htmlFor="sujet" className='form-label'>Message</label>
            <textarea className='form-control form-control-lg btn-no-border-radius' rows="3" name="message" id="message" {...register("message")}></textarea>
            <span className='text-danger'>{errors.message?.message}</span>
        </div>

<button type="submit" className='btn btn-secondary  w-100' >
  {
    load?(
<Spinner animation="border" role="status">
    </Spinner>
    )
    :(
      <span>Envoyer</span>
    )
  }

  </button>

    </form>
    </div>
    </div>

    </main>
</>
 )
}
