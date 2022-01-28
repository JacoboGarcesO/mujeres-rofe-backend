export interface SlideModel {
  title: string;
  image: string;
  url: string;
}

export interface SlideRequestModel {
  slide: SlideModel;
  message: string;
}
