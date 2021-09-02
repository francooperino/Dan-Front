import React from 'react';
import axios from 'axios';


const url="http://127.0.0.1:8081/sueldoEmpleado";

export async function getAllEmpleados() {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function postDatoBancario(datoBancario, empleado) {
  try {
    const json = JSON.stringify({
      nombreBanco: datoBancario.nombrebanco,
      numeroCuenta: datoBancario.numerocuenta,
      empleado: empleado
    });
    const res = await axios.post(url+'/datobancario', json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
    return res;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function getDatoBancarioPorId(idDatoBancario) {
  try {
    return await axios.get(url+"/datobancario/"+idDatoBancario);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function getAllDatoBancario() {
  try {
    return await axios.get(url+"/datobancario");
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function getAllDatoBancarioPorIdEmpleado(idEmpleado) {
  try {
    return await axios.get(url+"/datobancario?idEmpleado="+idEmpleado);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function removeDatoBancario(idDatoBancario) {
  try {
    return await axios.delete(url+"/datobancario/"+idDatoBancario);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function updateDatoBancario(datoBancario) {
  try {
    const json = JSON.stringify({
      nombreBanco: datoBancario.nombreBanco,
      numeroCuenta: datoBancario.numeroCuenta,
      empleado: datoBancario.empleado
    });
    return await axios.put(url+'/datobancario/'+datoBancario.id, json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
    return -1;
  }
}

