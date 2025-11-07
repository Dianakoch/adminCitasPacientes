import {formulario} from '../selectores.js';
export default class Notificacion {

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