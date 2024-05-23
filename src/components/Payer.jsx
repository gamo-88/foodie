import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "sonner";
import "../css/all.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from '@emailjs/browser';
import Spinner from 'react-bootstrap/Spinner';
import { PanierStore } from "../../store";

const schema = yup
	.object({
		nom: yup.string().required("Ce champ est obligatoire"),
		phone: yup.string().required("Ce champ est obligatoire"),
		adresse: yup.string().required("Ce champ est obligatoire"),
	})
	.required();

export default function Payer() {
	let removeAllFood = PanierStore((state)=>state.removeAllFood)

	const [load, setLoad]= useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
    const onSubmit = (data) => {
		setLoad(true)
		 var templateParams = {
		   nom: data.nom,          
		   phone: data.phone,
		   adresse: data.adresse,
 
		 };
		 
		 emailjs.send('service_024geye', 'template_n5w9jtg', templateParams, "XUNrCm5WEbc9i1L5w").then(
		   (response) => {
 
			 toast.success('Message envoyer avec succes')
			 console.log('SUCCESS!', response.status, response.text);
			 setLoad(false)
			 removeAllFood()
		   },
		   (error) => {
			 console.log('FAILED...', error);
		   },
		 );
		  
	   
	};

	return (
		<main>
			<div className="main p-3">
				<div className="modaleHeader">
					<span className="fs-4">Informations Personnelle</span>
					<span role="button" data-bs-dismiss="modal">
						<CloseIcon />
					</span>
				</div>
				<hr />
				<div className="modaleBody p-3">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div class="mb-3">
							<input
								type="text"
								name="nom"
								className="btn-no-border-radius form-control form-control-lg"
								id="nom"
								placeholder="Votre nom..."
								{...register("nom")}
							/>
							<span className="text-danger">{errors.nom?.message}</span>
						</div>
						<div class="mb-3">
							<input
								type="phone"
								name="phone"
								className="btn-no-border-radius form-control form-control-lg"
								id="phone"
								placeholder="Votre numero de telephone..."
								{...register("phone")}
							/>
							<span className="text-danger">{errors.phone?.message}</span>
						</div>
						<div class="mb-3">
							<input
								type="text"
								name="adresse"
								className="btn-no-border-radius form-control form-control-lg"
								id="adresse"
								placeholder="Votre adresse..."
								{...register("adresse")}
							/>
							<span className="text-danger">{errors.adresse?.message}</span>
						</div>
						<div className="modaleFooter">
							<button
								type="submit"
								className="btn-no-border-radius w-100 btn btn-secondary"
							>
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
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
