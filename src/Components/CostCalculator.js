import React, { useState } from "react";

export default function CostCalculator() {
    const [workType, setWorkType] = useState("");
    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [finalPrice, setFinalPrice] = useState(null);

    // Dummy Price Data (You will update later)
    const priceTable = {
        Consulting: {
            "Architecture": { "2BHK": 50000, "3BHK": 75000, "4BHK": 125000, "5BHK": 175000 },
            "Residential Interior": { "2BHK": 60000, "3BHK": 90000, "4BHK": 125000, "5BHK": 165000 },
            "Commercial Interior": { "2BHK": 70000, "3BHK": 105000, "4BHK": 200000, "5BHK": 250000 },
        },
        Turnkey: {
            "Architecture": {
                "2BHK": { min: 1500000, max: 1800000 },
                "3BHK": { min: 2200000, max: 2500000 },
                "4BHK": { min: 3500000, max: 4500000 },
                "5BHK": { min: 5500000, max: 7000000 },
            },
            "Residential Interior": {
                "2BHK": { min: 800000, max: 1200000 },
                "3BHK": { min: 1500000, max: 2200000 },
                "4BHK": { min: 2500000, max: 3500000 },
                "5BHK": { min: 4000000, max: 6000000 },
            },
            "Commercial Interior": {
                "2BHK": { min: 1500000, max: 1700000 },
                "3BHK": { min: 2200000, max: 2800000 },
                "4BHK": { min: 3500000, max: 5000000 },
                "5BHK": { min: 6500000, max: 8000000 },
            },
        },
    };

    const areaOptions = {
        "2BHK": "2BHK / upto 1000 sqft",
        "3BHK": "3BHK / upto 1500 sqft",
        "4BHK": "4BHK / upto 2500 sqft",
        "5BHK": "5BHK / upto 3500 sqft",
    };

    const calculatePrice = () => {
        if (workType && category && area) {
            const price = priceTable[workType][category][area];
            setFinalPrice(price);
        }
    };

    return (
        <section className="py-20 bg-[#f7f9f9]">
            <div className="max-w-3xl mx-auto text-center px-6">

                {/* Title */}
                <h2 className="text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-8">
                    Project <span className="text-[#6b8c9a]">Cost Calculator</span>
                </h2>

                {/* STEP 1: Work Type */}
                <div className="mt-8">
                    <h3 className="text-xl font-[Vollkorn] text-[#2C4953] mb-4">Select Work Type</h3>
                    <div className="flex justify-center gap-4">
                        {["Consulting", "Turnkey"].map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setWorkType(type);
                                    setCategory("");
                                    setArea("");
                                    setFinalPrice(null);
                                }}
                                className={`px-6 py-3 border rounded-xl font-[Vollkorn] transition-all
                ${workType === type ? "bg-[#2C4953] text-white" : "bg-white text-[#2C4953] border-[#2C4953] hover:bg-[#2C4953] hover:text-white"}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* STEP 2: Category */}
                {workType && (
                    <div className="mt-10">
                        <h3 className="text-xl font-[Vollkorn] text-[#2C4953] mb-4">Select Category</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {["Architecture", "Residential Interior", "Commercial Interior"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCategory(cat);
                                        setArea("");
                                        setFinalPrice(null);
                                    }}
                                    className={`px-6 py-3 border rounded-xl font-[Vollkorn] transition-all
                ${category === cat ? "bg-[#476772] text-white" : "bg-white text-[#476772] border-[#476772] hover:bg-[#476772] hover:text-white"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: Area */}
                {category && (
                    <div className="mt-10">
                        <h3 className="text-xl font-[Vollkorn] text-[#2C4953] mb-4">Select Area</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.keys(areaOptions).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setArea(key);
                                        setFinalPrice(null);
                                    }}
                                    className={`px-6 py-3 border rounded-xl font-[Vollkorn] transition-all
                ${area === key ? "bg-[#6b8c9a] text-white" : "bg-white text-[#6b8c9a] border-[#6b8c9a] hover:bg-[#6b8c9a] hover:text-white"}`}
                                >
                                    {areaOptions[key]}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 4: Final Price */}
                {area && (
                    <button
                        onClick={calculatePrice}
                        className="mt-10 px-10 py-4 bg-[#2C4953] text-white rounded-xl font-[Vollkorn] text-xl hover:bg-[#476772] transition-all"
                    >
                        Get Estimated Price
                    </button>
                )}

                {finalPrice !== null && (
                    <div className="relative mt-10 p-6 bg-white shadow-lg  text-center border border-white-200 bg-[url(/images/logo/footer-bg.jpg)] bg-cover bg-center">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#d5dbdd]/80"></div>
                        <h3 className="relative z-10 text-2xl font-[Vollkorn] text-[#2C4953]">Estimated Price From <strong> Aaxiero Design Studio</strong></h3>


                        {/* If price is number (Consulting) */}
                        {typeof finalPrice === "number" ? (
                            <p className="relative z-10  text-4xl font-bold text-[#476772] mt-2">
                                ₹ {finalPrice.toLocaleString()}
                            </p>
                        ) : (
                            /* If price is object (Turnkey) */
                            <p className="relative z-10 text-xl md:text-3xl font-bold text-[#476772] mt-2">
                                ₹ {finalPrice.min.toLocaleString()} – ₹ {finalPrice.max.toLocaleString()}
                            </p>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}
