import React, { useRef, useState } from 'react'

export default function ChoixMenu({menu, goWithName}) {
let nomMenu = useRef(null)
function getNameMenu() {
    goWithName(nomMenu.current.innerText)
    console.log(nomMenu.current.innerText);

}

  return (
    <div>
        <div className="choixMenu">
            <div className="choixMenuImage" onClick={getNameMenu}>
                <img src={menu.menu_image} alt="" />
            </div>
            <div className="choixMenuNom" onClick={getNameMenu} ref={nomMenu}>{menu.menu_name}</div>
        </div>
    </div>
  )
}
