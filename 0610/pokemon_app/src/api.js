export const getPokemon = async (name, signal) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    signal,
  });

  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
  const data = await res.json();
  const speciesRes = await fetch(data.species.url, {
    signal,
  });
  const speciesData = await speciesRes.json();
  const jpName = speciesData.names.find((n) => n.language.name === "ja");
  data.jpName = jpName?.name ?? data.name;
  return data;
};
