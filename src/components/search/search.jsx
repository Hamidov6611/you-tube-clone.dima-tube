import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ApiService } from '../../service/api.service'
import { Typography, Box, Container } from '@mui/material'
import {colors} from '../../constants/color'
import Videos from '../videos/videos'
const Search = () => {
  const [videos, setVideos] = useState([])
  
  const { id } = useParams()
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      try {
      const data = await ApiService.fetching(`search?part=snippet&q=${id}`)
      console.log(data);
      setVideos(data.items)
      }
      catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [id])
  return (
    <Box p={2} sx={{height: '90vh'}}>
      <Container maxWidth={'90%'}>
        <Typography variant={'h4'} fontWeight={'bold'} mb={2} >
          Search results for <span style={{color: colors.secondary}}>{id}</span> videos
        </Typography>
        <Videos videos={videos} />
      </Container>
    </Box>
  )
}

export default Search