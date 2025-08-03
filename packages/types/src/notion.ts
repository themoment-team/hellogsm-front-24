export interface NotionUser {
  object: 'user';
  id: string;
}

export interface TextAnnotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface RichTextItem {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: TextAnnotations;
  plain_text: string;
  href: string | null;
}

export interface RichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: RichTextItem[];
}

export interface NumberProperty {
  id: string;
  type: 'number';
  number: number;
}

export interface TitleProperty {
  id: string;
  type: 'title';
  title: RichTextItem[];
}

export interface PageProperties {
  content: RichTextProperty;
  id: NumberProperty;
  title: TitleProperty;
}

export interface DatabaseParent {
  type: 'database_id';
  database_id: string;
}

export interface NotionPage {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null;
  icon: null;
  parent: DatabaseParent;
  archived: boolean;
  in_trash: boolean;
  properties: PageProperties;
  url: string;
  public_url: string | null;
}

export interface NotionResponse {
  object: 'list';
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'page_or_database';
  page_or_database: Record<string, unknown>;
  developer_survey: string;
  request_id: string;
}
