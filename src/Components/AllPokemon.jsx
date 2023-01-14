import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import fetchEachUrl from "../Fetch/fetchEachUrl";
import fetchPokemon from "../Fetch/fetchPokemon";
import pokeball from "../pokeball-pokemon-svgrepo-com.svg";
import ErrorBoundary from "./ErrorBoundary";

const AllPokemon = () => {
  const [page, setPage] = useState(10)
  const queryClient = useQueryClient();
  const {data: pokemon, isLoading: findPokemon, isFetching, isPreviousData} = useQuery({
    queryKey: ['pokemon', page],
    queryFn:() => fetchPokemon(page),
    keepPreviousData: true,
    staleTime: 5000
  })
    // ["pokemon", page], fetchPokemon, keepPreviousData: true;
  
  useEffect(() => {
    if(!isPreviousData && pokemon){
      queryClient.prefetchQuery({
        queryKey: ['pokemon', page + 10],
        queryFn: () => fetchPokemon(page + 10),        
      })
    }
  }, [pokemon, isPreviousData, page, queryClient]);
  

  const pokeArr = pokemon?.results ?? [];
  console.log(pokeArr)
  const pokeQueries = useQueries({
      queries: pokeArr.map((pkmn) => {
        return { 
          queryKey: ['eachPokemon', pkmn?.url], 
          queryFn: fetchEachUrl,
          enabled: !!pokeArr
        }
      }), 
  });

  // console.log(pokeQueries, findPokemon);

  if(findPokemon) return <p>Loading...</p>
  return (
    <div className="all-pkmn">
      {isFetching ? (
        <span>Still Finding Pokemon...</span> 
      ): findPokemon ? (
        <div>Loading...</div>
        ):(pokeQueries?.map(({data})=>(
          <Link to={`/details/${data?.id}`} key={data?.id} className="pkmn-card">
          <div>
            <span className="pkmn-card__logo">
              <img src={pokeball} alt="pokeball"/>
              <p>{`#${data?.id}`}</p>
            </span>
            <img src={`${data?.sprites["front_shiny"]}`} alt={data?.name}/>
            <div className="pkmn-card__text">
              <h2>{data?.name}</h2>
              <div>
                <span>{`${data?.types[0]?.type?.name}`}</span>{" "}
                <span>{`${data?.types[1]?.type?.name || ""}`}</span>
              </div>
            </div>
          </div>
        </Link>
        ))
        )}
        <div>
          <button
            onClick={()=>
              setPage((prevState) => {
                Math.max(prevState - 10, 0);
              })}
              disabled={page === 0}
              >
            &larr;
          </button>
          <button 
            onClick={()=>{
              !isPreviousData && pokemon ? setPage(prevState => prevState + 10) : null
            }}
            disabled={isPreviousData || !pokemon }
            >
            &rarr;
          </button>
        </div>
    </div>
  )
}

function AllPkmnWrapper(props){
  return (
    <ErrorBoundary errorComponent={<p>We&apos;re hun...I mean finding nice pokemon for ya. Plz wait...</p>}>
      <AllPokemon {...props}/>
    </ErrorBoundary>
  )
}

export default AllPkmnWrapper;
{/* {!findPokemon && pokeQueries[pokeQueries.length - 1].status === "success" && ( */}
