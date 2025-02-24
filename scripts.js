/*----- variables -----*/
const video = document.getElementById('video');
const titulo_video = document.getElementById('titulo');
const descripcion_texto = document.getElementById('descripcion-texto');
const fecha = document.getElementById('fecha');
const duracion = document.getElementById('duracion');
const boton_descargar = document.getElementById('descargar');
const opciones_de_descarga = document.getElementById('opciones-descarga');


/*----- Fuentes y diccionarios -----*/
const fuentes_Twitter = {
    "delirius-twitter-v2": "https://delirius-apiofc.vercel.app/download/twitterv2?url=",
    "delirius-twitter-dl": "https://delirius-apiofc.vercel.app/download/twitterdl?url=",
    "siputzx-twitter": "https://api.siputzx.my.id/api/d/twitter?url=",
    "agatz-twitter": "https://api.agatz.xyz/api/twitter?url=",
    "vapis-twitter": "https://vapis.my.id/api/twitter?url="
};

const fuentes_Pinterest = {
    "delirius-pinterest-dl": "https://delirius-apiofc.vercel.app/download/pinterestdl?url=",
    "siputzx-pinterest": "https://api.siputzx.my.id/api/d/pinterest?url=",
    "agatz-pinterest": "https://api.agatz.xyz/api/pinterest?url="
};

const fuentes_Facebook = {
    "delirius-facebook": "https://delirius-apiofc.vercel.app/download/facebook?url=",
    "siputzx-facebook": "https://api.siputzx.my.id/api/d/facebook?url=",
    "apibotwa-facebook": "https://restapi.apibotwa.biz.id/api/fbdl?url=",
    "agatz-facebook": "https://api.agatz.xyz/api/facebook?url=",
    "vapis-facebook": "https://vapis.my.id/api/fbdl?url="
};

const fuentes_Threads = {
    "delirius-threads": "https://delirius-apiofc.vercel.app/download/threads?url=",
    "agatz-threads": "https://api.agatz.xyz/api/threads?url=",
    "vapis-threads": "https://vapis.my.id/api/threads?url="
};

const fuentes_Instagram = {
    "delirius-instagram": "https://delirius-apiofc.vercel.app/download/instagram?url=",
    "delirius-igv2": "https://delirius-apiofc.vercel.app/download/igv2?url=",
    "siputzx-instagram": "https://api.siputzx.my.id/api/d/igdl?url=",
    "apibotwa-instagram": "https://restapi.apibotwa.biz.id/api/igdl?url=",
    "agatz-instagram": "https://api.agatz.xyz/api/instagram?url=",
    "vapis-igdl": "https://vapis.my.id/api/igdl?url=",
    "vapis-igdlv2": "https://vapis.my.id/api/igdlv2?url=",
    "itzpire-instagram": "https://itzpire.com/download/instagram?url="
};

const fuentes_TikTok = {
    "delirius-tiktok": "https://delirius-apiofc.vercel.app/download/tiktok?url=",
    "siputzx-tiktok": "https://api.siputzx.my.id/api/tiktok?url=",
    "apibotwa-tiktok": "https://restapi.apibotwa.biz.id/api/tiktok?url=",
    "agatz-tiktok": "https://api.agatz.xyz/api/tiktok?url=",
    "vapis-ttdl": "https://vapis.my.id/api/ttdl?url=",
    "vapis-ttdlv2": "https://vapis.my.id/api/ttdlv2?url="
};

/*----- Funciones -----*/
async function hacer_request(bases_url, url_final) {
    for (const [titulo, base_url] of Object.entries(bases_url)) {
        const url_completa = base_url + url_final;
        console.log(`Realizando solicitud a ${titulo} y ${base_url}`);
        try {
            const respuesta = await fetch(url_completa);
            if (!respuesta.ok) {
                console.error(`Error en la solicitud para ${titulo} y ${url_completa}:`, `Código ${respuesta.status}, Respuesta: ${respuesta.statusText}`);
                continue;
            } 
            const datos = await respuesta.json();
            console.log(`Descarga exitosa para ${titulo} y ${url_completa}:`);

            return { titulo, datos }; 
        } catch (error) {
            console.error(`Error en la solicitud para ${titulo} y ${url_completa}:`, error.message);
            continue;
        }
    }
    throw new Error("No se pudo realizar la descarga en ninguna fuente");
}


/*------- Twitter -------*/
async function descargar_twitter(url, opciones) {
    const [json_base, titulo] = await hacer_request(opciones, url); 
    if ("delirius-twitter-v2" == titulo) {
        const miniatura = json_base.datos.data.media[0].cover
        video.src = json_base.datos.data.media[0].videos[2].url;
        titulo_video.textContent = json_base.datos.data[0].title;
        descripcion_texto.textContent = json_base.datos.data.description;
    }
}



/* ------- descragas generales -------*/
function descargar_videos(opciones) {
    let plataformas = ["Twitter", "Pinterest", "Threads", "Facebook", "Instagram", "TikTok"];
    const opcion = plataformas.find(opcion => opcion === opciones);

    if (opcion) {

    }
}

