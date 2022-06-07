import { useState } from "react";
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto, saldoFinal, setSaldoFinal }) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if(!presupuesto|| presupuesto < 0) {//Si no es un número
      setMensaje('No es un presupuesto válido')

      return //detenemos la ejecución del código
    }

    setMensaje('')
    setIsValidPresupuesto(true)
    setSaldoFinal(presupuesto)
  }


  
  return (
    <div className='contenedor-presupuesto contenedor sombra'>

      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>

          <input
            className='nuevo-presupuesto'
            type="number"
            placeholder='Añade tu Presupuesto'
            value={presupuesto}
            onChange={ e => setPresupuesto(Number(e.target.value))} //para que lo que escriba el usuario se en nuevo presupuesto se guarde en la variable setPresupuesto
          />
        </div>

        <input type="submit" value="Añadir" />
      
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

      </form>

    </div>
  )
}

export default NuevoPresupuesto