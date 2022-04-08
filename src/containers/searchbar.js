import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ContainerComponent, Form, Text } from '../components'
import { usePostContext } from '../redux';

export default function Searchbar({ }) {
    const { searchPost } = usePostContext();
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    function submitSearchQuery(e) {
        e.preventDefault();
        searchPost(input, data => {
            setSearchResults(data.response);
        });
    }

    return (
        <ContainerComponent style={{ background: 'transparent' }}>
            <ContainerComponent.Inner className="" style={{ maxWidth: '680px', margin: '0 auto' }}>
                <Form style={{ maxWidth: 'unset' }} onSubmit={submitSearchQuery}>
                    <Text.Title>Search modal</Text.Title>
                    <Form.Input placeholder="Search post / author" onChange={(e) => setInput(e.target.value)}></Form.Input>
                </Form>

                <ContainerComponent.Pane className="search__results">
                    {searchResults.map(result => {
                        console.log(result);
                        return <ContainerComponent.Pane>
                            <Link to={`/post_detail/${result._id}`}>{result.content.length > 100 ? `${result.content.substring(1, 100)}...` : result.content}</Link>
                        </ContainerComponent.Pane>
                    })}
                </ContainerComponent.Pane>
            </ContainerComponent.Inner>
        </ContainerComponent>
    )
}
