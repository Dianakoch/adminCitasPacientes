//selectores para el formulario
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]');
const contenedorCitas = document.querySelector('#citas');

//añadiendo eventListeners para todos los input
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);


let editando; //variable para saber si estamos editando o creando una nueva cita


/// objeto de cita
const citaObj = {
    id : generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

class Notificacion {

    constructor({texto, tipo}) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }
    mostrar(){
        //crear el div
        const alerta = document.createElement('div');
        alerta.classList.add('text.center', 'w-full', 'p-3', 'rounded', 'mt-5', 'text-white', 'font-bold', 'alert', 'uppercase', 'font-bold', 'text-sm');

        //eliminar las demas alertas dulicadas
        const alertaPrevia = document.querySelector('.alert');
        //alertaPrevia?.remove(); //si existe la alerta previa la elimina
        if(alertaPrevia) {
            alertaPrevia.remove();
        }


        //tipo
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');
        
        //mensaje
        alerta.textContent = this.texto;

        //agregar al DOM
        formulario.parentElement.insertBefore(alerta, formulario); //insertamos la alerta antes del formulario
        
        //quitar la alerta despues de 3 segundos
        setTimeout(() =>{
            alerta.remove();
         }, 3000);
    }
}

class AdminCitas {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
        this.mostrarCitas();
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrarCitas();
    }

    eliminarCita(id){
        this.cita = this.citas.filter( cita => cita.id !== id); //regresa un nuevo arreglo sin la cita que queremos eliminar
        this.mostrarCitas();
    }

    mostrarCitas(){
        //limpiar el HTML
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        if(this.citas.length === 0){
            contenedorCitas.innerHTML = `<p class="text-center">No hay pacientes</p>`;
            return;
        }
        
        //generar citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5','my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');
        
            const paciente = document.createElement('P');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('P');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
            
            const email = document.createElement('P');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
            
            const fecha = document.createElement('P');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
            
            const sintomas = document.createElement('P');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            sintomas.innerHTML = `<span class="font-bold uppercase">Sintomas: </span> ${cita.sintomas}`;
            
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'btn-editar', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            const clone = structuredClone(cita); //clonamos el objeto para no modificar el original
            btnEditar.onclick = () => cargarEdicion(clone);


            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick = () => this.eliminarCita(cita.id);

            const conBotones = document.createElement('div');
            conBotones.classList.add('flex', 'justify-between', 'mt-10');

            conBotones.appendChild(btnEditar);
            conBotones.appendChild(btnEliminar);

            //agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(conBotones);

            contenedorCitas.appendChild(divCita);
        });
    }
}


function datosCita(e) {
    citaObj[e.target.name] = e.target.value; //tomara el valor del nombre del inputy le agregara el valor que ponga el usuario
}

const citas = new AdminCitas();

function submitCita(e) {
    e.preventDefault(); //sevita que se recargue la pagina

    if(Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Ingresa todos los datos',
            tipo: 'error'
        })
        return
    }

    if(editando){
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
    editando = false;
}


function reiniciarObjeto() {

    Object.assign(citaObj,{
        id : generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });
    
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}


function cargarEdicion(cita) {
    Object.assign(citaObj, cita); //asigna los valores del objeto cita al objeto citaObj

    //llenar los inputs
    pacienteInput.value = citaObj.paciente;
    propietarioInput.value = citaObj.propietario;
    emailInput.value = citaObj.email;
    fechaInput.value = citaObj.fecha;
    sintomasInput.value = citaObj.sintomas;

    editando = true;

    formularioInput.value = 'Guardar Cambios';

}


