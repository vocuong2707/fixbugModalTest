"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../Utils/NavItems";
import { ThemeSwitcher } from "../Utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../Utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSession } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSilce";
import Loader from "./Loader/Loader";
import TestModal from "../components/TestModal"; // Import TestModal component
import Image from "next/image";
import avatar from "../../public/asstes/avatar.png";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, setRoute, open, route }) => {
  const [active, setActive] = useState(false);
  const [openSideabr, setOpenSideabr] = useState(false);
  const { data } = useSession();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const [openTestModal, setOpenTestModal] = useState(false); // State for test modal

  // Check if the user is logged in and has completed the test
  useEffect(() => {
    if (userData) {
      // If user is logged in and hasn't completed the test, open the modal
      if (!userData.user.isTest) {
        setOpenTestModal(true);
      }
    }
  }, [userData]); // Re-run when userData changes

  const handleTestCompletion = () => {
    if (userData) {
      userData.user.isTest = true; // Update the user's test completion status
      setOpenTestModal(false); // Close the test modal after completion
    }
  };

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideabr(false);
    }
  };

  // Scroll event to change the header style on scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative">
          <div
            className={`${
              active
                ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80px] dark:shadow"
            }`}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">
                <div>
                  <Link
                    href={"/"}
                    className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                  >
                    Học Trực Tuyến
                  </Link>
                </div>
                <div className="flex items-center">
                  <NavItems
                    activeItem={activeItem} // Truyền activeItem chính xác
                    isMobile={false} // Truyền giá trị isMobile
                  />
                  <ThemeSwitcher />
                  {/* only for mobile */}
                  <div className="md:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                      onClick={() => setOpenSideabr(true)}
                    />
                  </div>
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                        alt=""
                        height={30}
                        width={30}
                        className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                        style={{
                          border:
                            activeItem == 5 ? "2px solid #ffc107" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer hidden md:block dark:text-white text-black"
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* mobile sidebar */}
            {openSideabr && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 ">
                  <NavItems activeItem={activeItem} isMobile={true} />
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                        alt=""
                        height={30}
                        width={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{
                          border:
                            activeItem == 5 ? "2px solid #ffc107" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer hidden md:block dark:text-white text-black"
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                  )}
                  <br />
                  <br />
                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                    Đại Học Công Nghiệp IUH
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Show TestModal if the user has not completed the test */}
          {openTestModal && (
            <TestModal open={openTestModal} setOpen={setOpenTestModal} onTestCompleted={handleTestCompletion} />
          )}

          {/* Modal for Login, Sign-Up, Verification, etc. */}
          {route === "Login" && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
          {route === "Sign-Up" && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
          {route === "Verification" && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;
