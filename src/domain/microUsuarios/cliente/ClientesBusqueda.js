import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Select,
  Stack,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";


const prueba = [
  {
    id: "          ",
    razonSocial: "       ",
    cuit: "           ",
    mail: "          ",
    maxCuentaCorriente: null,
    habilitadoOnline: false,
    obras: [
      {
        id: 1,
        descripcion: "Bunquer",
        latitud: 2.45,
        longitud: 89.11,
        direccion: "Av Bajo Tierra 888",
        superficie: 10000,
        tipo: {
          id: 1,
          descripcion: "REFORMA",
        },
      },
    ],
    user: {
      id: 1,
      user: "juan@gmail.com",
      password: "1234",
      tipoUsuario: {
        id: 1,
        tipo: "CLIENTE",
      },
    },
    fechaBaja: null,
  },
];

const ClientesBusqueda = ({ filter, actualizarFiltro }) => {
  const [filtro, setFiltro] = useState(filter.valor);
  const [selector, setSelector] = useState(filter.selector);
  const [path, setPath] = useState("");
  const [clientes, setListaCliente] = useState([]);

  let listaClientes = [];

  const sitio = "localhost";
  const puerto = "3000";
  const clienteUrl = "api/cliente";

  const getClientesData = async () => {
    /*   axios({
                        url: path+filtro,
                        method: "GET",
                        //data: clientes
                      })
                        .then((resultado) => {
                          const nuevaLista = [...listaClientes, resultado.data];
                        debugger;
                          console.log(nuevaLista);
                          setListaCliente(nuevaLista);
                          console.log("clientes: " + prueba);

                          return nuevaLista;
                        })
                        .catch((error) => {
                          console.error(error);
                        });*/
    try {
      const data = await axios.get(path + filtro);
      setListaCliente(data.data);
    } catch (e) {
      console.log(e);
    }
    console.log(clientes);
  };

  const actualizarFilt = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    console.log("nuevo valor filtro " + nuevoValor);
    setFiltro(nuevoValor);
  };

  useEffect(() => {
    getClientesData();
  }, []);

  const actualizarSelector = (evt) => {
    evt.preventDefault();
    const nuevoValor = evt.target.value;
    setSelector(nuevoValor);
    const ruta="http://127.0.0.1:8081/cliente/";
    switch (nuevoValor) {
      case "Cuit": {
        setPath(ruta+"obtenerCliente/");
        break;
      }
      case "ID": {
        setPath(ruta);
        break;
      }
      case "RazonSocial": {
        setPath(
          ruta+"obtenerCliente?razonSocial="
        );
        break;
      }
      case "Todos": {
        setPath(ruta);
      }
    }
  };

  return (
    <section>
      <ul class="form-register">
        <h4>Búsqueda de clientes</h4>

        <li className="controls2">
          <select
            class="select"
            name="Filtro"
            value={selector}
            onChange={actualizarSelector}
          >
            <option value="Cuit">Cuit</option>
            <option value="ID" selected>
              ID
            </option>
            <option value="RazonSocial" selected>
              Razón Social
            </option>
            <option value="Todos" selected>
              Mostrar todos
            </option>
          </select>
          <div >
            {/* Cuando necesite disponer elementos, encerrar entre divs */}
            <input
              className="newInput"
              name="value filter"
              value={filtro}
              placeholder="Ingrese valor"
              onChange={actualizarFilt}
            />
          </div>
          <button className="newBoton" type="botons" onClick={getClientesData}>
          Buscar
        </button>
        </li>

        <Table id="users">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Cuit</Th>
              <Th>mail</Th>
              <Th>Razón Social</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => {
                return (
                  <Tr keykey={cliente.id}>
                    <Td>{cliente.id}</Td>
                    <Td>{cliente.cuit}</Td>
                    <Td>{cliente.mail}</Td>
                    <Td>{cliente.razonSocial}</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr keykey={clientes.id}>
                <Td>{clientes.id}</Td>
                <Td>{clientes.cuit}</Td>
                <Td>{clientes.mail}</Td>
                <Td>{clientes.razonSocial}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </ul>
    </section>
  );
};

export default ClientesBusqueda;