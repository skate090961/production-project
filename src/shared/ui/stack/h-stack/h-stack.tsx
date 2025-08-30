import { Flex, FlexProps } from '../flex/flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = ({ children, ...otherProps }: HStackProps) => (
    <Flex
        direction="row"
        {...otherProps}
    >
        {children}
    </Flex>
);
