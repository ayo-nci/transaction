import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import DateTimePicker from 'react-datetime-picker';

const Transactiontable = () => {
    const [transactions, setTransactions] = useState([]);
    const columns = [
        { label: "Date", accessor: "date"},
        { label: "From Currency", accessor: "from_currency"},
        { label: "From Amount", accessor: "from_amount"},
        { label: "To Currency", accessor: "to_currency"},
        { label: "To Amount", accessor: "to_amount"},
        { label: "Price Type", accessor: "price_type"},  
    ];
    const navigate = useNavigate();
    const [datetimeValue, setDatetimevalue] = useState(new Date());

    useEffect(() => {
        axios.get("http://localhost:5000/transaction/transactions").then((response)=>{
            setTransactions(response.data);
        });
    },[]);

    const handleSorting = (sortField, sortOrder) =>{
        console.log(sortField + ':' + sortOrder);
        if (sortField){
            const sorted = [...transactions].sort((a,b) => {
                if (a[sortField] === null || a[sortField] === undefined) return 1;
                if (b[sortField] === null || b[sortField] === undefined) return -1;
                if (a[sortField] === null && b[sortField] === null ) return 0;
                console.log(a[sortField] + ':' + b[sortField]);
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc"? 1 : -1)
                );
            });
            setTransactions(sorted);
        }
    
    };

   // console.log("some transactions are " + transactions);
    return (<>
        <Container className="mt-2">
            <Row>
                <Col className="col-md-4 offset-md-4">
                    <Button variant="primary" type="button" onClick={() => navigate('/transaction/create')}>
                        Make transaction
                    </Button>
                </Col>
            </Row>
            <br>
            </br>
            <Row>
                <Col className="col-md-4 offset-md-4">
                    <DateTimePicker onChange={setDatetimevalue} value={datetimeValue}/>
                </Col>
            </Row>

            <br>
            </br>

        <table className="table">
            <caption>
                Some caption
            </caption>
            <TableHead columns={columns} handleSorting={handleSorting}/>
            <TableBody columns={columns} tableData={transactions} />
        </table>

           
        </Container>
    
    </>);
};

export default Transactiontable;