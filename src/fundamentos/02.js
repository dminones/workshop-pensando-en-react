// Modificar este código definiendo 3 componentes:
//
// 1. El componente `Artist` que encierra todo el div de clase "artist". Recibe
//    una prop `artist` que es el objeto definido dentro de `App`.
// 2. El componente `ArtistImage` que engloba el div con clase "artistImage". Recibe
//    como props el tamaño de la imagen (un número definido dentro de `App`) y la
//    url de la imagen del artista.
// 3. El componente `SpotifyLogo` que encierra el elemento imagen con el logo de
//    Spotify. Recibe como prop el tamaño del logo (un número definido dentro de
//    `App`).
//
// Al menos uno de los componentes debe ser de tipo clase y al menos uno debe ser
// de tipo función.

import React from 'react';

// El siguiente export fue agregado para poder correr este ejercicio dentro del proyecto general.
export default function Ejercicio2() {
  const artist = {
    name: 'The Beatles',
    followers: 3443835,
    genres: 'british invasion, classic rock, merseybeat, protopunk, psychedelic rock, rock',
    imageUrl: 'https://i.scdn.co/image/197cff807611777427c93258f0a1ccdf6b013b09',
    spotifyUrl: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2"'
  };

  const logoSize = 20;
  const imageSize = 200;

  class SpotifyLogo extends React.Component {
      render () {
        return React.createElement('img', {
              src: this.props.logoImage,
              width: logoSize,
              height: logoSize,
              style: { verticalAlign: 'middle' }
            })
      }
  }

  class ArtistImage extends React.Component {
    render() {
      return React.createElement('div', {
          className: 'artistImage',
          style: {
            width: this.props.imageSize,
            height: this.props.imageSize,
            borderRadius: this.props.imageSize,
            backgroundImage: 'url("' + this.props.artistImage + '")',
          }
        })
    }
  }

  class Artist extends React.Component {

    render() {
        return React.createElement('div', { className: 'artist' },
        React.createElement(ArtistImage, {imageSize: imageSize, artistImage:artist.imageUrl}),
        React.createElement('span', { className: 'artistName'},
          artist.name
        ),
        React.createElement('span', null,
          artist.followers,
          ' Seguidores · ',
          artist.genres,
          ' · ',
          React.createElement('a', {
            href: artist.spotifyUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            title: 'Abrir en Spotify'
          },
            React.createElement(SpotifyLogo, {logoImage:"/spotify.svg"})
          )
        )
      )      
    }

  }

  return (
    React.createElement(Artist, {artist:artist})
  );
}