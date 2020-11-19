import React from 'react';

jest.mock('@chakra-ui/react', () => {
    const actual = jest.requireActual('@chakra-ui/react');
    return {
        ...actual,
        Portal: () => <mock-portal />
    }
});
