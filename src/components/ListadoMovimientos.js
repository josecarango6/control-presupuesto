
import Movimiento from './Movimiento'

const ListadoMovimientos = ({ transacciones, setMovimientoEditar, eliminarMovimiento, filtro, movimientosFiltrados }) => {
  return (
    <div className="listado-movimientos contenedor">
      {
        filtro ? (//si hay un filtro definido iteramos sombre el arreglo de movimientos filtrados
          <>
            <h2>{movimientosFiltrados.length ? 'Movimientos ' + movimientosFiltrados.length : 'No hay movimientos de este tipo'}</h2>
            {movimientosFiltrados.map(movimiento => (
              <Movimiento
                key={movimiento.id}
                movimiento={movimiento}
                setMovimientoEditar={setMovimientoEditar}
                eliminarMovimiento={eliminarMovimiento}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{transacciones.length ? 'Movimientos '+ transacciones.length : 'No hay Movimientos aún'}</h2>
            {transacciones.map(movimiento => (
              <Movimiento
                key={movimiento.id}
                movimiento={movimiento}
                setMovimientoEditar={setMovimientoEditar}
                eliminarMovimiento={eliminarMovimiento}
              />
            ))}
          </>
        )
      }

    </div>
  )
}

export default ListadoMovimientos