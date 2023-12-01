import React, {useEffect, useState} from 'react';
import { Select } from '@mantine/core';
export const CarSortSelect = ({onChange}) => {
    const [value, setValue] = useState('make');
    const listData = () => {
        return [
            { value: 'designation', label: 'Make' },
            { value: 'km', label: 'km' },
            { value: 'reg_year', label: 'Registration year' },
            { value: 'price', label: 'Price' }
        ];
    }

    useEffect(() => {
        onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <>
            <Select
                placeholder="Make"
                data={listData()}
                maxDropdownHeight={400}
                clearable
                value={value}
                onChange={setValue}
            />
        </>
    )
}