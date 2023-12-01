import React, {forwardRef} from 'react';
import {Select, Group, Avatar, Text} from '@mantine/core';
export const CarBrandSelect = ({value, makes, onChange}) => {
    const listData = () => {
        let result = [];
        makes.map((item) => result.push({image: item.make_logo, label: item.make_name, value: item.make_id.toString()}))
        return result;
    }

    const SelectItem = forwardRef(
        ({image, label, ...others}, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar src={image} classNames={{image: 'rounded-full object-scale-down'}}/>
                    <div>
                        <Text size="sm">{label}</Text>
                    </div>
                </Group>
            </div>
        )
    );

    return (
        <>
            <Select
                placeholder={"Brand "}
                value={value}
                onChange={onChange}
                itemComponent={SelectItem}
                data={listData()}
                maxDropdownHeight={400}
                clearable
                // filter={(value, item) =>
                //     item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                //     item.description.toLowerCase().includes(value.toLowerCase().trim())
                // }
            />
        </>
    )
}