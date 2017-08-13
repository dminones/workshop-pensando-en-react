import { getArtistsData } from "../data";

export function getArtists(query) {
	return new Promise( (resolve$$1, reject) => {
		function resolve() {
			resolve$$1({items:getArtistsData().filter(a => (a.name.toLowerCase().indexOf(query.toLowerCase()) > -1))})
		}

		setTimeout(resolve,1000)
	})
}