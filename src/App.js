import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SucursalAlta from './domain/microSueldos/sucursal/alta-sucursal/SucursalAlta.js'
import MenuSueldos from './domain/microSueldos/menu/MenuSueldos.js'
import MostrarSucursal from './domain/microSueldos/sucursal/mostrar-sucursales/MostrarSucursal.js'
import AltaDatoBancario from './domain/microSueldos/empleado/dato-bancario/alta-dato-bancario/AltaDatoBancario.js'
import MostrarDatoBancario from './domain/microSueldos/empleado/dato-bancario/mostrar-datosBancarios/MostrarDatoBancario.js'
import MostarSueldos from './domain/microSueldos/sueldo/MostrarSueldos.js'
import CodigoDetalle from './domain/microSueldos/sueldo/codigoDetalle/CodigoDetalle.js'
import MenuEmpleado from './domain/MenuEmpleado.js'
import Clientes from './domain/microUsuarios/cliente/Clientes.js'
import ObraRegistro from './domain/microUsuarios/obra/ObraRegistro.js'
import PagoRegistro from './domain/microCuentaCorriente/PagoRegistro.js';
import PedidoEmpleado from './domain/microPedidos/PedidoEmpleado.js';
import Producto from './domain/microProductos/Producto.js';
import Login from './domain/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/empleado/menuSueldo">
          <MenuSueldos></MenuSueldos>
        </Route>
        <Route path="/sucursal/altaSucursal">
          <SucursalAlta></SucursalAlta>
        </Route>
        <Route path="/sucursal/listaSucursales">
          <MostrarSucursal></MostrarSucursal>
        </Route>
        <Route path="/empleado/altaDatoBancario">
          <AltaDatoBancario></AltaDatoBancario>
        </Route>
        <Route path="/empleado/listaDatoBancario">
          <MostrarDatoBancario></MostrarDatoBancario>
        </Route>
        <Route path="/sueldo/reciboSueldos">
          <MostarSueldos></MostarSueldos>
        </Route>
        <Route path="/sueldo/codigoDetalle">
          <CodigoDetalle></CodigoDetalle>
        </Route>
        <Route path="/empleado/clientes">
          <Clientes></Clientes>
        </Route>
        <Route path="/empleado/obra">
          <ObraRegistro></ObraRegistro>
        </Route>
        <Route path="/cuentaCorriente/pagoRegistro">
          <PagoRegistro></PagoRegistro>
        </Route>
        <Route path="/pedidos/registrarPedido">
        <PedidoEmpleado></PedidoEmpleado>
        </Route>
        <Route path="/productos/gestionProducto">
        <Producto></Producto>
        </Route>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route exact path="/empleado">
          <MenuEmpleado></MenuEmpleado>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
