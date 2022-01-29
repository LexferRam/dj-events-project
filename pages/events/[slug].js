import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const EventPage = () => {
    const router = useRouter();

    console.log(router)

    return (
        <Layout>
            <h1>My Event</h1>
            {/* El nombre asignado al archivo es el nombre del parametro */}
            <p>{router.query.slug}</p>
        </Layout>
    );
};

export default EventPage;
