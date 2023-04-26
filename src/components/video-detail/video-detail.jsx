import { Box, Chip, Typography, Stack, Avatar  } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiService } from '../../service/api.service'
import ReactPlayer from 'react-player'
import '../../index.css'
import { CheckCircle, FavoriteOutlined, MarkChatRead, Tag, Visibility } from '@mui/icons-material'
import renderHTML from 'react-render-html'
import {Loader, Videos} from '../'
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState([])
  const [relatedVideo, setRelatedVideo] = useState([])
  const {id} = useParams()
  useEffect(() => {
    const getData = async () => {
      try {
      const data = await ApiService.fetching(`videos?part=snippet,statistics&id=${id}`)
      setVideoDetail(data.items[0])
      const relatedData = await ApiService.fetching(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      setRelatedVideo(relatedData.items)
      }
      catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  if(!videoDetail.snippet) return <Loader />

  // const {
  //   snippet: {title, channelId, channelTitle, description, tags, thumbnails},
  //   statistics: {viewCount, likeCount, CommentCount}
  // } = videoDetail 
  

 
  console.log(videoDetail);
  return (
    <Box minHeight={'90vh'} mb={10}>
  
      <Box display={'flex'} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
        <Box width={{xs: '100%', md: '75%'}} >
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
          className="react-player"
          controls
          />
          
          {videoDetail?.snippet?.tags?.slice(0, 6).map((item, idx) => (
              <Chip
                
                label={item}
                key={idx}
                sx={{marginTop: '10px', cursor: 'pointer', marginLeft: '10px'}}
                deleteIcon={<Tag />}
                onDelete={() => {}}
                variant='outlined'
              >#</Chip>
            ))}
            <Typography variant='subtitle2' fontStyle='bold' p={2} >
              {videoDetail?.snippet?.title}
            </Typography>
            <Typography variant='h7' p={2} sx={{opacity: '.7'}} >
              {renderHTML(videoDetail?.snippet?.description.slice(0,400))}...
              {/* {videoDetail?.snippet?.description?.slice(0,480)}... */}
            </Typography>
            <Stack direction='row' gap='20px' alignItems={'center'} py={1} px={2} >
                <Stack sx={{ opacity: 0.7}} direction='row' alignItems={'center'} gap='3px' >
                    <Visibility />
                    {parseInt(videoDetail?.statistics?.viewCount).toLocaleString()} views
                </Stack>
                <Stack sx={{ opacity: 0.7}} direction='row' alignItems={'center'} gap='3px' >
                    <FavoriteOutlined />
                    {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()} likes
                </Stack>
                <Stack sx={{ opacity: 0.7}} direction='row' alignItems={'center'} gap='3px' >
                    <MarkChatRead />
                    {parseInt(videoDetail?.statistics?.commentCount).toLocaleString()} comments
                </Stack>
            </Stack>
            <Stack direction={'row'} py={1} px={2} >
                <Link to={`/channel/${videoDetail?.snippet?.channelId}`} >
                    <Stack direction={'row'} alignItems='center' gap='5px' marginTop='5px'>
                        <Avatar 
                        alt={videoDetail.snippet.chanellTitle}
                        src={videoDetail.snippet.thumbnails.default.url}
                        />
                        <Typography variant='subtitle2' color='gray'>
                            {videoDetail.snippet.channelTitle}
                        </Typography>
                        <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px' }} />
                    </Stack>
                </Link>
            </Stack>
        </Box> 
        <Box width={{xs: '100%', md: '25%'}}><Videos videos={relatedVideo && relatedVideo} /></Box>
      </Box>
    </Box>
  )
}

export default VideoDetail