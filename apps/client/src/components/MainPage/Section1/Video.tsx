import { cn } from 'shared/lib/utils';

const Video = () => (
  <video className={cn('w-full', 'h-full', 'object-cover')} autoPlay loop muted playsInline>
    <source src="/video/promotion.webm" type="video/webm" />
    <source src="/video/promotion.mp4" type="video/mp4" />
  </video>
);

export default Video;
