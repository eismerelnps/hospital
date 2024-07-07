async function getData(id: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/users/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc'
      }
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const { image, id, username, first_name, last_name, email, phone_number } = data
  return (
    <div>
      <div className="w-24 h-24 rounded-full"></div>
      <h1>{first_name}</h1>
      <h1>{last_name}</h1>
      <h3>{email}</h3>
      <h2>{username}</h2>
      <p>{phone_number}</p>
    </div>
  )
}
