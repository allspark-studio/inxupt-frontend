// 话题List类型
export interface topicModel {
  value: string;
  label: string;
  id: number;
}
// /post提交数据的类型
export interface postDataFormat {
  atIds: number[];
  body: string;
  customTags: string[];
  mainTagIds: number[];
  mediaUrls: string[];
}
