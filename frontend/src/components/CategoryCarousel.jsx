import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "UI/UX Designer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="my-16">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Explore Job Categories</h2>
            <Carousel className="w-full max-w-4xl mx-auto relative">
                <CarouselContent className="flex gap-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                className="rounded-full px-6 py-3 bg-[#6A38C2] text-white hover:bg-[#5b30a6] hover:scale-105 transition-transform shadow-md"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                
                <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                    <ChevronLeft className="w-6 h-6 text-[#6A38C2]" />
                </CarouselPrevious>

                
                <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                    <ChevronRight className="w-6 h-6 text-[#6A38C2]" />
                </CarouselNext>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
