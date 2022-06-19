import MD5 from 'md5';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [url] = useState("https://gateway.marvel.com/v1/public");
    const [characters, setCharacters] = useState(null);
    const [ts] = useState(1);
    const [publicKey] = useState(process.env.REACT_APP_PUBLIC_KEY); // PUBLIC_KEY
    const [privateKey] = useState(process.env.REACT_APP_PRIVATE_KEY); // PRIVATE_KEY
    const [hash] = useState(MD5(ts + privateKey + publicKey))


    useEffect(() => {
        getCharacters();
    }, [])

    const getCharacters = () => {
        fetch(url + `/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then(({ data }) => {
                console.log(data);
                setCharacters(data);
            });
    }

    return (
        <>
            {MD5('Hola')}
            <h1>Home</h1>
            <ul className="list-group">
                {
                    !!characters &&
                    characters.results.map((character, index) => {
                        return (
                            <li className='list-group-item' key={index}>
                                <Link className='text-decoration-none d-flex justify-content-between' to={`/character/${character?.id}/detail`}>
                                    {character?.name}
                                    <img src={character?.thumbnail?.path+'.'+character?.thumbnail?.extension} alt="" className="rounded-circle" width={40} height={40} />
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Home;