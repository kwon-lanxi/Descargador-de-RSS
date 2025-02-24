const fetch = require('node-fetch');
const fs = require('fs');

/*----- Fuentes y diccionarios -----*/
const fuentes_Twitter = [
    "https://delirius-apiofc.vercel.app/download/twitterv2?url=",
    "https://delirius-apiofc.vercel.app/download/twitterdl?url=",
    "https://api.siputzx.my.id/api/d/twitter?url=",
    "https://api.agatz.xyz/api/twitter?url=",
    "https://vapis.my.id/api/twitter?url=",
];

const fuentes_Pinterest = [
    "https://delirius-apiofc.vercel.app/download/pinterestdl?url=",
    "https://api.siputzx.my.id/api/d/pinterest?url=",
    "https://api.agatz.xyz/api/pinterest?url=",
];

const fuentes_facebook = [
    "https://delirius-apiofc.vercel.app/download/facebook?url=",
    "https://api.siputzx.my.id/api/d/facebook?url=",
    "https://restapi.apibotwa.biz.id/api/fbdl?url=",
    "https://api.agatz.xyz/api/facebook?url=",
    "https://vapis.my.id/api/fbdl?url=",
];

const fuentes_threads = [
    "https://delirius-apiofc.vercel.app/download/threads?url=",
    "https://api.agatz.xyz/api/threads?url=",
    "https://vapis.my.id/api/threads?url=",
];

const fuentes_Instagram = [
    "https://delirius-apiofc.vercel.app/download/instagram?url=",
    "https://delirius-apiofc.vercel.app/download/igv2?url=",
    "https://api.siputzx.my.id/api/d/igdl?url=",
    "https://restapi.apibotwa.biz.id/api/igdl?url=",
    "https://api.agatz.xyz/api/instagram?url=",
    "https://vapis.my.id/api/igdl?url=",
    "https://vapis.my.id/api/igdlv2?url=",
    "https://itzpire.com/download/instagram?url=",
];

const fuentes_TikTok = [
    "https://delirius-apiofc.vercel.app/download/tiktok?url=",
    "https://api.siputzx.my.id/api/tiktok?url=",
    "https://restapi.apibotwa.biz.id/api/tiktok?url=",
    "https://api.agatz.xyz/api/tiktok?url=",
    "https://vapis.my.id/api/ttdl?url=",
    "https://vapis.my.id/api/ttdlv2?url=",
];

/**
 * Función para descargar contenido de todas las fuentes de una plataforma y guardar los JSONs
 * @param {string} plataforma - Nombre de la plataforma (e.g., 'twitter', 'instagram')
 * @param {string} urlContenido - URL del contenido a descargar
 * @returns {Promise<object>} - Objeto con los resultados de todas las fuentes
 */
async function descargarContenido(plataforma, urlContenido) {
    let fuentes;
    switch (plataforma.toLowerCase()) {
        case 'twitter':
            fuentes = fuentes_Twitter;
            break;
        case 'pinterest':
            fuentes = fuentes_Pinterest;
            break;
        case 'facebook':
            fuentes = fuentes_facebook;
            break;
        case 'threads':
            fuentes = fuentes_threads;
            break;
        case 'instagram':
            fuentes = fuentes_Instagram;
            break;
        case 'tiktok':
            fuentes = fuentes_TikTok;
            break;
        default:
            throw new Error('Plataforma no soportada');
    }

    const resultados = {};

    // Iterar sobre todas las fuentes
    for (const fuente of fuentes) {
        try {
            const response = await fetch(fuente + encodeURIComponent(urlContenido));
            if (response.ok) {
                const json = await response.json();
                resultados[fuente] = {
                    exito: true,
                    datos: json
                };
                console.log(`Éxito con ${fuente} para ${urlContenido}`);
            } else {
                resultados[fuente] = {
                    exito: false,
                    error: `Código de estado ${response.status}`
                };
                console.error(`Error con ${fuente} para ${urlContenido}: ${response.status}`);
            }
        } catch (error) {
            resultados[fuente] = {
                exito: false,
                error: error.message
            };
            console.error(`Error al conectar con ${fuente} para ${urlContenido}: ${error.message}`);
        }
    }

    // Guardar todos los resultados en un archivo JSON
    const nombreArchivo = `${plataforma}_${urlContenido.split('/').pop().replace(/[^a-zA-Z0-9]/g, '_')}_resultados_${Date.now()}.json`;
    fs.writeFileSync(nombreArchivo, JSON.stringify(resultados, null, 2));
    console.log(`Resultados guardados en ${nombreArchivo}`);

    return resultados;
}

// URLs proporcionadas por el usuario
const urlsPorPlataforma = {
    tiktok: 'https://www.tiktok.com/@junsitonub/video/7465245239595355398?is_from_webapp=1&sender_device=pc',
    twitter: 'https://x.com/JxshualuvEr/status/1892949723381727538',
    threads: [
        'https://www.threads.net/@17daily.svt/post/DGVEmTLIlj1?xmt=AQGzwkHiINO28ZMYxDXQ9RbD4l2nopi_NNfe7rUdDyef5A',
        'https://www.threads.net/@17daily.svt/post/DGU4ahdourW?xmt=AQGzm9-L7_MtXjOji5PIMrzQQJDfm5xfZ2TWBy9vcDagWQ'
    ],
    pinterest: [
        'https://pin.it/7dE5eV94Y',
        'https://pin.it/gWooNt5WA'
    ],
    instagram: [
        'https://www.instagram.com/p/DF8UOTQRG1n/?igsh=dWx1cXl3NWFscjc0',
        'https://www.instagram.com/reel/DGNXRiEt7H4/?igsh=M2lta242eW1qcGht'
    ]
};

// Procesar todas las URLs
async function procesarTodasLasUrls() {
    for (const [plataforma, urls] of Object.entries(urlsPorPlataforma)) {
        if (Array.isArray(urls)) {
            for (const url of urls) {
                await descargarContenido(plataforma, url);
            }
        } else {
            await descargarContenido(plataforma, urls);
        }
    }
    console.log('Procesamiento completado para todas las URLs.');
}

// Ejecutar el procesamiento
procesarTodasLasUrls()
    .then(() => console.log('Todas las operaciones finalizaron con éxito.'))
    .catch(error => console.error('Error general:', error));