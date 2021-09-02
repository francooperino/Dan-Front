import "./ClientesForm.css";
import { useState } from "react";
import React from "react";

const ClientesForm = ({ cliente, actualizarValor }) => {
  const [razonSocial, setRazonSocial] = useState(cliente.razonSocial);
  const [cuit, setCuit] = useState(cliente.cuit);
  const [mail, setMail] = useState(cliente.mail);
  const [maxCuentaCorriente, setMaxCuentaCorriente] = useState(
    cliente.maxCuentaCorriente
  );
  const [habilitadoOnline, setHabilitadoOnline] = useState(
    cliente.habilitadoOnline
  );

  const actualizarRazonSocial = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    console.log("nuevo valor RZ " + nuevoValor);
    setRazonSocial(nuevoValor);
  };
  const actualizarCuit = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    console.log("nuevo valor Cuit" + nuevoValor);
    setCuit(nuevoValor);
  };
  const actualizarMail = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    console.log("nuevo valor Mail" + nuevoValor);
    setMail(nuevoValor);
  };
  const actualizarCuentaCorriente = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    console.log("nuevo valor CR" + nuevoValor);
    setMaxCuentaCorriente(nuevoValor);
  };
  const actualizarHabilitadoOnline = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    console.log("nuevo valor HO" + nuevoValor);
    setHabilitadoOnline(nuevoValor);
  };
  return (
    <section>
      <ul class="form-register">
        <h4>Dar de alta clientes</h4>
        <li class="controls">
          <div class="fifty-fifty">
            {/* Cuando necesite disponer elementos, encerrar entre divs */}
            <label>Razón social</label>
            <input
              name="razonSocial"
              value={razonSocial}
              onChange={actualizarRazonSocial}
            />
          </div>
        </li>
        <li class="controls">
          <div class="fifty-fifty">
            <label>Cuit</label>
            <input name="cuit" value={cuit} onChange={actualizarCuit} />
          </div>
        </li>
        <li class="controls">
          <div class="fifty-fifty">
            <label>Email</label>
            <input name="email" value={mail} onChange={actualizarMail} />
          </div>
        </li>
        <li class="controls">
          <div class="fifty-fifty">
            <label>Max cuenta corriente</label>
            <input
              name="maxCuentaCorriente"
              value={maxCuentaCorriente}
              onChange={actualizarCuentaCorriente}
            />
          </div>
        </li>
        <li class="controls">
          <div class="fifty-fifty">
            <label>Habilitado Online</label>
            <input
              name="habilitadoOnline"
              type="checkbox"
              value={habilitadoOnline}
              onChange={actualizarHabilitadoOnline}
            />
          </div>
        </li>
        <li class="controls">
          <div class="fifty-fifty-botons">
            <button type="botons" onClick={() => actualizarValor(cliente)}>
              Guardar
            </button>
            <button type="botons">Cancelar</button>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ClientesForm;
