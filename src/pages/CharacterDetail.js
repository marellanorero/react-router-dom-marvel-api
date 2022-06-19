import md5 from "md5";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const CharacterDetail = (props) => {
    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const [url] = useState("https://gateway.marvel.com/v1/public");
    const [characters, setCharacters] = useState(null);
    const [ts] = useState(1);
    const [publicKey] = useState("62f67d56c0cb782e43d50528b513eb14"); // PUBLIC_KEY
    const [privateKey] = useState("2d5ccbb03f42e49e5e0db701211fc68da56c6ea7");
    const [hash] = useState(md5(ts + privateKey + publicKey))


    useEffect(() => {
        getCharacterById(id);
    }, [])

    const getCharacterById = (id) => {
        fetch(url + `/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
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
            <span>{id}</span>
            <ul className="list-group">
                {
                    !!characters &&
                    characters.results.map((character, index) => {
                        return (
                            <li className='list-group-item d-flex justify-content-between' key={index}>
                                {character?.name}
                                <img src={character?.thumbnail?.path + '.' + character?.thumbnail?.extension} alt="" className="rounded-circle" width={40} height={40} />
                            </li>
                        )
                    })
                }
            </ul>
            <button className="btn btn-warning" onClick={history.goBack}>Regresar</button>

        </>
    )
}

export default CharacterDetail;