//Back up

import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import DateTimePicker from 'react-datetime-picker';
import AddTransactionForm from "./AddTransactionForm";
import io from "socket.io-client";
import Pagination from "./Pagination";

const Transactiontable = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //Tracks the current page for pagination
    const [pageSize, setPageSize] = useState(10); //Load 10 records per page
    const [totalPages, setTotalPages] = useState(0); //How many records returned divided by pagesize
    
    const columns = [
        { label: "Date/Time", accessor: "date"},
        { label: "From Currency", accessor: "from_currency"},
        { label: "From Amount", accessor: "from_amount"},
        { label: "To Currency", accessor: "to_currency"},
        { label: "To Amount", accessor: "to_amount"},
        { label: "Price Type", accessor: "price_type"},  
    ];

    const navigate = useNavigate();
    const [datetimeValue, setDatetimevalue] = useState(new Date()); //Gets date for picker
 
    //Load exchange rate history from DB
    const getAllTransactions = () => {
        axios.get(`http://localhost:5000/transaction/`).then((response)=>{
            setTransactions(response.data);
            setTotalPages(Math.ceil(response.data.length / pageSize));
        });
    }

   //Websocket stream to table
    useEffect(() => {
        getAllTransactions();

        const socket = io("http://localhost:5000/transaction");
        socket.on("exchangeRateUpdated", () => {
            getAllTransactions();
        });

        return () => {
            socket.disconnect();
        };
    }, []);  


    //Gets date value from date picker and posts request to server for processing
    const handleDatePicker = (date) => {
        setDatetimevalue(date);
        if (!date) {getAllTransactions(); return }
        var payload = {"date": date};
        axios.post(`http://localhost:5000/transaction/date`, payload).then((response)=>{
            setTransactions(response.data);
            setTotalPages(Math.ceil(response.data.length / pageSize));
        });
      }

      //Allows sorting on columns
    const handleSorting = (sortField, sortOrder) =>{
        if (sortField){
            const sorted = [...transactions].sort((a,b) => {
                if (a[sortField] === null || a[sortField] === undefined) return 1;
                if (b[sortField] === null || b[sortField] === undefined) return -1;
                if (a[sortField] === null && b[sortField] === null ) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "dsc"? 1 : -1)
                );
            });
            setTransactions(sorted);
        }
    
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const paginatedData = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setTotalPages(Math.ceil(transactions.length / pageSize));
        setCurrentPage(1);
    }
   return (
    <>
    <Row>
    <Col className="col-md-4 offset-md-4">
        <label htmlFor="page-size-select">Items per page:</label>
        <select id="page-size-select" value={pageSize} onChange={handlePageSizeChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
        </select>
    </Col>
</Row>
        <Container className="mt-2">
            <AddTransactionForm />
            <br></br>
            <Row>
                <DateTimePicker
                    value={datetimeValue}
                    onChange={date => handleDatePicker(date)}
                />
            </Row>

        <table className="table">
            <caption>
                Exchange History
            </caption>
            <TableHead columns={columns} handleSorting={handleSorting} />
            <TableBody columns={columns} tableData={paginatedData} />
        </table>

            <Row>
                <Col className="col-md-4 offset-md-4">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    </>
);
};

export default Transactiontable;