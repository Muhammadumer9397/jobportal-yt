import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: [
            "United States", "United Kingdom", "Canada",
            "Germany", "Australia", "Dubai", "Singapore"
        ]
    },
    {
        filterType: "Job Role",
        array: [
            "Frontend Developer", "Backend Developer",
            "Full Stack Developer", "DevOps Engineer", "Data Scientist"
        ]
    },
    {
        filterType: "Salary (USD)",
        array: [
            "$0 - $2,000", "$2,000 - $5,000",
            "$5,000 - $10,000", "$10,000+"
        ]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-md border space-y-6">
            <div>
                <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
                <p className="text-sm text-gray-500">Choose location, role, or salary</p>
            </div>

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>

                {filterData.map((data, index) => (
                    <div key={index} className="space-y-3">
                        <h2 className="font-semibold text-lg text-[#6A38C2]">{data.filterType}</h2>

                        {/* ⭐ ROW-WISE CHIP STYLING ⭐ */}
                        <div className="flex flex-wrap gap-3">
                            {data.array.map((item, idx) => {
                                const id = `id${index}-${idx}`;
                                return (
                                    <label
                                        key={id}
                                        htmlFor={id}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer
                                            transition shadow-sm
                                            hover:bg-[#f4eeff] hover:border-[#6A38C2]
                                            ${selectedValue === item 
                                                ? "bg-[#6A38C2] text-white border-[#6A38C2]" 
                                                : "bg-white text-gray-700"}
                                        `}
                                    >
                                        <RadioGroupItem
                                            value={item}
                                            id={id}
                                            className="hidden"
                                        />
                                        {item}
                                    </label>
                                );
                            })}
                        </div>

                    </div>
                ))}

            </RadioGroup>

        </div>
    );
};

export default FilterCard;
