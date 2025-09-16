//selectores para el formulario
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector('#citas');

//añadiendo eventListeners para todos los input
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);


/// objeto de cita
const citaObj = {
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

    mostrarCitas(){
        //limpiar el HTML
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
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
            

            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);

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
        const notificacion = new Notificacion({
            texto: 'Ingresa todos los datos',
            tipo: 'error'
        })
        console.log(notificacion)
        return
    }

    citas.agregarCita(citaObj);

    //reiniciar el formulario y el objeto
    formulario.reset();
    reiniciarObjeto();

    
}


function reiniciarObjeto() {
    citaObj.paciente = '';
    citaObj.propietario = '';
    citaObj.email = '';
    citaObj.fecha = '';
    citaObj.sintomas = '';
}





