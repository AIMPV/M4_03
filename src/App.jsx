import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { BaseColaboradores } from './base';
import Listado from './components/Listado'
import Formulario from "./components/Formulario";
import Alerta from "./components/Alert";
import Buscador from './components/Buscador';

import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);

  const [alert, setAlert] = useState({
    error: "",
    msg: "",
    color: "",
  });

  const [search, setSearch] = useState("");

  const handleSubmit = (nuevoColaborador) => {
    const colaboradorAgregado = { ...nuevoColaborador, id: Date.now() };
    setColaboradores([...colaboradores, colaboradorAgregado]);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedColaboradores = colaboradores.filter(colaborador => colaborador.id !== id);
    setColaboradores(updatedColaboradores);
  };
  
  const filteredData = colaboradores.filter((colaborador) => { 
    if (
      colaborador.nombre.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.correo.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.edad.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.cargo.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.telefono.toLowerCase().includes(search.toLowerCase()) 
    ) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Container fluid className='my-4'>
        <Card className='overflow-hidden shadow'>
          <div className='fs-3 border-bottom p-3 bg-light'>Lista de colaboradores</div>
          <div className='d-flex flex-column p-3'>
            <Row>
              <Col className='mb-3' sm={12} lg={4}>
                <Buscador search={search} onChange={handleChange} />
              </Col>
            </Row>
            <Row>
              <Col className='mb-5 bm-xl-4' sm={12} xl={9}>
                <Listado colaborador={filteredData} onDelete={handleDelete} />
              </Col>
              <Col sm={12} xl={3}>
                <Card className='border-0 bg-light shadow-sm'>
                  <Card.Body>
                    <Card.Title>
                      Agregar colaborador
                    </Card.Title>
                    <Card.Text>
                      <Formulario onSubmit={handleSubmit} setAlert={setAlert} />
                      {alert.msg && <Alerta color={alert.color}>{alert.msg}</Alerta>}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      </Container>
    </>
  )
}

export default App
