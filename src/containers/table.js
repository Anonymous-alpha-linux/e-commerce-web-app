import React from 'react';
import { Table } from '../components';

export default function TableContainer() {
    return <Table>
        <Table.Row>
            <Table.ColumnHead>ID</Table.ColumnHead>
            <Table.ColumnHead>Name</Table.ColumnHead>
            <Table.ColumnHead>Email</Table.ColumnHead>
            <Table.ColumnHead>Address</Table.ColumnHead>
        </Table.Row>
        <Table.Row>
            <Table.Column>1</Table.Column>
            <Table.Column>Nguyen Tinh</Table.Column>
            <Table.Column>Email@gmail.com</Table.Column>
            <Table.Column>123 Ly Thuong Kiet, Da Nang</Table.Column>
        </Table.Row>
    </Table>;
}
