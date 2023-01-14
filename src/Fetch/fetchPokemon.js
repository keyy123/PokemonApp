const fetchPokemon = async (queryKey) => {
  console.log(queryKey, "current offset value");
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${queryKey}`
  );
  if (!res.ok) {
    throw new Error("fetchPokemon is not okay");
  }
  // console.log(await res.json());
  return res.json();
};

export default fetchPokemon;
