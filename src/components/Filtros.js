

const Filtros = ({filtro, setFiltro}) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Movimientos</label>
                    <select
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                    >
                        <option value="" >-- Todos los Movimientos --</option>
                        <option value="ingreso" >Ingreso</option>
                        <option value="gasto" >Gasto</option>
                    </select>
                </div>
            </form>

        </div>
    )
}

export default Filtros