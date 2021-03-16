export interface IAPIExperiments {
    jsonapi: Jsonapi;
    data:    IAPIExperimentsDatum[];
    links:   DatumLinks;
}

export interface IAPIExperimentsDatum {
    type:          FluffyType;
    id:            string;
    links:         DatumLinks;
    attributes:    Attributes;
    relationships: Relationships;
}

export interface Attributes {
    drupal_internal__nid:          number;
    drupal_internal__vid:          number;
    langcode:                      Langcode;
    revision_timestamp:            string;
    revision_log:                  null;
    status:                        boolean;
    title:                         string;
    created:                       string;
    changed:                       string;
    promote:                       boolean;
    sticky:                        boolean;
    default_langcode:              boolean;
    revision_translation_affected: boolean | null;
    path:                          Path;
    field_instrukcja:              string[];
    field_odnosniki:               Field | null;
    field_opoznienie_wyjasnienia:  number;
    field_wstep:                   Field;
    field_wyjasnienie:             Field;
}

export interface Field {
    value:     string;
    format:    Format;
    processed: string;
}

export enum Format {
    PlainText = 'plain_text',
    Tekst = 'tekst',
}

export enum Langcode {
    Pl = 'pl',
}

export interface Path {
    alias:    null;
    pid:      null;
    langcode: Langcode;
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
    data:  FieldSkladnikiDatum[];
    links: FieldSkladnikiLinks;
}

export interface FieldSkladnikiDatum {
    type:  PurpleType;
    id:    string;
    meta?: DatumMeta;
}

export interface DatumMeta {
    arity: number;
}

export enum PurpleType {
    NodeSkladnik = 'node--skladnik',
}

export interface FieldSkladnikiLinks {
    related: Self;
    self:    Self;
}

export interface NodeType {
    data:  Data;
    links: FieldSkladnikiLinks;
}

export interface Data {
    type: DataType;
    id:   string;
}

export enum DataType {
    NodeTypeNodeType = 'node_type--node_type',
    UserUser = 'user--user',
}

export enum FluffyType {
    NodeEksperyment = 'node--eksperyment',
}

export interface Jsonapi {
    version: string;
    meta:    JsonapiMeta;
}

export interface JsonapiMeta {
    links: DatumLinks;
}
