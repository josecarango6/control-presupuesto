import { useState, useEffect } from 'react'
import imagenPresupuesto from '../img/presupuesto.jpg' 


const ControlPresupuesto = ({ transacciones, presupuesto, saldoFinal, setSaldoFinal }) => {

    const [gastado, setGastado] = useState(0)


    useEffect(() => {

        const totalIngresos = transacciones.reduce((total, ingreso) =>
        ingreso.tipoMovimiento === 'ingreso' ? ingreso.cantidad + total 
            : total - ingreso.cantidad , 0)
        const totalSadoFinal = presupuesto + totalIngresos;

        const totalGastado = transacciones.reduce((total, gasto) =>
        gasto.tipoMovimiento === 'gasto' ? total + gasto.cantidad   
        : total, 0)

        setSaldoFinal(totalSadoFinal)
        setGastado(totalGastado)

    }, [transacciones, presupuesto, setSaldoFinal, saldoFinal]);

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        })
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <img width="100%" src={imagenPresupuesto} alt="imagen-presupuesto" />
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Saldo Inicial: </span>{formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Saldo Final: </span>{formatearCantidad(saldoFinal)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto