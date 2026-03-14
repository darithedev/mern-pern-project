import React from 'react'
import '@testing-library/jest-dom/vitest'
import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IndividualForm from './IndividualForm.jsx'

afterEach(() => {
    cleanup()
})

describe('Individual Form Component', () => {
    test('individual form renders', () => {
        render(<IndividualForm />)
        expect(screen.getByText('Add Individual Animal Form')).toBeInTheDocument();
    });

    test('user should be able to input individual (animal) nick name', async () => {
        render(<IndividualForm />)
        const nickNameInput = screen.getByPlaceholderText('Cutie pie')
        await userEvent.type(nickNameInput, 'Simba')
        expect(nickNameInput).toHaveValue('Simba')
    });

    test('user should be able to provide their name', async () => {
        render(<IndividualForm />)
        const scientistInput = screen.getByPlaceholderText('Dari Cares')
        await userEvent.type(scientistInput, 'Jane Goodall')
        expect(scientistInput).toHaveValue('Jane Goodall')
    });
});