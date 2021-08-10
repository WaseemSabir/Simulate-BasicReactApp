import { Modal, Button } from "react-bootstrap";
import React, { useState } from 'react';

function PopUp(props) {

    const [type, setType] = useState('Default');
    const [month, setMonth] = useState('June');
    const [check, setCheck] = useState(false);
    const [another, setAnother] = useState(false);

    const closeButton = () =>{
        props.callBack();
    }

    const typeChange= (ev) =>{
        setAnother(false);
        setType(ev.target.value);
        if(ev.target.value==="Price")
        {
            setCheck(true);
        }
        else
        {
            setCheck(false);
        }
    }

    const monthChange = (ev) =>{
        setMonth(ev.target.value);
    }

    function Months(jal)
    {
        if(jal.hello)
        {
            return (
                <select className="form-select form-select-lg mb-3" value={month} onChange={monthChange}>
                    <option value="June">June</option>
                    <option value="July">July</option>
                </select>
            )
        }
        else
        {
            return (
                <>
                </>
            )
        }
    }

    function NotSelected(data)
    {
        if(data.hello)
        {
            return (
                <>
                    <br />
                    <div className="text-dark">No Options selected</div>
                </>
            )
        }
        else
        {
            return (
                <>
                </>
            )
        }
    }

    const ButtonClick= () =>{
        if(type==="Default")
        {
            setAnother(true);
        }
        else
        {
            props.updateData({
                'type' : type,
                'month' : month
            });
            props.callBack();
        }
    }

    return(
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Choices</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container mx-auto">
                <select className="form-select form-select-lg mb-3 mx-auto" value={type} onChange={typeChange}>
                    <option value="Default">Select The value</option>
                    <option value="Price">Price</option>
                    <option value="Facebook">Facebook</option>
                </select>
                <Months hello={check}/>
                <NotSelected hello={another}/>
                <br />
                <div className="btn btn-primary btn-lg my-2" onClick={ButtonClick}>Add</div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeButton}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUp;