import { citaObj, editando } from "./variables";
import Notificacion from "./classes/Notificacion";
import AdminCitas from "./classes/AdminCitas";
import { formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from "./selectores";

const citas = new AdminCitas();

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value; //tomara el valor del nombre del inputy le agregara el valor que ponga el usuario
}


export function submitCita(e) {
    e.preventDefault(); //sevita que se recargue la pagina

    if(Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Ingresa todos los datos',
            tipo: 'error'
        })
        return
    }

    if(editando.value){
        citas.editarCita({...citaObj});
        new Notificacion({
            texto: 'Editado correctamente',
            tipo: 'success'
        });
    }else{
         citas.agregarCita({...citaObj});
         new Notificacion({
            texto: 'Paciente agregado correctamente',
            tipo: 'success'
        })
    }
    //reiniciar el formulario y el objeto
    formulario.reset();
    reiniciarObjeto();
    formularioInput.value = 'Registrar Paciente';
    editando.value = false;
}


export function reiniciarObjeto() {

    Object.assign(citaObj,{
        id : generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });
    
}

export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}


export function cargarEdicion(cita) {
    Object.assign(citaObj, cita); //asigna los valores del objeto cita al objeto citaObj

    //llenar los inputs
    pacienteInput.value = citaObj.paciente;
    propietarioInput.value = citaObj.propietario;
    emailInput.value = citaObj.email;
    fechaInput.value = citaObj.fecha;
    sintomasInput.value = citaObj.sintomas;

    editando.value = true;

    formularioInput.value = 'Guardar Cambios';

}



