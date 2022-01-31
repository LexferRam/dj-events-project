export function formatDateForInput(date) {
    const formatted = new Date(date).toISOString().slice(0, 10)
    return formatted
  }

//   Then import it in [id].js

// import { formatDateForInput } from '@/utils/formatDate'



// And then you only need to use it for the initial value in your useState()

//   const [values, setValues] = useState({
//     name: evt.name,
//     performers: evt.performers,
//     venue: evt.venue,
//     address: evt.address,
//     date: formatDateForInput(evt.date), // 👈 here
//     time: evt.time,
//     description: evt.description,
//   })
