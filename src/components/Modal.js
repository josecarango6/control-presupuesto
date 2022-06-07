import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarMovimiento, movimientoEditar, setMovimientoEditar, saldoFinal, setSaldoFinal }) => {

  const [mensaje, setMensaje] = useState('')
  const [tipoMovimiento, setTipoMovimiento] = useState('') 
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')


  useEffect(() => {
    if (Object.keys(movimientoEditar).length > 0) {
      setTipoMovimiento(movimientoEditar.tipoMovimiento)
      setNombre(movimientoEditar.nombre)
      setCantidad(movimientoEditar.cantidad)
      setId(movimientoEditar.id)
      setFecha(movimientoEditar.fecha)
    }
  }, [movimientoEditar, setCantidad, setTipoMovimiento])

  const ocultarModal = () => {//función para cerrar el modal    
    setAnimarModal(false)//y animar modal lo pasamos a false para que al volver a abrir el modal me muestre la anumación
    setMovimientoEditar({})
    setTimeout(() => {
      setModal(false)//ocultamos el modal

    }, 500);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if ([tipoMovimiento, nombre, cantidad].includes('')) {//el include valida que todos los elementos esten completos
      setMensaje('Todos los campos son obligatorios')
      setTimeout(() => {
        setMensaje('')
      }, 3000);

      return;//para que no ejecute las siguientes lineas
    }
    if (cantidad > saldoFinal && tipoMovimiento === 'gasto') {
      Swal.fire({
        title: `<h3>¡No cuenta con saldo suficiente para realizar este movimiento! Su saldo disponible es de: ${saldoFinal}</h3>`, 
            
        width: 600,         
        icon: 'warning',
        confirmButtonText: '<h3 style="font-size:15px">Aceptar</h3>'
      })
      return;
    }    

    if (cantidad <= 0) {
      Swal.fire({
        title: '<h3>La cantidad no puede ser menor o igual a cero</h3>',       
        width: 600,         
        icon: 'error',
        confirmButtonText: '<h3 style="font-size:15px">Aceptar</h3>'
      })
      return;
    } 
    Swal.fire({
      title: `<h2>El ${tipoMovimiento} "${nombre}" fue creado correctamente!</h2> `,       
      width: 600,         
      icon: 'success',
      confirmButtonText: '<h3 style="font-size:15px">Aceptar</h3>'
    })
    guardarMovimiento({ tipoMovimiento, nombre, cantidad, id, fecha })
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarBtn}
          alt="cerrar modal"
          onClick={ocultarModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
      >
        <legend>{movimientoEditar.nombre ? 'Editar Movimiento' : 'Nuevo Movimiento'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        {/* cuando mensaje tenga algo cargamos el componente de mensaje */}

        <div className='campo'>
          <label htmlFor="tipoMovimiento">Tipo de Movimiento</label>

          <select
            id="tipoMovimiento"
            value={tipoMovimiento}
            onChange={e => setTipoMovimiento(e.target.value)}
          >
            <option value="" >-- Seleccione --</option>
            <option value="ingreso" >Ingreso</option>
            <option value="gasto" >Gasto</option>
          </select>
        </div>

        <div className='campo'>
          <label htmlFor="nombre">Nombre</label>

          <input
            id="nombre"
            type="text"
            placeholder='Añade el Nombre del Movimiento'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>

          <input
            id="cantidad"
            type="number"
            placeholder='Añade la Cantidad del Movimiento ej. 300'
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>

        <input
          type="submit"
          value={movimientoEditar.nombre ? 'Guardar Cambios' : 'Añadir Movimiento'}
        />

      </form>

    </div>
  )
}

export default Modal