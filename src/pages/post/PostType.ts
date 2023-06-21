// 话题List类型
export interface TopicModel {
  value: string;
  label: string;
  id: number;
}
// /post提交数据的类型
export interface PostDataFormat {
  atIds: number[];
  body: string;
  customTags: string[];
  mainTagIds: number[];
  mediaUrls: string[];
}
