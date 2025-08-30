import { Flex, FlexProps } from '../flex/flex';

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = ({ children, ...otherProps }: VStackProps) => (
    <Flex
        align="normal"
        direction="column"
        {...otherProps}
    >
        {children}
    </Flex>
);
