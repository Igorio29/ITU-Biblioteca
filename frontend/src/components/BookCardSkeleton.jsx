import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'

const BookCardSkeleton = ({ count = 3 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Grid key={index} xs={12} sm={6} md={4} lg={2}>
                    <Paper elevation={5}>
                        <Skeleton variant='rectangular' width="350px" height={600}/>
                            <Box sx={{p:2}}>
                                <Skeleton variant='text' width="80%"/>
                                <Skeleton variant='text' width="100%"/>
                                <Skeleton variant='text' width="40%"/>
                                <Skeleton variant='text' width="30%"/>
                            </Box>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}

BookCardSkeleton.protoTypes = {
    count: PropTypes.number
}

export default BookCardSkeleton
