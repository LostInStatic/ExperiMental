export interface Experiments {
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
    revision_timestamp:            Date;
    revision_log:                  null;
    status:                        boolean;
    title:                         string;
    created:                       Date;
    changed:                       Date;
    promote:                       boolean;
    sticky:                        boolean;
    default_langcode:              boolean;
    revision_translation_affected: boolean;
    path:                          Path;
    field_instrukcja:              string[];
    field_opoznienie_wyjasnienia:  number;
    field_wstep:                   FieldW;
    field_wyjasnienie:             FieldW;
}

export interface FieldW {
    value:     string;
    format:    string;
    processed: string;
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
    node_type:       NodeType;
    revision_uid:    NodeType;
    uid:             NodeType;
    field_skladniki: FieldSkladniki;
}

export interface FieldSkladniki {
    data:  DAT[];
    links: FieldSkladnikiLinks;
}

export interface DAT {
    type: string;
    id:   string;
}

export interface FieldSkladnikiLinks {
    related: Self;
    self:    Self;
}

export interface NodeType {
    data:  DAT;
    links: FieldSkladnikiLinks;
}

export interface Jsonapi {
    version: string;
    meta:    Meta;
}

export interface Meta {
    links: DatumLinks;
}