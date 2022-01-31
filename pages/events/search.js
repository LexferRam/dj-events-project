import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {

    const router = useRouter()

    return (
        <Layout title="Search Results">
            <Link href='/events'>Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>

            {events.data?.length === 0 && <h3>No events to show</h3>}

            {events.data?.map(evt => (
                <EventItem key={evt.id} id={evt.id} evt={evt.attributes} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({ query: { term } }) {

    const qs = require('qs');
    const query = qs.stringify({
        filters:{
            $or: [
                {
                    name: {
                        $contains: term,
                    }
                },
                {
                    performers: {
                        $contains: term,
                    }
                },
                {
                    description: {
                        $contains: term,
                    }
                },
                {
                    venue: {
                        $contains: term,
                    }
                },
            ]
        }
    }, {
        encodeValuesOnly: true,
    });

    const res = await fetch(`${API_URL}/events?populate=*&filters[name][$contains]=${term}`);
    // const res = await fetch(`${API_URL}/events?populate=*&${query}`);
    const events = await res.json();

    return {
        props: { events }
    }
}

//REST API: Filtering, Locale, and Publication State
//https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering