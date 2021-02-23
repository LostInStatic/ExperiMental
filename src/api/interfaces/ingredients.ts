export interface IAPIIngredients {
	jsonapi: Jsonapi;
	data:    Datum[];
	links:   DatumLinks;
}

export interface Datum {
	type:                          string;
	id:                            string;
	links:                         DatumLinks;
	drupal_internal__nid:          number;
	drupal_internal__vid:          number;
	langcode:                      string;
	revision_timestamp:            string;
	revision_log:                  null;
	status:                        boolean;
	title:                         string;
	created:                       string;
	changed:                       string;
	promote:                       boolean;
	sticky:                        boolean;
	default_langcode:              boolean;
	revision_translation_affected: boolean;
	path:                          Path;
	node_type:                     NodeType;
	revision_uid:                  NodeType;
	uid:                           NodeType;
	field_ikona:                   FieldIkona;
	field_ikona_mono:              FieldIkona;
}

export interface FieldIkona {
	type?:                 string;
	id?:                   string;
	links:                 FieldIkonaLinks;
	drupal_internal__fid?: number;
	langcode?:             string;
	filename?:             string;
	uri?:                  URI;
	filemime?:             string;
	filesize?:             number;
	status?:               boolean;
	created?:              string;
	changed?:              string;
	meta?:                 FieldIkonaMeta;
	uid?:                  NodeType;
	data?:                 null;
}

export interface FieldIkonaLinks {
	self:     Self;
	related?: Self;
}

export interface Self {
	href: string;
}

export interface FieldIkonaMeta {
	alt:    string;
	title:  string;
	width:  number;
	height: number;
}

export interface NodeType {
	type: Type;
	id:   string;
}

export enum Type {
	NodeTypeNodeType = 'node_type--node_type',
	UserUser = 'user--user',
}

export interface URI {
	value: string;
	url:   string;
}

export interface DatumLinks {
	self: Self;
}

export interface Path {
	alias:    null;
	pid:      null;
	langcode: string;
}

export interface Jsonapi {
	version: string;
	meta:    JsonapiMeta;
	parsed:  boolean;
}

export interface JsonapiMeta {
	links: DatumLinks;
}
