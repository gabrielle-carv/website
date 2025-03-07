from typing import List, Literal, Optional, Union

from pydantic import BaseModel, Field
from pydantic import StrictStr as Str
from typing_extensions import Annotated

# -------------------------------------
# MODULE OPTIONS
# -------------------------------------

from .availability import AvailabilityEnum
from .bigquery_type import BigQueryTypeEnum
from .directory import DirectoryEnum
from .entity import EntityEnum
from .language import LanguageEnum
from .license import LicenseEnum
from .measurement_unit import MeasurementUnitEnum
from .people import *
from .raw_quality_tier import RawQualityTierEnum
from .resource_type import ResourceTypeEnum
from .status import StatusEnum
from .spatial_coverage import *
from .temporal_coverage import TemporalCoverageEnum
from .time_unit import TimeUnitEnum
from .yes_no import YesNoEnum

# -------------------------------------
# NEW OPTIONS
# -------------------------------------

IdType = Annotated[
    Optional[Str], Field()
]  # TODO: would be nice to require on show/update but not on create
