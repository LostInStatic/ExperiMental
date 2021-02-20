export interface Ingredients {
	jsonapi: Jsonapi;
	data:    Datum[];
	links:   DatumLinks;
}

export interface Datum {
	type:          string;
	id:            string;
	links:         DatumLinks;
	attributes:    Attributes;
	relationships: Relationships;
}

export interface Attributes {
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
}

export interface Path {
	alias:    null;
	pid:      null;
	langcode: string;
}

export interface DatumLinks {
	self: Self;
}

export interface Self {
	href: string;
}

export interface Relationships {
	node_type:        NodeType;
	revision_uid:     NodeType;
	uid:              NodeType;
	field_ikona:      FieldIkona;
	field_ikona_mono: FieldIkona;
}

export interface FieldIkona {
	data:  FieldIkonaData;
	links: FieldIkonaLinks;
}

export interface FieldIkonaData {
	type: string;
	id:   string;
	meta: DataMeta;
}

export interface DataMeta {
	alt:    string;
	title:  string;
	width:  number;
	height: number;
}

export interface FieldIkonaLinks {
	related: Self;
	self:    Self;
}

export interface NodeType {
	data:  NodeTypeData;
	links: FieldIkonaLinks;
}

export interface NodeTypeData {
	type: string;
	id:   string;
}

export interface Jsonapi {
	version: string;
	meta:    JsonapiMeta;
}

export interface JsonapiMeta {
	links: DatumLinks;
}
