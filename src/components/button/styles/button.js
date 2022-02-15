import styled from 'styled-components';

export const button = styled.a`
    display: 'inline-block';
    width: ${({ style }) => style.width || '200px'};
    height: ${({ style }) => style.height || '50px'};
    background-color: ${({ style }) => style.backgroundColor || '#333'};
`;