import React from 'react'
import { Link } from 'react-router-dom';
import "../css/all.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { PanierStore } from '../../store';
import { toast } from 'sonner';

export default function CarteRepas({food}) {

	let Pannier = PanierStore((state)=>state.FOODLIST)
    const ajouterAuPanier = PanierStore((state)=>state.addFood)

    function handelAjoutfood(id) {
        let isInPanier = Pannier.findIndex((currentFood)=>currentFood._id === id)

        if(isInPanier === -1){
            ajouterAuPanier(food)
            console.log(Pannier);
        }
        else{ toast.info('Ce repas est deja dans votre panier')}

    }

  return (

    <div className="carteRepas mt-3">
        
        <div className="carteRepasImage">
            <Link to={`/produit/${food._id}`}>
            <img src={food.image} alt="" />
            </Link>
           <div className="bouttonAjouter" onClick={()=>handelAjoutfood(food._id)} > <AddCircleIcon/></div> 
        </div>

        <div className="carteRepasBody">

            <div className="carteRepasBody_titre fs-5">
                <div className="foodTitle">{food.name}</div>
                <div className="foodRank text-danger"><StarRateIcon className='starIcon'/><StarRateIcon className='starIcon'/><StarOutlineIcon className='starIcon'/></div>      
            </div>

            <div className="foodDes">{food.description}</div>
        </div>

        <div className="carteRepasFooter">
            <div className="foodPrice text-danger">{food.price} FCFA</div>
            <div className="foodCategory mt-2">{food.category}</div>
        </div>


    </div>

  )
}
