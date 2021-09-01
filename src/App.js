import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SucursalAlta from './domain/sucursal/alta-sucursal/SucursalAlta.js'
import MenuSueldos from './domain/menu/MenuSueldos.js'
import MostrarSucursal from './domain/sucursal/mostrar-sucursales/MostrarSucursal.js'
import AltaDatoBancario from './domain/empleado/dato-bancario/alta-dato-bancario/AltaDatoBancario.js'
import MostrarDatoBancario from './domain/empleado/dato-bancario/mostrar-datosBancarios/MostrarDatoBancario.js'
import MostarSueldos from './domain/sueldo/MostrarSueldos'
import CodigoDetalle from './domain/sueldo/codigoDetalle/CodigoDetalle'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
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
      </Switch>
    </Router>
  );
}

export default App;
