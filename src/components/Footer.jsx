import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
  return (
    <main className='mainFoot'>
        <div className="delimiteurHR"></div>
        <hr />

    <div className='footer'>

    <div className="year">
    &copy; 2024 Company, Inc
    </div>

<div className="netWork">
    <TwitterIcon/>
    <InstagramIcon/>
    <FacebookIcon/>

</div>

    </div>
    </main>
  )
}
