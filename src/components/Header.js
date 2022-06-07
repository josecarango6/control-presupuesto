import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
  presupuesto, setPresupuesto,
  isValidPresupuesto, setIsValidPresupuesto,
  transacciones,  
  saldoFinal, setSaldoFinal
}) => {
  return (
    <header>
      <h1>Planificador de presupuesto</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          transacciones={transacciones}
          presupuesto={presupuesto}               
          saldoFinal={saldoFinal}
          setSaldoFinal={setSaldoFinal}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          saldoFinal={saldoFinal} 
          setSaldoFinal={setSaldoFinal}
        />
      )}

    </header>
  )
}

export default Header