import React, { useState } from "react";
import "../css/all.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { NavLink } from "react-router-dom";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { PanierStore, userStore } from "../../store";
import CloseIcon from "@mui/icons-material/Close";
import Inscrire from "./Inscrire";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Connecter from "./Connecter";
import Payer from "./Payer";

export default function Navbar() {
	let user = userStore((state) => state.USERS);
	let logOutUser = userStore((state) => state.logOutCurrentUser);

	let Pannier = PanierStore((state) => state.FOODLIST);
	let updateFoodList = PanierStore((state) => state.setFoodList);
	const [toogelModale, setToogelModale] = useState(false); //on le set a 1 pour afficher la modale initiale au form inscription togglePayer
	const [modaleContent, setModaleContent] = useState(true); //modaleContent perment de switcher le contenu de la modale deinscription  car 0 a connect car 1

	const [togglePayer, setTogglePayer] = useState(false); //on le set a 1 pour afficher la modale initiale au form inscription togglePayer

	function AddQte(id) {
		let foodlistUpgraded = Pannier.map((food) => {
			return food._id === id && food.qte < 10
				? {
						...food,
						qte: food.qte + 1,
				  }
				: food;
		});
		updateFoodList(foodlistUpgraded);
	}

	function reduceQte(id) {
		let foodlistUpgraded = Pannier.map((food) => {
			return food._id === id && food.qte > 1
				? {
						...food,
						qte: food.qte - 1,
				  }
				: food;
		});

		updateFoodList(foodlistUpgraded);
	}

	function removefoodInPanier(id) {
		let panierFoodRemoved = Pannier.filter((food) => {
			return food._id !== id;
		});

		updateFoodList(panierFoodRemoved);
	}
	function logOut(user) {
		logOutUser(user);
		userStore.persist.clearStorage("utilisateur");
		PanierStore.persist.clearStorage("plat");
	}

	// boostrap modale

	return (
		<main>
			<nav className="navbar navbar-expand-md position-fixed bg-body-tertiary">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">
						FOODIE
					</NavLink>

					<div className="fonctions d-md-none d-xs-flex ms-auto me-2">
						<div
							className="bag"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasWithBothOptions"
							aria-controls="offcanvasWithBothOptions"
						>
							<ShoppingBagIcon
								style={{
									width: "40px",
									height: "40px",
								}}
							/>
							<span id="bagItem">{Pannier.length}</span>
						</div>

						<div className="compte">
							{user.isConnected ? (
								<div class="dropdown">
									<span
										class="btn  dropdown-toggle"
										href="#"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<AccountCircleRoundedIcon />
									</span>

									<ul class="dropdown-menu dropdown-menu-end">
										<li>
											<a class="dropdown-item" href="#">
												{user.name}
											</a>
										</li>
										<li>
											<a
												class="dropdown-item"
												href="#"
												name="use"
												id="use"
												value=""
												onClick={() => logOut(user)}
											>
												Log Out
											</a>
										</li>
									</ul>
								</div>
							) : (
								<button data-bs-toggle="modal" data-bs-target="#exampleModal">
									<AccountCircleRoundedIcon style={{ color: "grey" }} />
								</button>
							)}
						</div>
					</div>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
							<li className="nav-item px-3">
								<NavLink
									className={({ isActive }) =>
										isActive ? "nav-link actives" : "nav-link"
									}
									aria-current="page"
									to="/"
								>
									Home
								</NavLink>
							</li>
							<li className="nav-item px-3">
								<NavLink
									className={({ isActive }) =>
										isActive ? "nav-link actives" : "nav-link"
									}
									to="/menu"
								>
									Menu
								</NavLink>
							</li>
							<li className="nav-item px-3">
								<NavLink
									className={({ isActive }) =>
										isActive ? "nav-link actives" : "nav-link"
									}
									to="/contact"
								>
									Contact
								</NavLink>
							</li>
						</ul>
						<div className="fonctions d-none d-md-flex me-2">
							<div
								className="bag"
								data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasWithBothOptions"
								aria-controls="offcanvasWithBothOptions"
							>
								<ShoppingBagIcon
									style={{
										width: "40px",
										height: "40px",
									}}
								/>
								<span id="bagItem">{Pannier.length}</span>
							</div>

							<div className="compte">
								{user.isConnected ? (
									<div class="dropdown">
										<span
											class="btn  dropdown-toggle"
											href="#"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<AccountCircleRoundedIcon />
										</span>

										<ul class="dropdown-menu dropdown-menu-end">
											<li>
												<a class="dropdown-item" href="#">
													{user.name}
												</a>
											</li>
											<li>
												<a
													class="dropdown-item"
													href="#"
													name="use"
													id="use"
													value=""
													onClick={() => logOut(user)}
												>
													Log Out
												</a>
											</li>
										</ul>
									</div>
								) : (
									<button
										type="button"
										className="btn btn-primary"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
									>
										log in
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>

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

			<div
				class="offcanvas offcanvas-start panier"
				data-bs-scroll="true"
				tabindex="-1"
				id="offcanvasWithBothOptions"
				aria-labelledby="offcanvasWithBothOptionsLabel"
			>
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="staticBackdropLabel">
						Votre Panier
					</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div class="offcanvas-body ">
					{Pannier.length ? (
						<div className="pan">
							<div>
								<strong>
									Total:{" "}
									{Pannier.reduce((acc, food) => {
										return acc + food.price * food.qte;
									}, 0)}
									{" FCFA"}
								</strong>
							</div>
							<div className="option mt-3">
								{user.isConnected ? (
									<button
										className="btn btn-success btn-no-border-radius"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal1"
									>
										Payez-Maintenant
									</button>
								) : (
									<button
										className="btn btn-primary btn-no-border-radius"
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
									>
										Connectez-vous
									</button>
								)}
							</div>

							<table class="table table-striped">
								<thead>
									<tr>
										<th scope="col">Item</th>
										<th scope="col">Titre</th>
										<th scope="col">Prix</th>
										<th scope="col">Qte</th>
										<th scope="col">Remove</th>
									</tr>
								</thead>
								<tbody>
									{Pannier.map((food, index) => {
										return (
											<tr key={index}>
												<th>
													<img
														src={`/${food.image}`}
														alt={`le plat ${food.name}  dans le pannier`}
													/>{" "}
												</th>
												<td>{food.name}</td>
												<td>{food.price} FCFA</td>
												<td className="qte">
													<button
														className="btn btn-outline-primary"
														onClick={() => AddQte(food._id)}
													>
														+
													</button>
													<span id="foodQte">{food.qte}</span>
													<button
														className="btn btn-outline-secondary"
														onClick={() => reduceQte(food._id)}
													>
														-
													</button>
												</td>
												<td className="text-danger">
													<span
														role="button"
														onClick={() => {
															removefoodInPanier(food._id);
														}}
													>
														<CloseIcon />
													</span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : (
						<h5 class="offcanvas-title mt-4 text-center">
							Votre Panier est encore vide
						</h5>
					)}
				</div>
			</div>

			<div
				className="modal fade"
				id="exampleModal1"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-body">{<Payer />}</div>
					</div>
				</div>
			</div>
		</main>
	);
}
