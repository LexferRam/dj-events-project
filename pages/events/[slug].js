import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import {useRouter} from 'next/router'

const EventPage = ({ evt:{id, attributes} }) => {

    const router = useRouter()

    const deleteEvent = async (e) => {
        console.log(id)
        if(confirm('Are you sure?')){
            const res = await fetch(`${API_URL}/events/${id}`,{
                method:'DELETE'
            })

            const data = await res.json();

            if(!res.ok){
                toast.error(data.message)
            }else{
                router.push('/events')
            }
        }
    }


    return (
        <Layout>
            <div className={styles.event}>

                <div className={styles.controls}>
                    <Link href={`/edit/${id}`}>
                        <a>
                            <FaPencilAlt />Edit Event
                        </a>
                    </Link>
                    <a href="#"
                        className={styles.delete}
                        onClick={deleteEvent}
                    >
                        <FaTimes /> Delete Event
                    </a>
                </div>

                <span>
                    {new Date(attributes.date).toLocaleDateString('en-US')} at evt {attributes.time}
                </span>

                <h1>{attributes.name}</h1>
                <ToastContainer />
                {attributes.image && (
                    <div className={styles.image}>
                       
                        <Image src={ attributes.image.data ? attributes.image.data?.attributes.formats.medium.url : '/images/event-default.png'} width={960} height={600} />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{attributes.performers}</p>

                <h3>Description:</h3>
                <p>{attributes.description}</p>

                <h3>Venue: {attributes.venue}</h3>
                <p>{attributes.address}</p>

                <Link href='/events'>
                    <a className={styles.back}>
                        GoBack
                    </a>
                </Link>
            </div>
        </Layout>
    );
};

export default EventPage;

// export async function getServerSideProps({ query: { slug } }) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json()

//     return {
//         props: {
//             evt: events[0]
//         },
//     }
// }

export async function getStaticPaths() {

    const res = await fetch(`${API_URL}/events`)
    const events = await res.json()
 
    // const paths = events.data.map(evt => ({
    //     params: { id: evt.id.toString() }
    // }))

    const paths = events.data.map(evt => ({
        params: { slug: evt.attributes.slug }
    }))

    return {
        paths,
        fallback: true,
        //'false' mostrara la pg 404 si el slug no se consigue
        // 'true' si no lo consigue hace un nuevo request
    }
}


// export async function getStaticProps({ params:{id}}) {
//     const res = await fetch(`${API_URL}/events/${id}?populate=*`)
export async function getStaticProps({ params:{slug}}) {
    // const res = await fetch(`${API_URL}/events/${slug}?populate=*`)
    const res = await fetch(`${API_URL}/events?populate=*&filters[slug][$eq]=${slug}`)
    const events = await res.json()

    return {
        props: {
            evt: events.data[0]
        },
        revalidate: 1
    }
}