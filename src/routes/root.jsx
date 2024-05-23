import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster, toast } from 'sonner'
import Egaliseur from '../components/Egaliseur'
import Payer from '../components/Payer'


export default function root() {
  return (
<>
<Navbar/>
<Egaliseur/>
{/* <Payer/> */}
<Outlet/>
<Footer/>
</>
)
}
