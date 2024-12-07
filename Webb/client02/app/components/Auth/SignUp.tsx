import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Style } from '../../style/stylelogin';
import { useRegisterMutation } from '../../../redux/features/auth/authApi';
import toast from 'react-hot-toast';


type Props = {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6, "Password must be at least 6 characters"),
});


const SignUp:FC<Props> = ({setRoute}) => {

    const [show, setShow] = useState(false);
    const [register,{data,error,isSuccess}] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration successful";
            toast.success (message);
            setRoute("Verification");
        }
        if(error) {
            if("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
        },[isSuccess,error]);

    const formik = useFormik({
        initialValues: { name:"",email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name,email, password }) => {
            const data = {
                name, email,password
            };
            await register(data);
            console.log(data)
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return ( 
        <div className='w-full'>
        <h1 className={`${Style.title}`}>
            Đăng Ký
        </h1>
        <form onSubmit={handleSubmit} >
            <div className='mb-3'>
            <label className={`${Style.Label}`} 
            htmlFor= "name">
                Nhập tên của bạn
            </label>
            <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="name"
            className={`${errors.name && touched.name && "border-red-500"}
            ${Style.input}`}
            />
            {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
            )}
            </div>
            <label className={`${Style.Label}`} 
            htmlFor= "email">
                nhập email của bạn
            </label>
            <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="logingmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"}
            ${Style.input}`}
            />
            {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
                <div className="w-full mt-5 relative mb-1">
                <label className={`${Style.Label}`} htmlFor="email">
                Nhập mật khẩu của bạn
                </label>
                <input
                    type={!show ? "password": "text"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="password!@%"
                    className={`${errors.password && touched.password && "border-red-500"} ${
                            Style.input}`} />
                    {!show ? (
                        <AiOutlineEyeInvisible
                        className="absolute bottom-3 right-2 z-1 cursor-pointer"
                        size={20}
                        onClick={() => setShow(true)}
                    />
                    ):(
                        <AiOutlineEye
                        className="absolute bottom-3 right-2 z-1 cursor-pointer"
                        size={20}
                        onClick={() => setShow(false)}
                        />
                    )}
                </div>
                {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                )}
                <div className="w-full mt-5">
                    <input
                        type="submit"
                        value="Đăng Ký"
                        className={`${Style.button}`}
                    />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Hoặc tham gia cùng
                </h5>
                <div className="flex items-center justify-center my-3">
                <FcGoogle size={30} className="cursor-pointer mr-2" 
                    //  onClick={() => signUp("google", { callbackUrl: '/dashboard' }).catch(handleError)}
                />
                <AiFillGithub size={30} className="cursor-pointer ml-2"
                    // onClick={() => signUp("github", { callbackUrl: '/dashboard' }).catch(handleError)}
                />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                Đã có tài khoản?{""}
                    <span className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >                             
                    Đăng nhập
                    </span>
                </h5>
        </form>
    </div>
);
};

export default SignUp;