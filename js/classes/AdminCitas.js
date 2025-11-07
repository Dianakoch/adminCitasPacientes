
import { contenedorCitas } from '../selectores.js';

export default class AdminCitas {
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
