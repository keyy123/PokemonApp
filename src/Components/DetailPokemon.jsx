import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import fetchPokemonDataById from "../Fetch/fetchPokemonById";
import capitalize from "../../utility/capitalize";
import fetchEachUrl from "../Fetch/fetchEachUrl";
import Tabs from "./Tabs";


const DetailPokemon = () => {
    /* Improve the styling:
        1.) Types - make them look like the ones in pokemon
        2.) Font - Use pokemon fonts for pokedex entries
        3.) Determine the color scheme for the application
        4.) Style the Main Link for the application
        5.) Add a navigation bar - KISS
        6.) Add a footer bar - KISS
        
        PMVP: 
            1. Embed Pokemon Game using pokemon in the details mid battle
            2. Use AI to train/coach people playing simulation turn by turn
            
       */
    const { id } = useParams();
    const goTo = useNavigate()
    const { data: pkmn, isLoading, isSuccess } = useQuery([ "pkmninfo", [ "pokemon/", id ] ], fetchPokemonDataById)
    const results = useQueries({
        queries: [
            { queryKey: [ 'pkmnentry', pkmn?.species?.url], queryFn: fetchEachUrl, enabled: !!pkmn },
        ]
    });
    console.log(pkmn)
    console.log(results, pkmn)
    return (
        <div>
            { isLoading ? <p>Loading...</p>
                : isSuccess ? null : <p>initial fetch failed</p> }
            <p>Pokemon #{ id }</p>
            <figure>
                <img src={`${pkmn?.sprites?.["front_default"]}`} alt="pokemon" />
            </figure>
            <div>
                <p>
                    { pkmn?.types?.map((pkmn, idx) => {
                        return (
                            <span key={ idx } className={ `${pkmn.type.name}-type` }>
                                { pkmn?.type.name }{" "}
                            </span>
                        )
                    }) }
                </p>
                <p><span>{ `Wt: ${((pkmn?.weight) / 10)} kgs` }</span>{ " " }<span>{ `Ht: ${((pkmn?.height) / 10)} m` }</span></p>
                <Tabs>
                   <div label="Pokedex Entry">
                        <p>
                        {
                            pkmn && `${capitalize(pkmn?.name)}, ${String(results?.[0]?.data?.["flavor_text_entries"]?.[0]?.["flavor_text"]).toLowerCase()}`
                        }
                        </p>
                </div> 
                   <div label="Location">Pokemon Location</div> 
                   <div label="Move Lists">Possible Moves</div> 
                   <div label="Evolutions">Evolutions</div> 
                   <div label="Strategies">Strategies</div> 
                </Tabs>
                <br/>
                <button
                    onClick={() => goTo(`/details/${id - 1}`)}
                    disabled={id <= 1}
                >
                    &larr; Prev
                </button>
                <button 
                    onClick={() => goTo(`/details/${id + 1}`)}
                    disabled={id === 151}
                >
                    &rarr; Next
                </button>
            </div>
        </div>
    )
}

function DetailPokemonWrapper(props) {
    return (
        <ErrorBoundary errorComponent={ <p>Give our researchers a moment plz...</p> }>
            <DetailPokemon { ...props } />
        </ErrorBoundary>
    )
}

export default DetailPokemonWrapper;