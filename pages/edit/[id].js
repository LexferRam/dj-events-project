import { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import {FaImage} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import ImageUpload from '@/components/ImageUpload'

const EditEventPage = ({evt:{data:{id,attributes}}}) => {

    const [values, setValues] = useState({
        name: attributes.name,
        performers: attributes.performers,
        venue: attributes.venue,
        address: attributes.address,
        date: attributes.date,
        time: attributes.time,
        description: attributes.description
    });
    const [imagePreview, setImagePreview] = useState(
        attributes.image ? attributes.image.data?.attributes.formats.thumbnail.url : null
    )
    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const handleSubmit =async (e) => {
        e.preventDefault()
        
        //validation 
        const hasEmptyFields = Object.values(values).some(element => element === '')

        if(hasEmptyFields){
            toast.error('please fill in all fields')
        }
        const res = await fetch(`${API_URL}/events/${id}`,{
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data:values})
        })

        if(!res.ok){
            toast.error('Something went wrong')
        }else{
            const evt = await res.json()
            router.push(`/events/${evt.data.attributes.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const imageUploaded = async () => {

        const res = await fetch(`${API_URL}/events/${id}?populate=*`)
        const data = await res.json()

        console.log(data.data.attributes)

        setImagePreview(data.data.attributes.image.data?.attributes.formats.thumbnail.url)
        setShowModal(false)
    }

    return (
        <Layout title="Edit New Event">
            <Link href='/events'>Go Back</Link>
            <h1>add Event</h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange} />
                    </div>

                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={moment(values.date).format('yyyy-MM-DD')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type='submit' value='Update Event' className='btn' />

            </form>

            <h2>Event Image</h2>
            
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ):(
                <div>
                    <p>No Image uploaded</p>
                </div>
            )}

            <div>
                <button className="btn-secondary" onClick={() => setShowModal(true)}>
                    <FaImage /> Set Image
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <ImageUpload  evtId={id} imageUploaded={imageUploaded}/>
            </Modal>
        </Layout>
    );
};

export default EditEventPage;

export async function getServerSideProps({params:{id}, req}){
    const res = await fetch(`${API_URL}/events/${id}?populate=*`)
    const evt = await res.json()

    console.log(req.headers.cookie)

    return {
        props:{
            evt
        }
    }
}