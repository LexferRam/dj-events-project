import Layout from 'components/Layout';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';

const DashboardPage = ({events}) => {
    console.log(events)
    return (
        <Layout title='User Dashboard'>
            <h1>Dashboard</h1>
        </Layout>
    );
};

export default DashboardPage;

export async function getServerSideProps({req}){
    const {token} = parseCookies(req)

    const res = await fetch(`${API_URL}/users/me?populate=*`,{
        method: 'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()

    console.log(token)

    return{
        props:{
            events
        }
    }
}
