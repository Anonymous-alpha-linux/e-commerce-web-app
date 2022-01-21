import styled from 'styled-components/macro';

export const Container = styled.div`
    max-width: 1550px;
    margin: 0 auto;
    width: 100%;
    background: #333;
    color: #fff;
`;

export const BackDrop = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #333;
    opacity: .8;
    position: fixed;
    top:0;
    left: 0;
`;


export const Item = styled.div`
    position: 'relative';
    width:  ${({ width }) => width};
    padding:  ${({ padding }) => padding};
`;

export const Pane = styled.div`
    
`;


export const Link = styled.a`
    color: ${({ color = '#fff' }) => color};
    text-decoration: none;
    list-style-type: none;
`;

export const Inner = styled.div`
    padding: 0 20px;
`;

export const InnerFluid = styled.div`
    padding: 0;
`;

export const MiddleInner = styled.div`
    transform: translate(-50%,-50%),
`;

export const Flex = styled.div`
    display: flex;
    direction: ${({ dir }) => dir};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: ${({ columns }) => `repeat(${columns}, minmax(310px, 1fr))`};
`