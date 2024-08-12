import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const{sendDataToLogin, token, setToken}=useContext(UserContext)
    const user={
        email:'',
        password:''
      }
    const formikObj=useFormik({
      initialValues:user,
      onSubmit:async function (values) {
        setIsLoading(true);
        const response = await sendDataToLogin(values);
        setIsLoading(false);
  
        if (response.msg === "done") {
          localStorage.setItem("token", `3b8ny__${response.token}`);
          setToken(response.token);
        }
      },
      validate:function(values){
        const errors={ }
        if(values.password.length<6 ||values.password.length>12){errors.password="Password must be from 6 characters and 12 characters "}
        if(values.email.includes("@")===false ||values.email.includes('.')===false){errors.email="Email Invalid ."}
       console.log(errors);
        return errors;
      }
    })
    useEffect(() => {
      if (token) navigate("/");
    }, [token]);
    return <>
    <section className='signup'>
      <div className='container vh-100  d-flex justify-content-center align-items-center'>
        <div className="row w-100 justify-content-center align-items-center signup-content p-5 ">

          <div className="col-md-7 signup-image">
            <img className='w-75' src={require("../../images/signup-image.jpg")} alt="signup-image" />
          </div>
          <div className="col-md-5">
            <div className="signup-form ">
              <h2 className='pb-3 form-title'>Sign up</h2>
              <form onSubmit={formikObj.handleSubmit}>
               
                <div class="form-group d-flex border-bottom mb-3">
                  <label htmlFor="email" className='pt-1'><i class="fa-regular fa-envelope"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="email" class="form-control  border-0 " id="email" placeholder="Email " />
                </div>
                {formikObj.errors.email&&formikObj.touched.email?<p className='alert alert-danger w-100' >{formikObj.errors.email}</p>:''}
                <div class="form-group d-flex border-bottom mb-3">
                  <label htmlFor="password" className='pt-1'><i class="fa-solid fa-lock"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="password" class="form-control  border-0 " id="password" placeholder="Password " />
                </div>
                {formikObj.errors.password&&formikObj.touched.password?<p className='alert alert-danger w-100' >{formikObj.errors.password}</p>:''}
                <button type="submit" class="btn form-submit" disabled={!formikObj.isValid || !formikObj.dirty}>
                    {isLoading? <ColorRing
  visible={true}
  height="30"
  width="30"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff','#fff','#fff','#fff','#fff']}
  />:"Login"}
                    </button>

               
              </form>

            </div>
            <p >
            Don't have an account yet ?{" "}
              <Link to="/signup" className="text-decoration-none main-color  ">
              Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
}
