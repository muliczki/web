
export default class Anuncio{
    constructor(id,titulo, transaccion, descripcion, precio, num_wc, num_estacionamiento,num_dormitorio )
    {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.num_wc = num_wc;
        this.num_estacionamiento = num_estacionamiento;
        this.num_dormitorio = num_dormitorio;
    }

}