import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Individual Form Component', () => {
    test('individual form renders', () => {
        render(<IndividualForm />)
        expect(screen.getByText('Add Individual Animal Form')).toBeInTheDocument();
    });
});