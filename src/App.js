
import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import Filtros from "./components/Filtros"
import ListadoMovimientos from "./components/ListadoMovimientos"
import Modal from "./components/Modal"
import { v4 as uuid } from "uuid"
import IconoNuevoGasto from './img/nuevo-gasto.svg'

const App = () => {

  const [transacciones, setTransacciones] = useState([])

  const [presupuesto, setPresupuesto] = useState(0); //usar el useState en el app porque se utiliza en diferentes componentes
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)//useState para mostrar la pantalla modal
  const [animarModal, setAnimarModal] = useState(false)   

  const [movimientoEditar, setMovimientoEditar] = useState({})

  const [saldoFinal, setSaldoFinal] = useState(0)

  const [filtro, setFiltro] = useState('')
  const [movimientosFiltrados, setMovimientosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(movimientoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }

  }, [movimientoEditar])

  useEffect(() => {
    if(filtro){//si hay algo en el filtro 
      const movimientosFiltrados = transacciones.filter(movimiento => movimiento.tipoMovimiento === filtro);
      setMovimientosFiltrados(movimientosFiltrados)
    }  
    
  }, [filtro, transacciones])
  

  const handleNuevoMovimiento = () => {
    setModal(true)
    setMovimientoEditar({})    
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarMovimiento = movimiento => {
    if (movimiento.id) {
        const movimientosActualizados = transacciones.map(movimientoState => movimientoState.id === 
          movimiento.id ? movimiento : movimientoState)
          setTransacciones(movimientosActualizados);
          setMovimientoEditar({})
    } else {
      movimiento.id = uuid();
      movimiento.fecha = Date.now();
      setTransacciones([...transacciones, movimiento])
    }
    setAnimarModal(false)//y animar modal lo pasamos a false para que al volver a abrir el modal me muestre la anumación
    setTimeout(() => {
      setModal(false)//ocultamos el modal      
    }, 500);    
  }

  const eliminarMovimiento = id => {
    const movimientosActualizados = transacciones.filter(movimiento => movimiento.id !== id);
    setTransacciones(movimientosActualizados)
  }


  //cuando el modal este en true agrege la clase fijar
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        transacciones={transacciones}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}        
        saldoFinal={saldoFinal}
        setSaldoFinal={setSaldoFinal}
      />


      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoMovimientos
              transacciones={transacciones}
              setMovimientoEditar={setMovimientoEditar}
              eliminarMovimiento={eliminarMovimiento}
              filtro={filtro}
              movimientosFiltrados={movimientosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoMovimiento}
            />

          </div>
        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}//se le pasa el animar modal por props para saber cuando cambio
          setAnimarModal={setAnimarModal}
          guardarMovimiento={guardarMovimiento}                    
          movimientoEditar={movimientoEditar}
          setMovimientoEditar={setMovimientoEditar}
          saldoFinal={saldoFinal}       

        />}

    </div>
  )
}

export default App