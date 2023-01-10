//Back up

import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import DateTimePicker from 'react-datetime-picker';
import { setDate } from "date-fns";
import GetRates from "../hooks/Getrates";

const Transactiontable = () => {
    const [transactions, setTransactions] = useState([]);
    
    const columns = [
        { label: "Date/Time", accessor: "date"},
        { label: "From Currency", accessor: "from_currency"},
        { label: "From Amount", accessor: "from_amount"},
        { label: "To Currency", accessor: "to_currency"},
        { label: "To Amount", accessor: "to_amount"},
        { label: "Price Type", accessor: "price_type"},  
    ];
    const navigate = useNavigate();
    const [datetimeValue, setDatetimevalue] = useState(new Date());
 

    const getAllTransactions = () => {
        axios.get(`http://localhost:5000/transaction/`).then((response)=>{
            setTransactions(response.data);
            
        });
    }

   

    useEffect(() => {
        getAllTransactions();
    },[]); 



    const handleDatePicker = (date) => {
        setDatetimevalue(date);
        if (!date) {getAllTransactions(); return }
        var payload = {"date": date};
        axios.post(`http://localhost:5000/transaction/date`, payload).then((response)=>{
            setTransactions(response.data);
        });
        console.log("datetimevalue is " + new Date(datetimeValue));
      }


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
            <br></br>
            <Row>
                <DateTimePicker
                    value={datetimeValue}
                    onChange={date=>handleDatePicker(date)}
                    />
            </Row>
    
        <table className="table">
            <caption>
                Exchange Watcher
            </caption>
            <TableHead columns={columns} handleSorting={handleSorting}/>
            <TableBody columns={columns} tableData={transactions} />
        </table>

           
        </Container>
    
    </>);
};

export default Transactiontable;