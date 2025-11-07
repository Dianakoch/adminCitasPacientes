import { generarId } from "./funciones.js";


let editando = {
    value: false
}; //variable para saber si estamos editando o creando una nueva cita

/// objeto de cita
const citaObj = {
    id : generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

export{ editando, citaObj };
