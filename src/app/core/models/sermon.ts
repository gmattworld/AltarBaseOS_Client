export interface Sermon {
  id: string;
  title: string;
  description: string;
  date: Date;
  speaker: string;
  series: string;
  videoId: string; // YouTube Video ID
  thumbnailUrl: string;
}