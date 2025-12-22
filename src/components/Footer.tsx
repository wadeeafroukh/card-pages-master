import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <div className=" container-fluid justify-content-evenly align-items-center p-3 gap-4 bg-light-subtle d-flex">
        <span style={{fontSize: 20}} className="d-flex flex-column justify-content-center align-items-center gap-2"><i 
        style={{fontSize: 30}} className="fa-solid fa-circle-question"></i> About</span>
        
        <span style={{fontSize: 20}} className="d-flex flex-column justify-content-center align-items-center gap-2"><i style={{fontSize: 30}}className="fa-solid fa-heart"></i>Favourites</span>
        
        <span style={{fontSize: 20}} className="d-flex flex-column justify-content-center align-items-center gap-2"><i style={{fontSize: 30}} className="fa-solid fa-address-card"></i> My cards</span>
      </div>
        <div style={{fontSize: 25}} className="d-flex justify-content-center p-1 align-items-center bg-dark">
            <p className="text-center text-light">All rights are reserved WadeeaForukh@</p>
        </div>
    </>
  );
};

export default Footer;
