import React from 'react';
import axios from 'axios';

export async function postSucursal(unaSucursal,empleadosAsociados){
    try {
        let empleado = {
          'id': ''
        }
        let listEmpleados = [];

        empleadosAsociados.map((element) => {
          empleado = {...empleado};
          empleado.id=element;
          listEmpleados.push(empleado);
        });
        

        const json = JSON.stringify({
            ciudad: unaSucursal.ciudad, 
            cuitEmpresa: unaSucursal.cuit,
            direccion: unaSucursal.direccion,
            empleados: listEmpleados
        });
        const res = await axios.post('http://localhost:9004/api/sueldos/sucursal', json, {
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

export async function getAllSucursales(){
  try {
    return await axios.get( "http://localhost:9004/api/sueldos/sucursal");
  } catch (error) {
      console.log(error);
      return -1;
  }
}
export async function getSucursalPorId(idSucursal){
  try {
    console.log("Solicitud a: http://localhost:9004/api/sueldos/sucursal/"+idSucursal);
    return await axios.get( "http://localhost:9004/api/sueldos/sucursal/"+ idSucursal);
  } catch (error) {
      console.log(error);
      return -1;
  }
}

export async function getAllEmpleadosDisponibles(){
  try {
    return await axios.get( "http://127.0.0.1:9004/api/sueldos/empleado/empleadosNoAsociadosSucursal");
  } catch (error) {
      console.log(error);
      return -1;
  }
}

export async function removeSucursal(idSucursal){
  try {
    return await axios.delete("http://127.0.0.1:9004/api/sueldos/sucursal/"+idSucursal);
  } catch (error) {
      console.log(error);
      return -1;
  }
}

export async function updateSucursal(sucursal){
  const json = JSON.stringify({
    ciudad: sucursal.ciudad, 
    cuitEmpresa: sucursal.cuitEmpresa,
    direccion: sucursal.direccion
});
  try {
    return await axios.put('http://127.0.0.1:9004/api/sueldos/sucursal/'+sucursal.id, json, {
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