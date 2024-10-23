
import { RenderMode } from '../../types/mode'
export interface IApolloService {
  getRenderMode: (activityName: string) => Promise<RenderMode>;
  getH5Gateway: () => Promise<String>;
}
