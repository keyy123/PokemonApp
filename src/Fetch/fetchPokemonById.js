const fetchPokemonDataById = async ({ queryKey }) => {
  const [endpoint, id] = queryKey[1];
  console.log(queryKey);
  const base = "https://pokeapi.co/api/v2/";
  const res = await fetch(`${base}${endpoint}${id}`);
  if (!res.ok) {
    throw new Error("id fetch is not ok");
  }
  return res.json();
};

export default fetchPokemonDataById;
