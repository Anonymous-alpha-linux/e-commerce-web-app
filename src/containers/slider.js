import React from 'react';
import { Slider } from '../components';
import users from '../fixtures/users.json';

export default function SliderContainer() {
    return <Slider>
        <h1>This is root</h1>

        <Slider.Children>----This is children</Slider.Children>

        {
            users.map((user, index) => <Slider.Children key={index + 1}>
                <h1>Username: {user.username}</h1>
                <p>Age: {user.age}</p>
            </Slider.Children>)
        }

    </Slider>;
}
