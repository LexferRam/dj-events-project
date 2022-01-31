import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export default function EventPage({ events, page, total }) {


    return (
        <Layout>
            <h1>Events</h1>

            {events.data.length === 0 && <h3>No events to show</h3>}

            {events.data.map(evt => (
                <EventItem key={evt.id} id={evt.id} evt={evt.attributes} />
            ))}

            <Pagination page={page} total={total}/>
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    // console.log(page)
    //Calculate start page 
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    //Fetch events
    const eventRes = await fetch(`${API_URL}/events?populate=*&sort=updatedAt%3Adesc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`);
    const events = await eventRes.json();

    return {
        props: { events, page: +page, total: events.meta.pagination.total },
        //  revalidate: 1, //segundos
    }
}