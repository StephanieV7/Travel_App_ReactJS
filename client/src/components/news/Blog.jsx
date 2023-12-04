import styles from './Blog.module.css';
import { useContext, useEffect, useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import * as blogService from '../../services/blogService'

const Blog = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { _id: userId } = useContext(AuthContext);

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        blogService.getAllNews()
            .then(result => setArticles(result))
    }, []);

    const onClickAddArticle = () => {
        navigate('/addArticle')
    }


    return (
        <div className={styles.mainContainer}>
            {isAuthenticated && <>
                <h1>Share your trip story</h1>
                <div className={styles.buttonContainer}>

                    <Button className={styles.addTripButton} variant="outline-info" onClick={onClickAddArticle}>Add your story</Button>

                </div>
            </>
            }

            {articles.length > 0 ? (
                <Stack gap={3}>
                    {articles.map((item) => (
                        <div key={item._id} className={styles.articleContainer}>
                            <h1>{item.headline}</h1>
                            <p>{item.body}</p>
                            {item._ownerId === userId &&
                                <>
                                    <Button variant="primary" type='submit' style={{ marginLeft: '10px' }}>Edit</Button>
                                    <Button variant="danger" type='submit' style={{ marginLeft: '10px' }}>Delete</Button>
                                </>}
                        </div>
                    ))}

                </Stack>
            ) : (
                <h2>No articles.</h2>
            )}
        </div>
    );
};

export default Blog;

