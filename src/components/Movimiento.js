import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions

} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from '../helpers'
import IconoIngreso from '../img/icono-ingreso.png'
import IconoGasto from '../img/icono-gasto.png'

const diccionarioIconos = {
    ingreso: IconoIngreso,
    gasto: IconoGasto
}

const Movimiento = ({ movimiento, setMovimientoEditar, eliminarMovimiento }) => {
    const { tipoMovimiento, nombre, cantidad, id, fecha } = movimiento

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setMovimientoEditar(movimiento)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => eliminarMovimiento(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >

                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={diccionarioIconos[tipoMovimiento]}
                            alt="Icono Movimiento"
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{tipoMovimiento}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Movimiento