import { Card, CardContent, CardMedia, Typography, Stack, Avatar } from "@mui/material";
import { CheckCircle} from '@mui/icons-material'
import React from "react";
import { colors } from "../../constants/color";
import moment from "moment";
import { Link } from 'react-router-dom'
import '../../index.css'
const VideoCard = ({ video }) => {
  console.log("Video:", video);
  return (
    <Card sx={{ width: {xs: '100%', sm: '360px', md: '320px'}, boxShadow: "none", borderRadius: 0, }}  >
      <Link to={`/video/${video.id.videoId}`}>
        <CardMedia
          image={video?.snippet?.thumbnails?.high?.url}
          alt={video?.snippet?.title}
          sx={{ width: {xs: '100%', sm: '360px', md: '320px'}, height: "180px" }}
          className='card'
        />
      </Link>
      
        
      <CardContent
        sx={{
          background: colors.primary,
          height: "220px",
          position: "relative",
        }}
      >
        <Link to={`/video/${video.id.videoId}`}>
          <Typography my={"5px"} sx={{ opacity: ".4" }}>
            {moment(video?.snippet?.publishedAt, "YYYYMMDD").fromNow()}
          </Typography>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            {video?.snippet?.title.slice(0, 50)}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
            {video?.snippet?.description.slice(0,70)}
          </Typography>
        </Link>
        <Link to={`/channel/${video?.snippet?.channelId}`}>
          <Stack
            direction={"row"}
            position={"absolute"}
            bottom={'1px'}
            alignItems={"center"}
            gap={"5px"}
            margin={'10px'}
          >
            <Avatar src={video?.snippet?.thumbnails?.high?.url} />
            <Typography variant="subtitle2" color={'gray'} mx={'10px'}>{video?.snippet?.channelTitle}</Typography>
            <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}} />
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;