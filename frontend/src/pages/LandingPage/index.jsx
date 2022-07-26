import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'

export function LandingPage( props ) {
    const login = () => window.location.href = "https://site.golden-manga.com/api/auth/discord"
    return (
        <Button 
            onClick={ login }
            variantcolor="orange"
        >
            Login
        </Button>
    )
}