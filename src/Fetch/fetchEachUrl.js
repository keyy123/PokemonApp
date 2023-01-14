const fetchEachUrl = async ({ queryKey }) => {
  console.log(queryKey, "this is line 2");
  const pkmn = queryKey[1];
  console.log(pkmn, "line 4 - fetchEach");
  const res = await fetch(pkmn);
  if (!res.ok) {
    throw new Error("fetchEachUrl is not okay");
  }
  return await res.json();
};

export default fetchEachUrl;
