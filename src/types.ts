export type ContentType = 'news' | 'howto' | 'tools' | 'video' | 'industry' | '';

export interface Field {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'file';
  placeholder?: string;
  accept?: string;
}

export interface ContentTypeConfig {
  title: string;
  fields: Field[];
}

export interface TextFormData {
  [key: string]: string;
}

export interface FileFormData {
  [key: string]: File | null;
}
