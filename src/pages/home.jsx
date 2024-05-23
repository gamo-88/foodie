import React from "react";
import { Link } from "react-router-dom";
import { food_list } from "../../data";
import CarteRepas from "../components/CarteRepas";

export default function Home() {
	return (
		<>
        <main>
<div className="baniere">
<div id="carouselExampleCaptions" class="carousel slide">

<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="assets/menu/header_img.png" class="d-block w-100" alt="..."/>
    <div class="carouselDesc d-none d-md-block">
      <p> <span className="fs-1"> Commande ta nourriture <br /> favorite ici.</span>
      <span className="d-none d-lg-block">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis fuga minus odit! Fuga omnis quis at mollitia exercitationem deserunt dicta!.
      </span><br />
      <button type="button" class="btn btn-outline-primary rounded-pill text-light" > <Link to="/menu">Voir les Menus</Link></button>

      </p>
    </div>
</div>

</div>
</div>
</div>

<div className="container mt-2">
        <div className="row fs-2">
            Meilleur repas pres de chez vous
        </div>
        <div className="box">
        <div className="row repasListe">
            {
                food_list.map((food, index)=>{
                    return (
                        <CarteRepas food={food} key={index}/>
                    )
                })
            }
        </div>


        </div>
</div>
</main>
		</>
	);
}
