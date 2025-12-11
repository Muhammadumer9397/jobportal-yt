import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Briefcase, UserRound, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6 md:px-10">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer group transition-all duration-300">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Briefcase className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors duration-300" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-yellow-300 transition-colors duration-300">
              Talent<span className="text-indigo-100">Bridge</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex font-medium items-center gap-8 text-white text-lg">
          {user && user.role === "recruiter" ? (
            <>
              <li className="hover:text-yellow-300 transition">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-yellow-200 transition">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-yellow-200 transition">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="hover:text-yellow-200 transition">
                <Link to="/browse">Browse</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* User Actions */}
        {!user ? (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-colors duration-300"
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="bg-[#6A38C2] text-white font-semibold hover:bg-[#5B2EB0] hover:shadow-lg transition duration-300">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer p-3 rounded-full bg-white/20 hover:bg-white/30 transition">
                <UserRound className="w-6 h-6 text-white" />
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-80 shadow-xl border-none">
              <div>
                {/* USER INFO */}
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <UserRound className="text-indigo-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="border-b my-3"></div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-2 text-gray-700">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                      <User2 className="w-5 h-5" />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                    <LogOut className="w-5 h-5" />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 flex flex-col gap-4 text-white font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>
                Companies
              </Link>
              <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                Jobs
              </Link>
              <Link to="/browse" onClick={() => setMenuOpen(false)}>
                Browse
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
