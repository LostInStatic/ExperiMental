export interface IAPIRooms {
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
	field_opis:                    string;
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
	node_type:          NodeType;
	revision_uid:       NodeType;
	uid:                NodeType;
	field_eksperymenty: Field;
	field_skladniki:    Field;
}

export interface Field {
	data:  DAT[];
	links: FieldEksperymentyLinks;
}

export interface DAT {
	type: string;
	id:   string;
}

export interface FieldEksperymentyLinks {
	related: Self;
	self:    Self;
}

export interface NodeType {
	data:  DAT;
	links: FieldEksperymentyLinks;
}

export interface Jsonapi {
	version: string;
	meta:    Meta;
}

export interface Meta {
	links: DatumLinks;
}
