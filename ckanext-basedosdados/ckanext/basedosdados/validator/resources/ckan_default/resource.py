from datetime import datetime
from typing import Optional

from ckanext.basedosdados.validator import BaseModel
from ckanext.basedosdados.validator.available_options import IdType
from pydantic import Extra
from pydantic import StrictStr as Str


### Do not use extra while creating new models
class _CkanDefaultResource(BaseModel):  # , extra=Extra.forbid):
    # fmt: off
    id                 : IdType
    name               : Str
    description        : Str
    position           : int
    url                : Optional[str] # reserved in ckan
    cache_last_updated : Optional[datetime]
    cache_url          : Optional[Str]
    created            : Optional[datetime]
    datastore_active   : Optional[bool]
    format             : Optional[Str]
    formato            : Optional[Str]
    hash               : Optional[Str]
    last_modified      : Optional[datetime]
    metadata_modified  : Optional[datetime]
    mimetype           : Optional[Str]
    mimetype_inner     : Optional[Str]
    package_id         : Optional[Str]
    size               : Optional[float]
    state              : Optional[Str]
    url_type           : Optional[Str]
    # fmt: on
