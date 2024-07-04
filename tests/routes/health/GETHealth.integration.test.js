import request from 'supertest'
import { server, app } from '../../../src/index'
import historical_data from "../../../dataset/historical_data.json";


const events = historical_data.result.events;


// Filtrar y ordenar los eventos con date <= 0
const acEvents = events
.filter(event => parseInt(event.date, 10) <= 0)
.sort((a, b) => parseInt(a.date, 10) - parseInt(b.date, 10));

// Filtrar y ordenar los eventos con date > 0
const dcEvents = events
.filter(event => parseInt(event.date, 10) > 0)
.sort((a, b) => parseInt(a.date, 10) - parseInt(b.date, 10));


/*
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
})



describe ('GET /api/history/:ocurrence', () => {
    afterAll(() => {
        server.close()
    });

    /*
    Dada una consulta al servicio,  
    Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2 e igual a 'ac', con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :ocurrence
    Entonces: debe devolver un status 200 y en el body, un arreglo con los eventos históricos que hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde 'date' siempre es <= 0
    */

    // describe('ocurrence = ac', () =>{
    //     test('debería responder con un código 200 y un arreglo con los eventos AC', async () => {
    //         const response = await request(app.callback()).get('/api/history/ac')
    //         expect(response.status).toBe(200)
    //         // console.log(response.body)
    
    //         // console.log(acEvents)
    
    //         expect(response.body).toEqual(acEvents)
    //     });
    // })


    // /*
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2 e igual a 'dc', con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :ocurrence
    // Entonces: debe devolver un status 200 y en el body, un arreglo con los eventos históricos que hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde 'date' siempre es > 0
    // */

    // describe('ocurrence = dc', () =>{
    //     test('debería responder con un código 200 y un arreglo con los eventos DC', async () => {
    //         const response = await request(app.callback()).get('/api/history/dc')
    //         expect(response.status).toBe(200)
    //         // console.log(response.body)
    
    //         // console.log(dcEvents)
    
    //         expect(response.body).toEqual(dcEvents)
    //     });
    // })


    /*
    Dado: Una consulta al servicio
    Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2, con caracteres alfanuméricos o solo númericos, independiente del case de :country
    Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
        {
            "message": "Solo se aceptan caracteres no numéricos"
        }
    */

    describe('ocurrence es alfanumérico y de largo 2', () =>{
        test('debería responder con un código 200 y un arreglo con los eventos DC', async () => {
            const response = await request(app.callback()).get('/api/history/4c')
            expect(response.status).toBe(400)
            // console.log(response.body)
    
            // console.log(dcEvents)
    
            expect(response.body).toEqual({message: "Solo se aceptan caracteres no numéricos"})
        });
    })

    
})