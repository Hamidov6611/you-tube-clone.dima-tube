import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Box, Container, Typography } from '@mui/material'
import { colors } from '../../constants/color'
import { Category, Videos } from '../'
import { ApiService } from '../../service/api.service'
const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("New")
  const [videos, setVideos] = useState([])

  const selectedCategoryHandler = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(`search?part=snippet&q=${selectedCategory}`)
        setVideos(data.items)
      }
      catch (error) {
        console.log(error);
      }
    }
    getData()
  },[selectedCategory])
  return <Stack justifyContent={'center'}>
    <Category selectedCategoryHandler={selectedCategoryHandler} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    <Box p={2} sx={{ height: '90vh' }} >
        <Container maxWidth={'90%'} >
            <Typography variant={'h4'} fontWeight={"bold"} mb={2}>
              {selectedCategory} <span style={{color: colors.secondary}}>videos</span>
            </Typography>
            <Videos videos={videos} />
        </Container >
    </Box>
  </Stack>
}

export default Main