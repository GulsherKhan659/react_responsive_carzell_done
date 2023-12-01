import { Timeline, Text } from '@mantine/core';

export const OrderTimeLine = () => {
    return (
        <Timeline active={0} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<span className='material-symbols-outlined'>adjust</span>} title="Order processing">
                <Text color="dimmed" size="sm">We will confirm your order and send an invoice within the next few days</Text>
                <Text size="xs" mt={4}>In 2 days</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<span className='material-symbols-outlined'>adjust</span>} lineVariant="dashed" title="Transportation">
                <Text color="dimmed" size="sm">We will order and coordinate transportation and inform you of when expected arrival is.</Text>
                <Text size="xs" mt={4}>In 2 days</Text>
            </Timeline.Item>

        </Timeline>
    );
}