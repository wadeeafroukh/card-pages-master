import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className=" container border-black border-2 rounded-2">
        <div className=" container d-flex justify-content-center flex-column align-items-center p-3 gap-3 ">
          <h1>BCard</h1>
          <p className="text-center" style={{ fontSize: "18px" }}>
            This is the business card project that allows a very uniqe experince
            for the customers to share thier busniness , new way of marketing
            your dreams in a card designed espacialy to our dear customers to
            give them easy accesbility that includes all your business
            information enjoy!
          </p>
          <i style={{fontSize: "50px", textShadow: "1px 4px 10px #00000023"}} className="fa-regular text-primary  fa-face-smile-wink"></i>
        </div>
      </div>
    </>
  );
};

export default About;
