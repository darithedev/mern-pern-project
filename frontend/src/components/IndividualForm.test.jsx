import React from 'react'
import '@testing-library/jest-dom/vitest'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import IndividualForm from './IndividualForm.jsx'

describe('Individual Form Component', () => {
    test('individual form renders', () => {
        render(<IndividualForm />)
        expect(screen.getByText('Add Individual Animal Form')).toBeInTheDocument();
    });
});