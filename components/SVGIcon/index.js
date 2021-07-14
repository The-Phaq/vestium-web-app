import React from 'react';
import Image from 'next/image';

const ImgIcon = ({ alt, src, ...props }) => (
  <div className="img-icon">
    <Image
      alt={alt}
      src={`/icons/${src}.svg`}
      // width={20}
      // height={20}
      layout="fill"
      objectFit="contain"
      {...props}
    />
  </div>
)

export default ImgIcon;

export const HomeIcon = (props) => <ImgIcon {...props} alt="home" src="home" />
export const HeartIcon = (props) => <ImgIcon {...props} alt="heart" src="heart" />
export const CalendarIcon = (props) => <ImgIcon {...props} alt="calendar" src="calendar" />
export const VestIcon = (props) => <ImgIcon {...props} alt="vest" src="vestiums" />
export const LikeIcon = props => <ImgIcon {...props} alt="like" src="like" />
export const ShareIcon = props => <ImgIcon {...props} alt="share" src="share" />
export const FollowIcon = props => <ImgIcon {...props} alt="follow" src="follow" />