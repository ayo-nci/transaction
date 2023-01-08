import axios from "axios";
import { useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




const AddTransaction = () => {
    const from_currency = useRef("");
    const from_amount = useRef("");
    const to_currency = useRef("");
    const to_amount = useRef("");
    const price_type = useRef("");
    const navigate = useNavigate();

    const addTransactionHandler = () => {

        var payload = {
            from_currency: from_currency.current.value,
            from_amount: from_amount.current.value,
            to_currency: to_currency.current.value,
            to_amount: to_amount.current.value,
            price_type: price_type.current.value,
        };
        //console.log("some payload is " + payload)
        axios.post("http://localhost:5000/transaction/create", payload).then(() => {
            navigate("/");
        });
    };


    return <>

    <Container className="mt-2">
        <Row>
            <Col className="col-md-8 offset-md-2">
                <legend> Add New Transaction</legend>
                <Form.Group className="mb-3" controlId="formFromCurrency">
                    <Form.Label>From Currency</Form.Label>
                    <Form.Select ref={from_currency}>
                    <option value="usd">USD-US Dollars</option>
                    <option value="eur">EUR-Euro</option>
                    <option value="ngn">NGN-Naira</option>
                    <option value="gbp">GBP-Pounds</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFromAmount">
                    <Form.Label>From Amount</Form.Label>
                    <Form.Control type="number" ref={from_amount} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formToCurrency">
                    <Form.Label>To Currency</Form.Label>
                    <Form.Select ref={to_currency}>
                    <option value="bitcoin">BTC-Bitcoin</option>
                    <option value="ethereum">ETH-Ethereum</option>
                    <option value="ripple">XRP-Ripple</option>
                    <option value="litecoin">LTC-Litecoin</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formToAmount">
                    <Form.Label>To Amount</Form.Label>
                    <Form.Control type="number" ref={to_amount} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPriceType">
                    <Form.Label>Price Type</Form.Label>
                    <Form.Control type="text" ref={price_type} />
                </Form.Group>
                <Button
                    type="button"
                    variant="primary"
                    onClick={addTransactionHandler}
                >
                    Add/perform transaction
                </Button>

            </Col>
        </Row>
    </Container> 
    </>
};

export default AddTransaction;