
import React, { useEffect, useState } from 'react';

// Define the type for the data structure
interface DataItem {
    promptTitle: string;
    category: string;
    promptText: string;
}

const PromptFilterList: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [uniqueCategories, setUniqueCategories] = useState<any[]>([]);

    // Fetch the JSON data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('promptLibrary.json');
                const json = await response.json();
                setData(json);

                // Extract unique categories
                const categories = Array.from(new Set(json.map((item: DataItem) => item.category)));
                setUniqueCategories(["Show all", ...categories]);
            } catch (error) {
                console.error('Error fetching the JSON:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h6>Filters</h6>
            <div style={{flexWrap:'wrap'}}>
                {uniqueCategories.map((category, index) => (
                    <button key={index} className="m-1 bg-punchy-tan" style={{fontSize:'10px', padding:'5px', border:'1px solid #F1A331', borderRadius:'10px'}}>
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PromptFilterList;