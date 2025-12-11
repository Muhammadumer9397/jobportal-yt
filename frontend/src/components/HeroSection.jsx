import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, BriefcaseBusiness } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="text-center py-16 bg-gradient-to-b from-white to-indigo-50">
            
            {/* Badge */}
            <div className="flex flex-col gap-6 my-10">
                <span className="mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 font-medium shadow-sm flex items-center gap-2">
                    <BriefcaseBusiness className="w-4 h-4" />
                    Pakistan’s No. 1 Job Platform
                </span>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 animate-fadeIn">
                    Search, Apply & <br />
                    Get Your 
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Dream Job</span>
                </h1>

                {/* Subtext */}
                <p className="max-w-2xl mx-auto text-gray-500 text-lg">
                    Find the perfect job that matches your skills, passion, and future goals.
                    Explore thousands of verified opportunities.
                </p>

                {/* Search Bar */}
                <div className="flex w-[90%] md:w-[45%] shadow-xl border border-gray-200 pl-4 rounded-full items-center gap-3 mx-auto bg-white/80 backdrop-blur-md">
                    <Search className="text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search jobs by title, company or skill..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full bg-transparent py-3"
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-r-full bg-gradient-to-r from-purple-600 to-indigo-600 px-10 hover:opacity-90 transition"
                    >
                        Search
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default HeroSection;
