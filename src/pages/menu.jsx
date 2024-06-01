import React, { useEffect, useState } from "react";
import { food_list, menu_list } from "../../data";
import ChoixMenu from "../components/ChoixMenu";
import CarteRepas from "../components/CarteRepas";
import "../css/all.css";

export default function Menu() {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [menuList, setMenuList] = useState([]);

	function getFoodByName() {
		return food_list.filter((food) => food.category.includes(name));
	}
	function resetMenu() {
		setName("");
		setId('')
	}

	function takeName(text) {
		setName(text);
	}

	useEffect(() => {
		setMenuList(getFoodByName());
		console.log(name);
	}, [name]);

	return (
		<div>
			<main>
				<div className="container">
					<p className="fs-2">Explore our menu</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, est
						quisquam, officia consequuntur architecto vitae nisi, neque at
						doloremque culpa accusantium? Error, dignissimos deleniti explicabo
						recusandae architecto minus illo nemo sequi, officia ex sit unde,
						excepturi eligendi! Aspernatur iste quia facere velit aliquam illo
						deserunt neque consequuntur, maxime soluta ut.
					</p>
					<div className="displayBy d-none d-lg-flex ">
						{menu_list.map((menu, index) => {
							return (
								<div className={`chooser ${(id===menu.menu_name) && 'borderMenu'}`} key={index} onClick={()=>setId(menu.menu_name)}>
									<ChoixMenu menu={menu} goWithName={takeName} />
								</div>
							);
						})}
					</div>
					<div className="displayBy col-5 d-lg-none d-xl-bloc">
						<select
							className="form-select"
							aria-label="Default select example"
							onChange={(e) => {
								setName(e.target.value);
							}}
							name=""
							id=""
						>
							<option value="">Trier par categories</option>
							<option value="Salad">Salad</option>
							<option value="Rolls">Rolls</option>
							<option value="Deserts">Deserts</option>
							<option value="Sandwich">Sandwich</option>
							<option value="Cake">Cake</option>
							<option value="Pure Veg">Pure Veg</option>
							<option value="Pasta">Pasta</option>
							<option value="Noodles">Noodles</option>
						</select>
					</div>
					<div className="but">
						<button className="btn btn-secondary mt-5" onClick={resetMenu}>
							All Menu
						</button>
					</div>
					<hr />
					<div className="row repasListe">
						{menuList.map((food, index) => {
							return <CarteRepas food={food} key={index} />;
						})}
					</div>
				</div>
			</main>
		</div>
	);
}
