import React from 'react';
import { Container, Item, Pane, Inner, Grid, Flex } from './styles'

export default function ContainerComponent({ children, ...restProps }) {
    return (
        <Container className='container__root' {...restProps}>
            {children}
        </Container>
    )
}

ContainerComponent.Flex = function ({ children, ...restProps }) {
    return <Flex className='container__flex' {...restProps}>
        {children}
    </Flex>
}

ContainerComponent.Grid = function ({ children, columns = 3, ...restProps }) {
    return <Grid className='container__grid' columns={columns} {...restProps}>
        {children}
    </Grid>
}

ContainerComponent.Item = function ({ children, width = '100%', padding = '10px', ...restProps }) {
    return <Item width={width} padding={padding} {...restProps}>
        {children}
    </Item>
}

ContainerComponent.Pane = function ({ children, ...restProps }) {
    return <Pane {...restProps}>
        {children}
    </Pane>
}

ContainerComponent.Inner = function ({ children, ...restProps }) {
    return <Inner {...restProps}>
        {children}
    </Inner>
}
