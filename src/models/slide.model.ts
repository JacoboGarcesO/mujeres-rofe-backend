export interface SlideModel {
  title: string;
  image: string;
  url: string;
}
export interface SlideResponseModel {
  slides: SlideModel[];
  message: string;
}
