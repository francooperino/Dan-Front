import axios from "axios";

const server = "http://127.0.0.1:9014/";
const apiRest = "api/sueldos/recibosueldo/codigodetalle/";

export async function getAllCodigoDetalle() {
  try {
    return await axios.get(server + apiRest);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export const camposBackendCodigoDetalle = [
  {
    value: "id",
    label: "Id",
  },
  {
    value: "codigoDetalle",
    label: "Codigo Detalle",
  },
  {
    value: "descripcion",
    label: "Descripcion",
  },
  {
    value: "haber",
    label: "Haber",
  },
  {
    value: "porcentaje",
    label: "Porcentaje",
  },
];

export async function deleteCodigoDetalle(numeroCodigoDetalle) {
  try {
    return await axios.delete(server + apiRest + numeroCodigoDetalle);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function obtenerCodigoDetalle(numeroCodigoDetalle) {
  try {
    return await axios.get(server + apiRest + numeroCodigoDetalle);
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function actualizarCodigoDetalle(id,codigoDetalle,descripcion,haber,porcentaje) {

  try {
    return await axios.put(server + apiRest + id,{
      "id":id,
      "codigoDetalle": codigoDetalle,
      "descripcion":descripcion,
      "haber":haber,
      "porcentaje":porcentaje
    });
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function guardarCodigoDetalle(codigoDetalle,descripcion,haber,porcentaje) {
  try {
    return await axios.post(server + apiRest,{
      "codigoDetalle": codigoDetalle,
      "descripcion":descripcion,
      "haber":haber,
      "porcentaje":porcentaje
    });
  } catch (error) {
    console.log(error);
    return -1;
  }
}

