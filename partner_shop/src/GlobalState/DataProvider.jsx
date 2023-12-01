import React, { useState } from "react";
import DataContext from "./DataContext";

const DataProvider = ({ children, value }) => {
    const [sharedData, setSharedData] = useState(value);

    const updateSharedData = (newData) => {
        setSharedData({ ...sharedData, ...newData });
    };

    return (
        <DataContext.Provider value={{ sharedData, updateSharedData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;