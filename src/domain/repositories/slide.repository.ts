import { ISlide } from '../../core/interfaces/slide.interface';
import { MongooseSource } from '../../data/mongoose.source';

export class SlideRepository {
  private db: MongooseSource<ISlide>;

  constructor(db: MongooseSource<ISlide>) { this.db = db; }

  public async getSlides(): Promise<ISlide[]> {
    return await this.db.findAll({}, {});
  }

  public async getSlideById(slideId: string): Promise<ISlide | null> {
    return await this.db.findById(slideId);
  }

  public async createSlide(slide: ISlide): Promise<ISlide> {
    return await this.db.create(slide);
  }

  public async updateSlide(slide: ISlide): Promise<ISlide | null> {
    return await this.db.update(slide.id, slide);
  }

  public async deleteslide(slideId: string): Promise<ISlide | null> {
    return await this.db.delete(slideId);
  }
}
