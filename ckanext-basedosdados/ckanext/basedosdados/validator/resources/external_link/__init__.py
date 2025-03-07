from typing import Literal, Optional, Set, List, Union

from ckanext.basedosdados.validator import treat_scalar_as_single_value_set
from ckanext.basedosdados.validator.available_options.spatial_coverage import (
    SpatialCoverageArea,
    CountryEnum,
)
from ckanext.basedosdados.validator.available_options import (
    AvailabilityEnum,
    LanguageEnum,
    LicenseEnum,
    TemporalCoverageEnum,
    TimeUnitEnum,
    YesNoEnum,
)

from ckanext.basedosdados.validator import ObservationLevel
from ckanext.basedosdados.validator.resources import _CkanDefaultResource

from pydantic import StrictStr as Str, conlist as StrictList
from pydantic import validator

from .fields_definitions import *


class ExternalLink(_CkanDefaultResource):
    resource_type: Literal["external_link"]

    # fmt: off
    url                         : Optional[Str]                                                     = URL_FIELD
    description                 : Optional[Str]                                                     = DESCRIPTION_FIELD
    language                    : Optional[Set[LanguageEnum]]                                       = LANGUAGE_FIELD
    has_structured_data         : Optional[YesNoEnum]                                               = HAS_STRUCTURED_DATA_FIELD
    has_api                     : Optional[YesNoEnum]                                               = HAS_API_FIELD
    is_free                     : Optional[YesNoEnum]                                               = IS_FREE_FIELD
    requires_registration       : Optional[YesNoEnum]                                               = REQUIRES_REGISTRATION_FIELD
    availability                : Optional[AvailabilityEnum]                                        = AVAILABILITY_FIELD
    country_ip_address_required : Optional[Set[CountryEnum]]                                        = COUNTRY_IP_ADDRESS_REQUIRED_FIELD
    license                     : Optional[LicenseEnum]                                             = LICENSE_FIELD
    spatial_coverage            : Optional[StrictList(SpatialCoverageArea, min_items=1)]            = SPATIAL_COVERAGE_FIELD
    temporal_coverage           : Optional[TemporalCoverageEnum]                                    = TEMPORAL_COVERAGE_FIELD
    update_frequency            : Optional[TimeUnitEnum]                                            = UPDATE_FREQUENCY_FIELD
    observation_level           : Optional[List[ObservationLevel]]                                  = OBSERVATION_LEVEL_FIELD
    # fmt: on

    # -------------------------------------
    # VALIDATORS
    # -------------------------------------
    _language_validator = treat_scalar_as_single_value_set("language")
