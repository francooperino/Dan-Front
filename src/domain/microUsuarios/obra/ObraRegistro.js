import "./ObraRegistro.css";
import React from "react";
const ObraRegistro = () => {
  return (
    <div className="fondo">
      <div className="center">
        <ul className="form-register">
          <h4>Ingrese los datos de la obra</h4>
          <div className="asd">
            <input
              id="latlong"
              type="float"
              maxLength="10"
              placeholder="Latitud"
            ></input>
            <input
              id="latlong"
              type="float"
              maxLength="10"
              placeholder="Longitud"
            ></input>
            <input
              id="latlong"
              type="float"
              maxLength="10"
              placeholder="Superficie"
            ></input>
          </div>
          <input
            className="controls"
            type="float"
            placeholder="Cliente"
          ></input>
          <input
            className="controls"
            type="text"
            maxLength="20"
            placeholder="Dirección"
          ></input>
          <textarea
            className="controls"
            name="description"
            rows="10"
            cols="40"
            placeholder="Descripción"
          ></textarea>
          <button className="botons">Guardar</button>
        </ul>
      </div>
    </div>
  );
};

export default ObraRegistro;
