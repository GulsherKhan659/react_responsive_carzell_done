import React from 'react';
import {Button} from "@mantine/core";
import {axiosInstance} from "../../Api/AxiosConfig";

export const DownloadCarListInExcelFormat = () => {

    const getFileFromServer = () => {
        axiosInstance
            .get('/shop/export/excel', {responseType: 'json', headers: {'Accept': 'application/vnd.ms-excel', 'Content-Type': 'application/json; charset=utf-8'}})
            .then((response) => {
                const a = document.createElement('a');
                a.href = response.data.file;
                a.download = 'carzelle_offers.xlsx';
                a.style.display = 'none';

                document.body.appendChild(a);
                a.click();
            })
            .catch((error) => {
                console.error("Error fetching file:", error);
            });
    }

    return (
        <>
            <div className='flex items-center justify-center bg-white p-4 w-full rounded-xl pr-4'>
                <div>
                    <Button type='filled' onClick={getFileFromServer}>Export to Excel</Button>
                </div>
            </div>
        </>
    )
}