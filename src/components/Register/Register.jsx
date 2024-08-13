import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = {
    name: '',
    email: '',
    password: '',
    age: '',
    phone: ''
  }
  async function userRegister(user) {
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp", user);
      if (data.msg == "done") { 
        setTimeout(() => {
        navigate("/login");
      }, 0); }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: userRegister,
    validate: function (values) {
      const errors = {}
      if (values.name.length < 4 || values.name.length > 10) { errors.name = "Name must be from 4 characters and 10 characters " }
      if (values.password.length < 6 || values.password.length > 12) { errors.password = "Password must be from 6 characters and 12 characters " }
      if (values.age < 15) { errors.age = "Age must be greater than 15" }
      if (values.email.includes("@") === false || values.email.includes('.') === false) { errors.email = "Email Invalid ." }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) { errors.phone = 'Phone Invalid.' }
      console.log(errors);
      return errors;
    }
  })

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
                <div class="form-group  d-flex border-bottom mb-3">
                  <label htmlFor="name" className='pt-1'><i class="fa-solid fa-user"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} type="text" class="form-control  border-0 " id="name" placeholder="Frist Name " />
                </div>
                {formikObj.errors.name && formikObj.touched.name ? <p className='alert alert-danger w-100' >{formikObj.errors.name}</p> : ''}

                <div class="form-group d-flex border-bottom mb-3">
                  <label htmlFor="email" className='pt-1'><i class="fa-regular fa-envelope"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="email" class="form-control  border-0 " id="email" placeholder="Email " />
                </div>
                {formikObj.errors.email && formikObj.touched.email ? <p className='alert alert-danger w-100' >{formikObj.errors.email}</p> : ''}
                <div class="form-group d-flex border-bottom mb-3">
                  <label htmlFor="password" className='pt-1'><i class="fa-solid fa-lock"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="password" class="form-control  border-0 " id="password" placeholder="Password " />
                </div>
                {formikObj.errors.password && formikObj.touched.password ? <p className='alert alert-danger w-100' >{formikObj.errors.password}</p> : ''}

                <div class="form-group d-flex border-bottom mb-3">
                  <label htmlFor="age" className='pt-1'> <i class="fa-solid fa-calendar-days"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="text" inputMode='numeric' class="form-control  border-0 " id="age" placeholder="Age " />
                </div>
                {formikObj.errors.age && formikObj.touched.age ? <p className='alert alert-danger w-100' >{formikObj.errors.age}</p> : ''}

                <div class="form-group d-flex border-bottom  mb-3">
                  <label htmlFor="phone" className='pt-1'><i class="fa-solid fa-mobile-screen-button"></i></label>
                  <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="tel" inputMode='numeric' class="form-control  border-0 " id="phone" placeholder="Phone " />
                </div>
                {formikObj.errors.phone && formikObj.touched.phone ? <p className='alert alert-danger w-100' >{formikObj.errors.phone}</p> : ''}


                <button type="submit" class="btn form-submit" disabled={!formikObj.isValid || !formikObj.dirty}>
                  {isLoading ? <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                  /> : "Sign Up"}
                </button>

              </form>


            </div>
            <p className='pt-5'>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-none main-color  ">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
}
