import React from 'react';

export default function Table({ children, ...restProps }) {
    return <table {...restProps}>
        {children}
    </table>;
}

Table.ColumnHead = function ({ children, ...restProps }) {
    return <th {...restProps}>
        {children}
    </th>
}
Table.Column = function ({ children, ...restProps }) {
    return <td></td>
}

Table.Row = function ({ children, ...restProps }) {
    return <tr {...restProps}>{children}</tr>
}


