import React, { Component } from "react";
import { getArtists } from "../data-api";

const showEmpty = false;

class ArtistsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      fetching: true,
      searchText: '',
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.search()
  }

  handleSearchTextChange (searchText) {
    this.setState({searchText})    
    this.search()
  }

  search() {
    this.setState({ fetching: true });

    getArtists(this.state.searchText).then(data => {
      console.log(data);
      this.setState({
        fetching: false,
        artists: data.items,
      })
    });
  }

  render() {
    return (
      <div>
        <SearchInput text={this.state.searchText} onChange={this.handleSearchTextChange} />
        { this.state.fetching ?
          (<Loading />
          ) : (
          <ArtistsList 
            artists={this.state.artists} 
            onSelectArtist={ this.props.onSelectArtist }
            selectedArtists={ this.props.selectedArtists } />
          ) }
      </div>
    )    
  }

}

class SearchInput extends Component {

  constructor () {
    super()
    console.log(this.props)
    this.state = {
      text: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(ev) {
    this.setState({text:ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.onChange(this.state.text)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="searchForm">
        <input  type="text" 
                className="searchInput" 
                autoFocus
                value={this.state.text} 
                onChange={this.handleInputChange} />
        <button type="submit" className="searchButtonLayout searchButton" >
          <svg viewBox="0 0 27 28" xmlns="http://www.w3.org/2000/svg">
            <title>Buscar</title>
            <path
              d="M18.387 16.623C19.995 15.076 21 12.907 21 10.5 21 5.806 17.195 2 12.5 2 7.806 2 4 5.806 4 10.5S7.806 19 12.5 19c1.927 0 3.7-.65 5.125-1.73l4.4 5.153.76-.65-4.398-5.15zM12.5 18C8.364 18 5 14.636 5 10.5S8.364 3 12.5 3 20 6.364 20 10.5 16.636 18 12.5 18z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </form>
    )    
  }

}

function ArtistsList({artists, selectedArtists, onSelectArtist}) {
  return (
    <div className="artistsList">
        {artists.map((artist) => (
          <div key={artist.id} className="artistsListItem">
            <Artist  
              artist={artist} 
              selected = {selectedArtists.some(a => a.id === artist.id)}
              onSelect={onSelectArtist}/>
          </div>
        ))}
    </div>
  )
}

function Artist({artist, selected, onSelect}) {
  return (
    <div
        onClick={ () => { onSelect(artist) } }
        className={`artist ${selected ? "isSelected" : null}`} >
      <div
        className="artistImage "
        style={{
          width: 200,
          height: 200,
          borderRadius: 200,
          backgroundImage: `url('${artist.images.length ? artist.images[0].url : ''}')`
        }}
      />
      <span className="artistName">{artist.name}</span>
      <span>
        {artist.followers.total} Seguidores { (artist.genres.length) ? '-' : '' }
        <a
          href={artist.href}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir en Spotify"
        >
        <img src="/spotify.svg" alt="Spotify Logo" height="20" width="20" style={{ verticalAlign: 'middle' }} />
        </a>
      </span>
    </div>
  )
}

class Loading extends Component {
  constructor() {
    super();

    this.state = { dots: "." };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        dots: this.state.dots.length === 3 ? "" : this.state.dots + "."
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="loading">
        Cargando{this.state.dots}
      </div>
    );
  }
}

function MyArtistsList({artists, onSelectArtist}) {
  return (
    <ul className="myArtistsList">
      {artists.map((artist) => (
        <li key={artist.id} className="myArtistsListItem">
          <MyArtistItem 
            artist={artist} 
            onSelect={onSelectArtist} />
        </li>
      ))}
    </ul>
  )
}


function MyArtistItem({artist, onSelect}) {
  return (
    <div 
      className="smallArtist"
      onClick={ () => { onSelect(artist) } } >
      <div
        className="artistImage"
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundImage: `url('${artist.images.length ? artist.images[0].url : ''}')`
        }}
      />
      <div className="smallArtistName">{artist.name}</div>
    </div>
  )
}


function CollectionsPanel({ artists, onSelectArtist }) {

  return (
    <div>
      <h2 className="myArtistsTitle">
        Mis Artistas ({artists.length})
      </h2>
      <MyArtistsList 
        onSelectArtist={ onSelectArtist }
        artists={artists} />
    </div>
  )
}


class App extends Component {
  constructor() {
    super()

    this.state = {
      selectedArtists: []
    }

    this.handleSelectArtist = this.handleSelectArtist.bind(this)
  }


  handleSelectArtist (artist) {
    const without = this.state.selectedArtists.filter(a => a.id !== artist.id)
    this.setState({
      selectedArtists:  (without.length != this.state.selectedArtists.length) ?
                        without :
                        this.state.selectedArtists.concat(artist)
    })
  }

  render() {
    return (
      <div>
        <div className="leftPanel">
          <ArtistsPanel 
            onSelectArtist={ this.handleSelectArtist }
            selectedArtists={ this.state.selectedArtists } />
        </div>
        <div className="rightFixedPanel">
          <CollectionsPanel 
            onSelectArtist={ this.handleSelectArtist }
            artists={ this.state.selectedArtists } />
        </div>
      </div>
    )
  }
}

export default App;
