import styled from 'styled-components/macro';

export const Container = styled.div`
    max-width: 1500px;
    margin: 0 auto;
`

export const Item = styled.div`
   width:  ${({ width }) => width};
   padding:  ${({ padding }) => padding};
`

export const Pane = styled.div`
    
`;


export const Link = styled.a`
    color: ${({ color = '#fff' }) => color};
`;

export const Inner = styled.div`
    padding: 0 20px;
`;

export const InnerFluid = styled.div`
    padding: 0;
`;

export const Flex = styled.div`
    display: flex;
    direction: ${({ dir }) => dir};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: ${({ columns }) => `repeat(${columns}, minmax(310px, 1fr))`};
`