export async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Falha ao buscar os usuários:", res.statusText);
    return [];
  }
  return res.json();
}