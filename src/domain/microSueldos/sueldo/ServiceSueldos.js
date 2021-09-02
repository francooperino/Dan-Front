import axios from "axios";
import { saveAs } from "file-saver";

const urlReporteRecibo="http://zuul:8081/reportes/"
const urlReciboSueldo="http://zuul:8081/reciboSueldo/"

export async function downloadRecibo(recibo) {
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  const { data } = await getDownloadRecibo(recibo.id)
  const blob = new Blob([data], { type: 'application/pdf' })
  saveAs(blob,  "ReciboSueldo_" +date+ "_id-" + recibo.id)
}


async function getDownloadRecibo(idRecibo) {
  return axios.get(
    urlReporteRecibo+"recibosueldo/" + parseInt(idRecibo),
    {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'arraybuffer'
  })
}

export const camposBackendSueldo = [
  {
    value: "id",
    label: "id",
  },
  {
    value: "numeroRecibo",
    label: "Numero recibo",
  },
  {
    value: "fechaEmision",
    label: "Fecha emision",
  },
  {
    value: "lugarDePago",
    label: "Lugar de pago",
  },
  {
    value: "fechaDePago",
    label: "Fecha de pago",
  },
  {
    value: "pagado",
    label: "Pagado",
  },
  {
    value: "totalBruto",
    label: "Total bruto",
  },
  {
    value: "totalNeto",
    label: "Total Neto",
  },
];

export const cabeceraTablaDetalleSueldo = [
  {
    value: "id",
    label: "id",
  },
  {
    value: "deduccion",
    label: "deduccion",
  },
  {
    value: "haber",
    label: "haber",
  },
  {
    value: "porcentaje",
    label: "porcentaje",
  },
  {
    value: "codigoDetalle",
    label: "codigoDetalle",
  },
  {
    value: "descripcion",
    label: "descripcion",
  },
];

export async function getAllSueldosData(){
   try{
  return await axios.get(
    urlReciboSueldo,{
      headers: {"Access-Control-Allow-Origin": "*"}
    }
    );
  } catch (error){
    console.log(error);
    return -1;
  }
};