import styled from 'styled-components/macro';

export const Container = styled.div`
    max-width: 100%;
    margin: 0 auto;
    width: 100%;
    background: #333;
    color: var(--primary-color);
`;

export const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    background-color: #333;
    opacity: .8;
    position: fixed;
    top:0;
    left: 0;
`;


export const Item = styled.div`
    position: relative;
    width:  ${({ width }) => width};
    // padding:  ${({ padding }) => padding};
`;

export const Pane = styled.div`
    
`;


export const Link = styled.a`
    color: ${({ color = 'var(--primary-color)' }) => color};
    // font-size: 20px;
    text-decoration: none;
    list-style-type: none;
<<<<<<< HEAD
    padding:  0 30px;
=======
    padding: 5px
>>>>>>> 8579232af23b549d231d31e80ed6eb822def4d3d
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
    flex-direction: column;
    direction: ${({ dir }) => dir};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: ${({ columns }) => `repeat(${columns}, minmax(auto, 1fr))`};
`