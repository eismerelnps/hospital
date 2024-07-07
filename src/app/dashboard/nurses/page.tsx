import NursesContainer from "@/lib/modules/Nurses/NursesContainer";
import PatientContainer from "@/lib/modules/Patient/PatientContainer"

async function getData() {
  const res = await fetch(
    'http://127.0.0.1:8000/nurses',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc'
      }
    }
  );
  console.log('res', res)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function page() {
  const data = await getData()
  return <NursesContainer nurses={data} />
}
