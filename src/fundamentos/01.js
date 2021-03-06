// Modificar el siguiente código para que en lugar de escribir contenido del elemento
// con `innerHTML`, lo haga con ReactDOM.render.
//
// Para esto tenes que:
//
// 1. Convertir el HTML dentro del string a llamadas a React.createElement.
//    Recordá que podes usar variables para guardar los elementos de React a medida
//    que los vas convirtiendo.
// 2. Utilizar el resultado en `ReactDOM.render` junto con el `element` pasado como
//    parámetro.

import React from 'react';
import ReactDOM from 'react-dom';

// El siguiente export fue agregado para poder correr este ejercicio dentro del proyecto general.
export default function ejercicio1(element) {
    const artistImage = React.createElement('div',{ className:'artistImage', 
                                                  style: {
                                                    width: '200px',
                                                    height: '200px',
                                                    borderRadius: '200px',
                                                    backgroundImage: 'url(https://i.scdn.co/image/197cff807611777427c93258f0a1ccdf6b013b09)'
                                                  }
                                                })
    const artistName = React.createElement('span', {className: 'artistName'}, "The Beatles")
    const imageLink = React.createElement('img', {  src: "/spotify.svg",
                                                    width: "20",
                                                    heigh: "20",
                                                    style: {verticalAlign: 'middle'}
                                                  })
    const artistDesc = React.createElement('span', null, 
        '3.443.835 Seguidores · british invasion, classic rock, merseybeat, protopunk, psychedelic rock, rock · ',
        React.createElement('a', {
          href: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
          target: "_blank",
          rel: "noopener noreferrer",
          title:"Abrir en Spotify"
        }, 
        imageLink
        )
    )
    const artist = React.createElement('div',{className:'artist'}, 
      artistImage,
      artistName,
      artistDesc
    );

    ReactDOM.render(artist, element);
}