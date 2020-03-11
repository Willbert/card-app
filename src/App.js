import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { stateMachine } from './machine/statemachine';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [machine, send] = useMachine(stateMachine);
  const [form, updateForm] = useState({
    name: '',
    card: '',
  });

  console.log(machine.value);

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>State Machine test</h2>
      </div>

      {machine.matches('error') ? (
        <div className="alert error">
          {machine.context.msg ? machine.context.msg : 'Oh no, No error message' }
        </div>
      ) : null }

      <div className="form-body">
        <form
          onSubmit= {
            e => {
              e.preventDefault();
              send({type: 'SUBMIT', data: {...form}})
            }
          }
        >
          <div className="form-group">
            <label htmlFor="NameOnCard">Name on the Card</label>
            <input
              id="NameOnCard"
              className="form-control"
              type="text"
              maxLength="255"
              value={form.name}
              onChange={e => updateForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CreditCardNumber">Credit Card Number</label>
            <input
              id="CreditcardNumber"
              className="null card-image form-control"
              type="text"
              value={form.card}
              onChange={e => updateForm({ ...form, card: e.target.value })}
            />
            <button
              id="payButton"
              className="btn btn-block btn-success submit-button"
              type="submit"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
