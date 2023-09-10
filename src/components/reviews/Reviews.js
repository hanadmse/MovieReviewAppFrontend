import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

        const revText = useRef();
        let params = useParams();
        const movieId = params.movieId;

        useEffect(()=>{
            getMovieData(movieId);
        }, [getMovieData, movieId])

        const addReview = async (e) => {
            e.preventDefault();

            const rev = revText.current;

            // Step 1: Check if ref has a valid value
            if (rev && rev.value) {
            // Step 2: Console log for debugging
            console.log("Sending review:", rev.value);

                    try 
                    {
                        const response = await api.post("http://localhost:8080/api/v1/reviews", {reviewBody:rev.value, imdbId: movieId});


                        const updatedReviews = Array.isArray(reviews) ? [...reviews, {body:rev.value}] : [{body:rev.value}];

                        const newReview = { body: rev.value };

                        //setReviews(updatedReviews);
                        setReviews(prevReviews => (Array.isArray(prevReviews) ? [...prevReviews, newReview] : [newReview]));
                        
                        rev.value = "";

                    }
                    catch(err) 
                    {
                        console.error(err);
                    }
            } else {
                console.log("Review text is empty.");
            }
        }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className = "mt-2">
                <Col>
                    <img src = {movie?.poster} alt = "" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit = {addReview} revText = {revText} labelText = "Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r, index) => {
                            return(
                                <React.Fragment key={`${r.body}-${index}`}>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews




