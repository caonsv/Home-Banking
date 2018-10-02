// Aclaración, los mensajes (para no usar alerts) usan una funcion incompleta y muy simple, en un formato flotante.
// Detalle: los mensajes pocas veces se repiten, por eso pareciera mucho texto dentro del codigo, por diversion.
// Saludos!

//Declaración de variables
let nombreUsuario = 'Santiago D. Vottero',
    saldoCuenta = 10000,
    saldoPrevio,
    limiteExtraccion = 3000,

//LISTA PAGAR SERVICIO
    costoServicios = [{
        name: 'Agua',
        coste: 350
    },
    {
        name: 'Teléfono',
        coste: 425
    }, {
        name: 'Luz',
        coste: 210
    }, {
        name: 'Internet',
        coste: 570
    }, {
        name: 'Gas',
        coste: 360
    }], // o mas...


//TRANFERENCIA CUENTA AMIGO
    cuentasAmigo = [{
        id: '123',
        name: 'Roger Waters'
    },
    {
        id: '456',
        name: 'Eduardo Galeano'
    },
    {
        id: '789',
        name: 'Mr. P-Mosh'
    }] // o mas...



//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla()
    actualizarSaldoEnPantalla()
    actualizarLimiteEnPantalla()
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    let limite = Number(window.prompt("Ingrese el nuevo límite de extracción", ""));
    if (paramOk(limite)) {
        mensajeError(true, `<b>El límite de extracción se modifico exitosamente.</b><br/><br/>
        Su nuevo límite es de <b> <big>$${limite}</big></b>`)
        limiteExtraccion = limite
        actualizarLimiteEnPantalla()
    } else {
        mensajeError(false, `<b>El monto ingresado no es válido.</b> <br/>
                             <small>Por favor intentelo nuevamente.</small>`)
    }
}

function extraerDinero() {
    let extraccion = Number(window.prompt("Ingrese el monto que desea extraér de su cuenta", ""));
    if (paramOk(extraccion)) {
        if (extraccion % 100 == 0) {
            if (extraccion <= limiteExtraccion) {
                if (extraccion <= saldoCuenta) {
                    saldoPrevio = saldoCuenta
                    saldoCuenta -= extraccion // otra función?? o.O
                    actualizarSaldoEnPantalla()
                    mensajeError(true, `<b>Extracción de $${extraccion} realizado exitosamente.</b> <br/> <br/>
                            <small>
                                Saldo anterior: $${saldoPrevio}<br/>
                                Saldo actual: $${saldoCuenta}
                            </small>`)
                } else {
                    mensajeError(false, `<b>El monto seleccionado supera su saldo disponible (Cada vez mas bajo...)</b><br/>
                                     <small>Por favor intentelo nuevamente.</small>`)
                }
            } else {
                mensajeError(false, `<b>El monto ingresado supera su límite de extracción.</b>
                          <br/><small>Límite establecido: $${limiteExtraccion}<br/><br/>
                          Recorda que podés modificarlo desde el menú.</small>`)
            }
        } else {
            mensajeError(false, `<b>Lo sentimos, solo puede extraer múltiplos de 100.</b><br/>
                                 <small>(ej: $1000, $2500 o $700)<br/><br/>
                                 Por favor intentelo nuevamente... con múltiplos de 100 por favor.</small>`)
        }
    } else {
        mensajeError(false, `<b>Dedaso! El monto ingresado no es válido.</b> <br/>
                             <small>Por favor intentelo nuevamente.</small>`)
    }
}

function depositarDinero() {
    let deposito = Number(window.prompt("Ingrese el monto que desea depositar de su cuenta", ""));
    if (paramOk(deposito)) {
        saldoPrevio = saldoCuenta
        saldoCuenta += deposito
        actualizarSaldoEnPantalla()
        mensajeError(true, `<b>Depósito de $${deposito} realizado exitosamente.</b> <br/> <br/>
                            <small>
                                Saldo anterior: $${saldoPrevio}<br/>
                                Saldo actual: $${saldoCuenta}
                            </small>`)
    } else {
        mensajeError(false, `<b>El monto ingresado no es válido.</b> <br/>
                             <small>Por favor intentelo nuevamente.</small>`)
    }
}

function pagarServicio() {
    let total = 0
    let data = () => {
        let serv = ''
        for (i = 0; i < costoServicios.length; i++) {
            serv += `${i + 1} - ${costoServicios[i].name} ($${costoServicios[i].coste})
    `
            total += costoServicios[i].coste
        }
        serv += `${i + 1} - Pagar todo ($${total})`
        return serv
    }

    let servicio = Number(window.prompt(`Ingrese el número correspondiente al servicio que desea abonar:

    ${data()}
    `, ""));

    if (paramOk(servicio) && servicio <= costoServicios.length + 1) {
        switch (servicio) {
            case costoServicios.length + 1:
                if (total < saldoCuenta) {
                    saldoCuenta -= total
                    actualizarSaldoEnPantalla()
                    mensajeError(true, `<b>Pago de servicio realizado con éxito!</b><br/><br/>
    
    <small>
        Servicio: <b>Pagar todo</b><br/>
        Costo: <b>$${total}</b><br/><br/>

        Nuevo saldo disponible <b>$${saldoCuenta}</b>
    </small>`)
                } else {
                    mensajeError(false, `<b>El monto seleccionado supera su saldo disponible.</b><br/>`)
                }
                break

            default:
                if (costoServicios[servicio - 1].coste < saldoCuenta) {
                    saldoCuenta -= costoServicios[servicio - 1].coste
                    actualizarSaldoEnPantalla()
                    mensajeError(true, `<b>Pago de servicio realizado con éxito!</b><br/><br/>
    
    <small>
        Servicio: <b>${costoServicios[servicio - 1].name}</b><br/>
        Costo: <b>$${costoServicios[servicio - 1].coste}</b><br/><br/>

        Nuevo saldo disponible <b>$${saldoCuenta}</b>
    </small>`)
                } else {
                    mensajeError(false, `<b>El monto seleccionado supera su saldo disponible.</b><br/>`)
                }
                break
        }
    } else {
        mensajeError(false, `<b>El monto ingresado no es válido.</b> <br/>
                             <small>Escribiste cualquiera... <br/><br/>
                             Por favor intentelo nuevamente.</small>`)
    }
}

function transferirDinero() {
    let transf = Number(window.prompt("Ingrese el monto que desea transferir", ""));

    let cuentasAmigas = (cuenta) => {
        for (i = 0; i < cuentasAmigo.length; i++) {
            if (cuentasAmigo[i].id == cuenta) {
                return cuentasAmigo[i]
            }
        }
        return false
    }

    if (paramOk(transf)) {
        if (transf <= saldoCuenta) {
            let transfCuenta = Number(window.prompt("Ingrese el número de Cuenta de Destino (CD): \n\n Test: 123, 456, 789", ""));
            if (paramOk(transfCuenta)) {
                let cuenta = cuentasAmigas(transfCuenta)
                if (cuenta) {
                    saldoCuenta -= transf
                    mensajeError(true, `<b>Tranferencia exitosa!</b><br/><br/>
    
    <small>
        Monto transferido: <b><big>${transf}</big></b>
            <br/>
        Cuenta destino: <b>${cuenta.id} </b> (${cuenta.name})
            <br/><br/>
        Nuevo saldo disponible <b>$${saldoCuenta}</b>
    </small>`)
                    actualizarSaldoEnPantalla()
                } else {
                    mensajeError(false, `<b>Solo cuentas amigo, amigo!!</b> <br/>`)
                }
            } else {
                mensajeError(false, `<b>Algo no esta bien...</b> <br/>
                                     <small>Por favor intentelo nuevamente.</small>`)
            }
        } else {
            mensajeError(false, `<b>Auch! El monto seleccionado supera su saldo disponible.</b><br/>
                             <small>Espero no hayas prometido ese monto... <br/><br/>Por favor intentelo nuevamente.</small>`)
        }
    } else {
        mensajeError(false, `<b>Mmmmm... El monto ingresado no es válido.</b> <br/>
                             <small>Por favor intentelo nuevamente.</small>`)
    }
}

function iniciarSesion() {

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}


//////////////////////////////////////////////////////////////////////////////
//!isNaN > 0
function paramOk(p) {
    return !isNaN(p) && p > 0 ? true : false
}

//Mensajes flotantes
function mensajeError(style, msj) {
    let a = document.getElementById("alert")
    a.classList.remove('success')
    a.innerHTML = msj
    style && a.classList.add("success")
    a.classList.add("active")

    let _time = setTimeout(function () { a.classList.remove('active', 'success') }, 8000)
    a.onmouseover = () => { clearTimeout(_time) }
    a.onclick = () => { a.classList.remove('active', 'success') }
    a.onmouseleave = () => { _time = setTimeout(function () { a.classList.remove('active', 'success') }, 3000) }
}