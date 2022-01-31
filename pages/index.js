import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.data?.length === 0 && <h3>No events to show</h3>}

      {events.data?.map(evt => (
        <EventItem key={evt.id} id={evt.id} evt={evt.attributes} />
      ))}

      {events.data?.length > 0 && (
        <Link href='/events'>
          <a className='btn btn-secondary'>
            View All Events
          </a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {

  const res = await fetch(`${API_URL}/events?populate=*&sort=updatedAt%3Adesc&pagination[limit]=3`);

  const events = await res.json();
  console.log(events)

  return {
    props: { events },
    revalidate: 1, //segundos
  }
}

// http://localhost:1337/api/events?populate=*&_sort=date:ASC&_limit=3