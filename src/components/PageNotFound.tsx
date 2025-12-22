import { FunctionComponent } from "react";

interface PageNotFoundProps {
    
}
 
const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return ( <>
    <div className=" container d-flex justify-content-center align-items-center p-4">

    <h1 className=" display-4">Page not found - 404  <i className="fa-solid fa-face-sad-tear"></i></h1>
    </div>
    </> );
}
 
export default PageNotFound;