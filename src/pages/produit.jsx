import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { food_list } from "../../data";
import { toast } from "sonner";
import { PanierStore, commentStore, userStore } from "../../store";
import Inscrire from "../components/Inscrire";
import Connecter from "../components/Connecter";

export default function Produit() {
	let { id } = useParams();
	const [currentPlat, setCurrentPlat] = useState([]);
	let user = userStore((state) => state.USERS);
	let COMMENTS = commentStore((state) => state.COMMENTS);
	let addToCommentList = commentStore((state) => state.addToCommentList);
	let [display, setDisplay] = useState(false);

	const [toogelModale, setToogelModale] = useState(false); //on le set a 1 pour afficher la modale initiale au form inscription
	const [modaleContent, setModaleContent] = useState(true); //modaleContent perment de switcher le contenu de la modale deinscription  car 0 a connect car 1

	let Pannier = PanierStore((state) => state.FOODLIST);
	const ajouterAuPanier = PanierStore((state) => state.addFood);
	const [commentsVal, setCommentsVal] = useState("");

	function handelAjoutfood(id) {
		let isInPanier = Pannier.findIndex((currentFood) => currentFood._id === id);

		if (isInPanier === -1) {
			ajouterAuPanier(currentPlat);
			console.log(Pannier);
		} else {
			toast.info("Ce repas est deja dans votre panier");
		}
	}
	async function handelComments(e) {
		e.preventDefault();
		const textarea = new FormData(e.target);
		const commentaire = Object.fromEntries(textarea.entries());
		const name = user.name;
		const idPlat = id;
		const inBd = { idPlat, name, ...commentaire };
		await fetch(`http://localhost:3000/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inBd),
		}).then((resp) => {
			setDisplay((v) => !v);
			setCommentsVal("");
			return resp.json;
		});
	}

	async function updadeComments() {
		await fetch(`http://localhost:3000/comments?idPlat=${id}`)
			.then((resp) => {
				return resp.json();
			})
			.then((resp) => {
				return addToCommentList(resp);
			})
			.catch((erreur) => {
				toast.error("Une erreur du serveur du a : " + erreur.message);
			});
	}
	useEffect(() => {
		updadeComments();
	}, [display]);

	useEffect(() => {
		let platCharger = food_list.find((plat) => plat._id === id);

		setCurrentPlat(platCharger);
		console.log(COMMENTS);
	}, [id]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<main className="container">
			<section className="row d-flex justify-content-center g-5 p-3">
				<div
					className="col-lg-6 "
					style={{
						backgroundColor: "aliceblue",
						maxHeight: "320px",
						maxWidth: "320px",
					}}
				>
					<img
						src={`/${currentPlat.image}`}
						alt=""
						className="img-fluid w-100"
					/>
				</div>
				<div className="col-lg-6">
					<span className="fs-4 d-block">{currentPlat.name}</span>
					<span className="fs-4 d-block">
						<span className="rating text-danger">
							<StarRateRoundedIcon />
							<StarRateRoundedIcon />
							<StarRateRoundedIcon />
							<StarRateRoundedIcon />
							<StarOutlineRoundedIcon />
						</span>
					</span>

					<span className="fs-4">
						<span className="text-decoration-line-through text-secondary me-3">
							{(currentPlat.price * 30) / 100 + currentPlat.price} FCFA
						</span>
						<span className="text-success"> {currentPlat.price} FCFA</span>
					</span>
					<span className="fs-6 d-block">{currentPlat.description}</span>
					<button
						className="btn btn-primary mt-4"
						onClick={() => {
							handelAjoutfood(currentPlat._id);
						}}
					>
						Ajouter au panier
					</button>
				</div>
			</section>
			{user.isConnected ? (
				<aside>
					<div className="row">
						<p className="display-5">Commentaires</p>
					</div>
					<section className="row">
						<div className="entryComments col-lg-5">
							<form
								onSubmit={(e) => {
									handelComments(e);
								}}
							>
								<textarea
									className="w-100 h-100 mb-2"
									name="comments"
									value={commentsVal}
									id="comments"
									placeholder="Apropos du produit ou autres..."
									onChange={(e) => {
										setCommentsVal(e.target.value);
									}}
								></textarea>
								<button
									type="submit"
									className="btn btn-primary mb-3"
									disabled={!commentsVal.length}
								>
									Envoyer
								</button>
							</form>
						</div>
						<div className="col-lg-7">
							{COMMENTS.length === 0 ? (
								<p className="display-6">
									Aucun commentaire sur le produit pour l'instant
								</p>
							) : (
								COMMENTS.map((com, index) => {
									return (
										<div className="commentsList  mb-3" key={index}>
											<div className="comment px-3">
												<div className="userName fs-4 text-secondary">
													{com.name}
												</div>
												<div className="commentDesc mb-2">{com.comments}</div>
											</div>
										</div>
									);
								})
							)}
						</div>
					</section>
				</aside>
			) : (
				<button
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					Connectez-Vous
				</button>
			)}

			<div
				className="modal fade"
				id="exampleModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						{modaleContent ? (
							<Inscrire modaleChanger={setModaleContent} />
						) : (
							<Connecter modaleChanger={setModaleContent} />
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
