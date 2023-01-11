import axios from "axios";
import { useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddTransactionForm = () => {
    const from_currency = useRef("");
    const from_amount = useRef("");
    const to_currency = useRef("");
    const to_amount = useRef("");
    const navigate = useNavigate();

    const addTransactionHandler = () => {

        var payload = {
            from_currency: from_currency.current.value,
            from_amount: from_amount.current.value,
            to_currency: to_currency.current.value,
            to_amount: to_amount.current.value,
            price_type: "Exchanged",
        };
        axios.post("http://localhost:5000/transaction/create", payload).then(() => {
            navigate("/");
        });
    };


    return (
        <form>
          <fieldset>
            <legend>Exchange</legend>
            <div>
              <label htmlFor="formFromCurrency">From Currency</label>
              <select ref={from_currency}>
                <option value="btc">BTC-Bitcoin</option>
                <option value="eth">ETH-Ethereum</option>
                <option value="xrp">XRP-Ripple</option>
                <option value="ltc">LTC-Litecoin</option>
              </select>
            </div>
            <div>
              <label htmlFor="formFromAmount">From Amount</label>
              <input type="number" ref={from_amount} />
            </div>
            <div>
              <label htmlFor="formToCurrency">To Currency</label>
              <select ref={to_currency}>
                <option value="usd">USD-US Dollars</option>
                <option value="eur">EUR-Euro</option>
                <option value="ngn">NGN-Naira</option>
                <option value="gbp">GBP-Pounds</option>
              </select>
            </div>
            <div>
              <label htmlFor="formToAmount">To Amount</label>
              <input type="number" ref={to_amount} />
            </div>
            <div>
              <button type="button" onClick={addTransactionHandler}>
                Save
              </button>
            </div>
          </fieldset>
        </form>
        
          );
};

export default AddTransactionForm;