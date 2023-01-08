import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/transaction/transactions").then((response)=>{
            setTransactions(response.data);
        });
    },[]);

    return (<>
        <Container className="mt-2">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Date </th>
                        <th> From Currency </th>
                        <th> From Amount </th>
                        <th> To Currency </th>
                        <th> To Amount </th>
                        <th> Price Type </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction)=> (
                        <tr key={transaction._id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.from_currency}</td>
                            <td>{transaction.from_amount}</td>
                            <td>{transaction.to_currency}</td>
                            <td>{transaction.to_amount}</td>
                            <td>{transaction.price_type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    
    </>);
};

export default AllTransactions;